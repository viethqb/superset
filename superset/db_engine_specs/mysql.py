# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
import contextlib
import logging
import re
from datetime import datetime
from decimal import Decimal
from re import Pattern
from typing import TYPE_CHECKING, Any, Callable, Optional, Union
from urllib import parse

from flask_babel import gettext as __
from sqlalchemy import types
from sqlalchemy.dialects.mysql import (
    BIT,
    DECIMAL,
    DOUBLE,
    FLOAT,
    INTEGER,
    LONGTEXT,
    MEDIUMINT,
    MEDIUMTEXT,
    TINYINT,
    TINYTEXT,
)
from sqlalchemy.engine.reflection import Inspector
from sqlalchemy.engine.url import URL

from superset.constants import TimeGrain
from superset.db_engine_specs.base import BaseEngineSpec, BasicParametersMixin
from superset.errors import SupersetErrorType
from superset.models.sql_lab import Query
from superset.utils.core import GenericDataType

if TYPE_CHECKING:
    from superset.models.core import Database

# Regular expressions to catch custom errors
CONNECTION_ACCESS_DENIED_REGEX = re.compile(
    "Access denied for user '(?P<username>.*?)'@'(?P<hostname>.*?)'"
)
CONNECTION_INVALID_HOSTNAME_REGEX = re.compile(
    "Unknown MySQL server host '(?P<hostname>.*?)'"
)
CONNECTION_HOST_DOWN_REGEX = re.compile(
    "Can't connect to MySQL server on '(?P<hostname>.*?)'"
)
CONNECTION_UNKNOWN_DATABASE_REGEX = re.compile("Unknown database '(?P<database>.*?)'")

SYNTAX_ERROR_REGEX = re.compile(
    "check the manual that corresponds to your MySQL server "
    "version for the right syntax to use near '(?P<server_error>.*)"
)

logger = logging.getLogger(__name__)


