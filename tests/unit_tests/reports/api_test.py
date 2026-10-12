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
from typing import Any

import pytest
from pytest_mock import MockerFixture
from sqlalchemy.orm.session import Session


@pytest.fixture
def report_schedule(session: Session) -> Any:
    from superset.reports.models import ReportSchedule, ReportScheduleType

    ReportSchedule.metadata.create_all(session.get_bind())  # pylint: disable=no-member
    report_schedule = ReportSchedule(
        type=ReportScheduleType.REPORT,
        name="A report",
        crontab="0 9 * * *",
        active=True,
    )
    session.add(report_schedule)
    session.commit()
    return report_schedule


def test_send_now_uses_saved_date_offset_by_default(
    mocker: MockerFixture,
    client: Any,
    full_api_access: None,
    report_schedule: Any,
) -> None:
    apply_async = mocker.patch("superset.reports.api.execute.apply_async")

    response = client.post(f"/api/v1/report/{report_schedule.id}/send_now")

    assert response.status_code == 200
    assert apply_async.call_args.args == (
        (report_schedule.id,),
        {"date_offset": None},
    )


def test_send_now_with_date_offset_override(
    mocker: MockerFixture,
    client: Any,
    full_api_access: None,
    report_schedule: Any,
) -> None:
    apply_async = mocker.patch("superset.reports.api.execute.apply_async")
    date_offset = {"mode": "days", "days": 5}

    response = client.post(
        f"/api/v1/report/{report_schedule.id}/send_now",
        json={"date_offset": date_offset},
    )

    assert response.status_code == 200
    assert apply_async.call_args.args == (
        (report_schedule.id,),
        {"date_offset": date_offset},
    )


def test_send_now_with_invalid_date_offset(
    mocker: MockerFixture,
    client: Any,
    full_api_access: None,
    report_schedule: Any,
) -> None:
    apply_async = mocker.patch("superset.reports.api.execute.apply_async")

    response = client.post(
        f"/api/v1/report/{report_schedule.id}/send_now",
        json={"date_offset": {"mode": "days", "days": -1}},
    )

    assert response.status_code == 400
    apply_async.assert_not_called()
