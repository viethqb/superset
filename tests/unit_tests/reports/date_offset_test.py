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
from datetime import datetime
from typing import Any, Optional

import pytest
from marshmallow import ValidationError

from superset.reports.date_offset import resolve_report_date, validate_date_offset


@pytest.mark.parametrize(
    "now,expected",
    [
        ("2026-10-12", "2026-10-09"),  # Monday -> Friday
        ("2026-10-13", "2026-10-12"),  # Tuesday -> Monday
        ("2026-10-16", "2026-10-15"),  # Friday -> Thursday
        ("2026-10-17", "2026-10-16"),  # Saturday -> Friday
        ("2026-10-18", "2026-10-16"),  # Sunday -> Friday
    ],
)
@pytest.mark.parametrize("date_offset", [None, {}, {"mode": "business_day"}])
def test_resolve_report_date_business_day(
    now: str, expected: str, date_offset: Optional[dict[str, Any]]
) -> None:
    resolved = resolve_report_date(datetime.fromisoformat(now), date_offset)

    assert resolved.date().isoformat() == expected


@pytest.mark.parametrize(
    "days,expected",
    [
        (0, "2026-10-12"),
        (1, "2026-10-11"),  # a Sunday, weekends are not skipped
        (3, "2026-10-09"),
        (30, "2026-09-12"),
    ],
)
def test_resolve_report_date_days(days: int, expected: str) -> None:
    now = datetime.fromisoformat("2026-10-12")  # Monday

    resolved = resolve_report_date(now, {"mode": "days", "days": days})

    assert resolved.date().isoformat() == expected


@pytest.mark.parametrize(
    "date_offset",
    [
        None,
        {"mode": "business_day"},
        {"mode": "days", "days": 0},
        {"mode": "days", "days": 365},
    ],
)
def test_validate_date_offset_valid(date_offset: Optional[dict[str, Any]]) -> None:
    validate_date_offset(date_offset)


@pytest.mark.parametrize(
    "date_offset",
    [
        "days",
        {},
        {"mode": "weekly"},
        {"mode": "days"},
        {"mode": "days", "days": -1},
        {"mode": "days", "days": 366},
        {"mode": "days", "days": "1"},
        {"mode": "days", "days": True},
    ],
)
def test_validate_date_offset_invalid(date_offset: Any) -> None:
    with pytest.raises(ValidationError):
        validate_date_offset(date_offset)