class MySQLEngineSpec(BasicParametersMixin, BaseEngineSpec):
    engine = "mysql"
    engine_name = "MySQL"
    max_column_name_length = 64

    default_driver = "mysqldb"
    sqlalchemy_uri_placeholder = (
        "mysql://user:password@host:port/dbname[?key=value&key=value...]"
    )
    encryption_parameters = {"ssl": "1"}

    supports_dynamic_schema = True
    supports_catalog = True
    supports_dynamic_catalog = True

    column_type_mappings = (
        (
            re.compile(r"^int.*", re.IGNORECASE),
            INTEGER(),
            GenericDataType.NUMERIC,
        ),
        (
            re.compile(r"^tinyint", re.IGNORECASE),
            TINYINT(),
            GenericDataType.NUMERIC,
        ),
        (
            re.compile(r"^mediumint", re.IGNORECASE),
            MEDIUMINT(),
            GenericDataType.NUMERIC,
        ),
        (
            re.compile(r"^decimal", re.IGNORECASE),
            DECIMAL(),
            GenericDataType.NUMERIC,
        ),
        (
            re.compile(r"^float", re.IGNORECASE),
            FLOAT(),
            GenericDataType.NUMERIC,
        ),
        (
            re.compile(r"^double", re.IGNORECASE),
            DOUBLE(),
            GenericDataType.NUMERIC,
        ),
        (
            re.compile(r"^bit", re.IGNORECASE),
            BIT(),
            GenericDataType.NUMERIC,
        ),
        (
            re.compile(r"^tinytext", re.IGNORECASE),
            TINYTEXT(),
            GenericDataType.STRING,
        ),
        (
            re.compile(r"^mediumtext", re.IGNORECASE),
            MEDIUMTEXT(),
            GenericDataType.STRING,
        ),
        (
            re.compile(r"^longtext", re.IGNORECASE),
            LONGTEXT(),
            GenericDataType.STRING,
        ),
    )
    column_type_mutators: dict[types.TypeEngine, Callable[[Any], Any]] = {
        DECIMAL: lambda val: Decimal(val) if isinstance(val, str) else val
    }

    _time_grain_expressions = {
        None: "{col}",
        TimeGrain.SECOND: "DATE_ADD(DATE({col}), "
        "INTERVAL (HOUR({col})*60*60 + MINUTE({col})*60"
        " + SECOND({col})) SECOND)",
        TimeGrain.MINUTE: "DATE_ADD(DATE({col}), "
        "INTERVAL (HOUR({col})*60 + MINUTE({col})) MINUTE)",
        TimeGrain.HOUR: "DATE_ADD(DATE({col}), INTERVAL HOUR({col}) HOUR)",
        TimeGrain.DAY: "DATE({col})",
        TimeGrain.WEEK: "DATE(DATE_SUB({col}, INTERVAL DAYOFWEEK({col}) - 1 DAY))",
        TimeGrain.MONTH: "DATE(DATE_SUB({col}, INTERVAL DAYOFMONTH({col}) - 1 DAY))",
        TimeGrain.QUARTER: "MAKEDATE(YEAR({col}), 1) "
        "+ INTERVAL QUARTER({col}) QUARTER - INTERVAL 1 QUARTER",
        TimeGrain.YEAR: "DATE(DATE_SUB({col}, INTERVAL DAYOFYEAR({col}) - 1 DAY))",
        TimeGrain.WEEK_STARTING_MONDAY: "DATE(DATE_SUB({col}, "
        "INTERVAL DAYOFWEEK(DATE_SUB({col}, "
        "INTERVAL 1 DAY)) - 1 DAY))",
    }

    type_code_map: dict[int, str] = {}  # loaded from get_datatype only if needed

    custom_errors: dict[Pattern[str], tuple[str, SupersetErrorType, dict[str, Any]]] = {
        CONNECTION_ACCESS_DENIED_REGEX: (
            __('Either the username "%(username)s" or the password is incorrect.'),
            SupersetErrorType.CONNECTION_ACCESS_DENIED_ERROR,
            {"invalid": ["username", "password"]},
        ),
        CONNECTION_INVALID_HOSTNAME_REGEX: (
            __('Unknown MySQL server host "%(hostname)s".'),
            SupersetErrorType.CONNECTION_INVALID_HOSTNAME_ERROR,
            {"invalid": ["host"]},
        ),
        CONNECTION_HOST_DOWN_REGEX: (
            __('The host "%(hostname)s" might be down and can\'t be reached.'),
            SupersetErrorType.CONNECTION_HOST_DOWN_ERROR,
            {"invalid": ["host", "port"]},
        ),
        CONNECTION_UNKNOWN_DATABASE_REGEX: (
            __('Unable to connect to database "%(database)s".'),
            SupersetErrorType.CONNECTION_UNKNOWN_DATABASE_ERROR,
            {"invalid": ["database"]},
        ),
        SYNTAX_ERROR_REGEX: (
            __(
                'Please check your query for syntax errors near "%(server_error)s". '
                "Then, try running your query again."
            ),
            SupersetErrorType.SYNTAX_ERROR,
            {},
        ),
    }
    disallow_uri_query_params = {
        "mysqldb": {"local_infile"},
        "mysqlconnector": {"allow_local_infile"},
    }
    enforce_uri_query_params = {
        "mysqldb": {"local_infile": 0},
        "mysqlconnector": {"allow_local_infile": 0},
    }

    @classmethod
    def convert_dttm(
        cls, target_type: str, dttm: datetime, db_extra: Optional[dict[str, Any]] = None
    ) -> Optional[str]:
        sqla_type = cls.get_sqla_column_type(target_type)

        if isinstance(sqla_type, types.Date):
            return f"STR_TO_DATE('{dttm.date().isoformat()}', '%Y-%m-%d')"
        if isinstance(sqla_type, types.DateTime):
            datetime_formatted = dttm.isoformat(sep=" ", timespec="microseconds")
            return f"""STR_TO_DATE('{datetime_formatted}', '%Y-%m-%d %H:%i:%s.%f')"""
        return None

    @classmethod
    def adjust_engine_params(
        cls,
        uri: URL,
        connect_args: dict[str, Any],
        catalog: Optional[str] = None,
        schema: Optional[str] = None,
    ) -> tuple[URL, dict[str, Any]]:
        """
        For StarRocks via MySQL connector, support catalog.schema format in URI.
        Format: mysql://user:pass@host:port/catalog.schema

        When a different catalog is selected (different from URI), clear database part
        and use prequeries to set catalog instead, to avoid connection errors.

        When catalog=None (e.g., when listing catalogs), clear database part
        to avoid connection errors.
        """
        # logger.info(
        #     "[MySQL adjust_engine_params] Input: catalog=%s, schema=%s, uri.database=%s",
        #     catalog,
        #     schema,
        #     uri.database,
        # )

        uri, new_connect_args = super().adjust_engine_params(
            uri,
            connect_args,
            catalog,
            schema,
        )

        database = uri.database

        # When listing catalogs (catalog=None), don't use database from URI
        # to avoid connection errors with catalog.schema format
        if catalog is None and schema is None:
            # Clear database part when listing catalogs
            if database and "." in database:
                # If URI has catalog.schema format, clear it for catalog listing
                uri = uri.set(database=None)
                # logger.info(
                #     "[MySQL adjust_engine_params] Cleared database for catalog listing"
                # )
            return uri, new_connect_args

        # Extract catalog from URI if it has catalog.schema format
        uri_catalog = None
        if database and "." in database:
            uri_catalog = parse.unquote(database.split(".")[0])

        # logger.info(
        #     "[MySQL adjust_engine_params] uri_catalog=%s, selected catalog=%s",
        #     uri_catalog,
        #     catalog,
        # )

        # If catalog is provided and different from URI catalog, clear database part
        # We'll use prequeries to set catalog instead
        if catalog and uri_catalog and catalog != uri_catalog:
            # Different catalog selected: clear database to avoid connection error
            # Catalog will be set via prequeries
            uri = uri.set(database=None)
            # logger.info(
            #     "[MySQL adjust_engine_params] Different catalog selected, cleared database. "
            #     "Catalog will be set via prequeries: %s",
            #     catalog,
            # )
            # If schema is also provided, we can't set it in URI, it will be set via prequeries
            return uri, new_connect_args

        # Normal case: set database in URI
        if schema and database:
            schema = parse.quote(schema, safe="")
            if catalog:
                # StarRocks format: catalog.schema
                catalog = parse.quote(catalog, safe="")
                uri = uri.set(database=f"{catalog}.{schema}")
                # logger.info(
                #     "[MySQL adjust_engine_params] Set database to catalog.schema: %s.%s",
                #     catalog,
                #     schema,
                # )
            elif "." in database:
                # If database already has catalog.schema format, update schema part
                catalog_part = database.split(".")[0]
                uri = uri.set(database=f"{catalog_part}.{schema}")
                # logger.info(
                #     "[MySQL adjust_engine_params] Updated schema part: %s.%s",
                #     catalog_part,
                #     schema,
                # )
            else:
                # Plain MySQL: just schema
                uri = uri.set(database=schema)
                # logger.info(
                #     "[MySQL adjust_engine_params] Set database to schema: %s", schema
                # )
        elif schema:
            # Only schema provided, no catalog
            schema = parse.quote(schema, safe="")
            uri = uri.set(database=schema)
            # logger.info(
            #     "[MySQL adjust_engine_params] Only schema provided, set database: %s",
            #     schema,
            # )
        elif catalog and database and "." in database:
            # Only catalog provided, update catalog part
            catalog = parse.quote(catalog, safe="")
            schema_part = database.split(".")[1] if "." in database else None
            if schema_part:
                uri = uri.set(database=f"{catalog}.{schema_part}")
                # logger.info(
                #     "[MySQL adjust_engine_params] Updated catalog part: %s.%s",
                #     catalog,
                #     schema_part,
                # )

        # logger.info(
        #     "[MySQL adjust_engine_params] Output: uri.database=%s",
        #     uri.database,
        # )

        return uri, new_connect_args

    @classmethod
    def get_schema_from_engine_params(
        cls,
        sqlalchemy_uri: URL,
        connect_args: dict[str, Any],
    ) -> Optional[str]:
        """
        Return the configured schema.

        For StarRocks via MySQL connector, URI format is:
            mysql://user:pass@host:port/catalog.schema

        For plain MySQL:
            mysql://user:pass@host:port/schema
        """
        database = (
            sqlalchemy_uri.database.strip("/") if sqlalchemy_uri.database else None
        )

        if not database:
            return None

        # Check if database contains catalog.schema format
        if "." in database:
            return parse.unquote(database.split(".")[1])

        # Plain MySQL: database is the schema
        return parse.unquote(database)

    @classmethod
    def get_datatype(cls, type_code: Any) -> Optional[str]:
        if not cls.type_code_map:
            # only import and store if needed at least once
            # pylint: disable=import-outside-toplevel
            import MySQLdb

            ft = MySQLdb.constants.FIELD_TYPE
            cls.type_code_map = {
                getattr(ft, k): k for k in dir(ft) if not k.startswith("_")
            }
        datatype = type_code
        if isinstance(type_code, int):
            datatype = cls.type_code_map.get(type_code)
        if datatype and isinstance(datatype, str) and datatype:
            return datatype
        return None

    @classmethod
    def epoch_to_dttm(cls) -> str:
        return "from_unixtime({col})"

    @classmethod
    def _extract_error_message(cls, ex: Exception) -> str:
        """Extract error message for queries"""
        message = str(ex)
        with contextlib.suppress(AttributeError, KeyError):
            if isinstance(ex.args, tuple) and len(ex.args) > 1:
                message = ex.args[1]
        return message

    @classmethod
    def get_cancel_query_id(cls, cursor: Any, query: Query) -> Optional[str]:
        """
        Get MySQL connection ID that will be used to cancel all other running
        queries in the same connection.

        :param cursor: Cursor instance in which the query will be executed
        :param query: Query instance
        :return: MySQL Connection ID
        """
        cursor.execute("SELECT CONNECTION_ID()")
        row = cursor.fetchone()
        return row[0]

    @classmethod
    def cancel_query(cls, cursor: Any, query: Query, cancel_query_id: str) -> bool:
        """
        Cancel query in the underlying database.

        :param cursor: New cursor instance to the db of the query
        :param query: Query instance
        :param cancel_query_id: MySQL Connection ID
        :return: True if query cancelled successfully, False otherwise
        """
        try:
            cursor.execute(f"KILL CONNECTION {cancel_query_id}")
        except Exception:  # pylint: disable=broad-except
            return False

        return True

    @classmethod
    def get_url_for_impersonation(
        cls,
        url: URL,
        impersonate_user: bool,
        username: Union[str, None] = None,
        access_token: Union[str, None] = None,
    ) -> URL:
        """
        Return a modified URL with the username set.

        :param url: SQLAlchemy URL object
        :param impersonate_user: Flag indicating if impersonation is enabled
        :param username: Effective username
        :param access_token: Personal access token
        """
        # Leave URL unchanged. We will impersonate with the pre-query below.
        return url

    @classmethod
    def get_prequeries(
        cls,
        database: "Database",
        catalog: Union[str, None] = None,
        schema: Union[str, None] = None,
    ) -> list[str]:
        """
        Return pre-session queries.

        These are currently used as an alternative to ``adjust_engine_params`` for
        databases where the selected schema cannot be specified in the SQLAlchemy URI or
        connection arguments.

        When impersonate_user is enabled and using MySQL client to connect to StarRocks,
        this will execute EXECUTE AS statement to impersonate the logged-in user.

        If username contains '@' (e.g., user@domain.com), only the part before '@'
        will be used for impersonation.

        :param database: Database instance
        :param catalog: Catalog name (optional)
        :param schema: Schema name (optional)
        :return: List of queries to execute before the main query
        """
        prequeries: list[str] = []

        # logger.info(
        #     "[MySQL get_prequeries] Input: catalog=%s, schema=%s",
        #     catalog,
        #     schema,
        # )

        # Impersonation (existing behavior)
        if database.impersonate_user:
            username = database.get_effective_user(database.url_object)
            if username:
                if "@" in username:
                    username = username.split("@")[0]
                impersonation_query = f'EXECUTE AS "{username}" WITH NO REVERT;'
                prequeries.append(impersonation_query)
                # logger.info(
                #     "[MySQL get_prequeries] Added impersonation query: %s",
                #     impersonation_query,
                # )

        # Set catalog if provided (needed for StarRocks over MySQL protocol)
        uri_catalog = None
        uri_schema = None
        if database.url_object and database.url_object.database:
            db_part = database.url_object.database.strip("/")
            if "." in db_part:
                parts = db_part.split(".")
                uri_catalog = parse.unquote(parts[0])
                if len(parts) > 1:
                    uri_schema = parse.unquote(parts[1])

        catalog_changed = False
        if catalog:
            # logger.info(
            #     "[MySQL get_prequeries] uri_catalog=%s, selected catalog=%s",
            #     uri_catalog,
            #     catalog,
            # )

            # Check if catalog changed
            if uri_catalog and catalog != uri_catalog:
                catalog_changed = True
                # logger.info(
                #     "[MySQL get_prequeries] Catalog changed from %s to %s",
                #     uri_catalog,
                #     catalog,
                # )

            # Always set catalog when provided, even if it matches URI catalog
            # StarRocks may need explicit catalog setting before USE schema
            # StarRocks MySQL protocol syntax: USE 'CATALOG catalog_name'
            # Note: CATALOG must be uppercase and the entire string is in single quotes
            # Clean catalog name from frontend selection
            catalog_clean = catalog.strip()  # Remove leading/trailing whitespace
            catalog_escaped = catalog_clean.replace("'", "''")  # Escape single quotes

            # Format: USE 'CATALOG catalog_name' (CATALOG uppercase, entire string in quotes)
            # This works for both simple names and names with underscores like 'default_catalog'
            catalog_query = f"USE 'CATALOG {catalog_escaped}'"
            prequeries.append(catalog_query)
            # logger.info("[MySQL get_prequeries] Added catalog query: %s", catalog_query)

        # Set schema/database if provided
        # Only set schema if:
        # 1. Schema is explicitly provided AND
        # 2. Catalog hasn't changed (to avoid using schema from old catalog)
        # OR schema is different from URI schema (explicitly selected)
        if schema:
            schema_changed = uri_schema and schema != uri_schema

            # Only set schema if catalog hasn't changed, or if schema is explicitly different
            # This prevents using schema from old catalog when switching catalogs
            if not catalog_changed or schema_changed:
                # StarRocks MySQL protocol syntax: USE database_name (no quotes after SET catalog)
                # After SET catalog, USE database doesn't need quotes
                schema_clean = schema.strip()  # Remove leading/trailing whitespace
                # Use backticks for identifiers to handle special characters
                # Format: USE `database_name` or USE database_name
                schema_query = f"USE `{schema_clean}`"
                prequeries.append(schema_query)
                # logger.info(
                #     "[MySQL get_prequeries] Added schema query: %s", schema_query
                # )
            # else:
            #     logger.info(
            #         "[MySQL get_prequeries] Skipping schema %s because catalog changed",
            #         schema,
            # )

        # logger.info(
        #     "[MySQL get_prequeries] Output: prequeries=%s",
        #     prequeries,
        # )

        return prequeries

    @classmethod
    def get_catalog_names(
        cls,
        database: "Database",
        inspector: Inspector,
    ) -> set[str]:
        """
        For StarRocks over MySQL protocol, try SHOW CATALOGS.
        For plain MySQL this will likely fail; return empty set then.

        Note: This should be called without catalog context, so SHOW CATALOGS
        can list all available catalogs.
        """
        try:
            # Use raw connection to avoid database context issues
            with inspector.bind.connect() as conn:
                result = conn.execute("SHOW CATALOGS")
                return {row[0] for row in result}
        except Exception as ex:
            # Log the error for debugging but don't fail
            logger = logging.getLogger(__name__)
            logger.debug(
                "Failed to get catalogs (might be plain MySQL): %s", ex, exc_info=True
            )
            return set()

    @classmethod
    def get_default_catalog(
        cls,
        database: "Database",
    ) -> Optional[str]:
        """
        Default catalog from URI format catalog.schema, URI query (?catalog=), or extra.default_catalog.

        URI format: mysql://user:pass@host:port/catalog.schema
        """
        # First, try to get from URI database part (catalog.schema format)
        if database.url_object and database.url_object.database:
            db_part = database.url_object.database.strip("/")
            if "." in db_part:
                catalog = db_part.split(".")[0]
                return parse.unquote(catalog)

        # Second, try URI query parameter
        if database.url_object and database.url_object.query:
            catalog = database.url_object.query.get("catalog")
            if catalog:
                return catalog

        # Third, try from extra parameters
        try:
            import json

            extra = json.loads(database.extra or "{}")
            default_catalog = extra.get("default_catalog")
            if default_catalog:
                return default_catalog
        except Exception:
            pass

        return None

    @classmethod
    def get_schema_names(cls, inspector: Inspector) -> set[str]:
        """
        SHOW DATABASES when catalog is set (StarRocks); fallback for MySQL.

        Note: This method is called from Database.get_all_schema_names() which passes
        the catalog parameter. However, inspector.bind.execute may use a connection
        from pool that doesn't have prequeries executed.

        For StarRocks, we need to use Database.get_raw_connection() which executes
        prequeries. But since we only have inspector, we'll use raw connection from engine
        and hope the catalog was set via adjust_engine_params or prequeries.
        """
        try:
            # Use raw connection - for StarRocks, catalog should be set via prequeries
            # when get_inspector(catalog=...) was called
            engine = inspector.bind
            logger.info(
                "[MySQL get_schema_names] Using raw connection from engine. "
                "URI database: %s",
                engine.url.database,
            )
            with engine.raw_connection() as raw_conn:
                cursor = raw_conn.cursor()
                # Execute SHOW DATABASES which respects the catalog set via prequeries
                query = "SHOW DATABASES"
                logger.info("[MySQL get_schema_names] Executing query: %s", query)
                cursor.execute(query)
                result = cursor.fetchall()
                schemas = {row[0] for row in result}
                logger.info(
                    "[MySQL get_schema_names] Found %d schemas: %s",
                    len(schemas),
                    list(schemas)[:10],  # Log first 10 schemas
                )
                return schemas
        except Exception as ex:
            logger.warning(
                "[MySQL get_schema_names] Error using raw connection, falling back: %s",
                ex,
                exc_info=True,
            )
            # Fallback to standard method for plain MySQL
            return set(inspector.get_schema_names())
