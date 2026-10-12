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
"""Which date the date formats in a report's email subject/body resolve to."""

from datetime import datetime, timedelta
from typing import Any, Optional

from marshmallow import ValidationError

MODE_BUSINESS_DAY = "business_day"
MODE_DAYS = "days"
MAX_OFFSET_DAYS = 365

MONDAY = 0
SUNDAY = 6


def validate_date_offset(date_offset: Any) -> None:
    """
    Validate a date offset config, `None` meaning "use the default".

    :raises ValidationError: if the config is malformed
    """
    if date_offset is None:
        return
    if not isinstance(date_offset, dict):
        raise ValidationError("date_offset must be an object")

    mode = date_offset.get("mode")
    if mode == MODE_BUSINESS_DAY:
        return
    if mode != MODE_DAYS:
        raise ValidationError(
            f"date_offset mode must be one of: {MODE_BUSINESS_DAY}, {MODE_DAYS}"
        )

    days = date_offset.get("days")
    # bool is a subclass of int, but `true` is not a number of days
    if (
        not isinstance(days, int)
        or isinstance(days, bool)
        or not 0 <= days <= MAX_OFFSET_DAYS
    ):
        raise ValidationError(
            f"date_offset days must be an integer between 0 and {MAX_OFFSET_DAYS}"
        )


def resolve_report_date(
    now: datetime, date_offset: Optional[dict[str, Any]] = None
) -> datetime:
    """
    Return the date a report sent at `now` is about.

    - `business_day` (default): the previous day, falling back to Friday when
      sent on a Sunday or a Monday
    - `days`: exactly `days` calendar days before `now`
    """
    if date_offset and date_offset.get("mode") == MODE_DAYS:
        return now - timedelta(days=date_offset.get("days", 0))

    weekday = now.weekday()
    if weekday == MONDAY:
        return now - timedelta(days=3)
    if weekday == SUNDAY:
        return now - timedelta(days=2)
    return now - timedelta(days=1)
