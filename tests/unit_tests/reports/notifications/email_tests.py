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
from typing import Any, Optional

import pandas as pd
import pytest
from freezegun import freeze_time


def test_render_description_with_html() -> None:
    # `superset.models.helpers`, a dependency of following imports,
    # requires app context
    from superset.reports.models import ReportRecipients, ReportRecipientType
    from superset.reports.notifications.base import NotificationContent
    from superset.reports.notifications.email import EmailNotification

    content = NotificationContent(
        name="test alert",
        embedded_data=pd.DataFrame(
            {
                "A": [1, 2, 3],
                "B": [4, 5, 6],
                "C": ["111", "222", '<a href="http://www.example.com">333</a>'],
            }
        ),
        description='<p>This is <a href="#">a test</a> alert</p><br />',
        header_data={
            "notification_format": "PNG",
            "notification_type": "Alert",
            "owners": [1],
            "notification_source": None,
            "chart_id": None,
            "dashboard_id": None,
            "slack_channels": None,
        },
    )
    email_body = (
        EmailNotification(
            recipient=ReportRecipients(type=ReportRecipientType.EMAIL), content=content
        )
        ._get_content()
        .body
    )
    assert (
        '<p>This is <a href="#" rel="noopener noreferrer">a test</a> alert</p><br>'
        in email_body
    )
    assert '<td>&lt;a href="http://www.example.com"&gt;333&lt;/a&gt;</td>' in email_body


@pytest.mark.parametrize(
    "date_offset,expected",
    [
        (None, "09/10/2026"),  # sent on a Monday -> Friday
        ({"mode": "business_day"}, "09/10/2026"),
        ({"mode": "days", "days": 1}, "11/10/2026"),
        ({"mode": "days", "days": 0}, "12/10/2026"),
    ],
)
@freeze_time("2026-10-12 03:00:00")  # Monday 10:00 in Asia/Ho_Chi_Minh
def test_date_offset_in_description(
    date_offset: Optional[dict[str, Any]], expected: str
) -> None:
    from superset.reports.models import ReportRecipients, ReportRecipientType
    from superset.reports.notifications.base import NotificationContent
    from superset.reports.notifications.email import EmailNotification

    content = NotificationContent(
        name="report %d/%m/%Y",
        description="<p>Data of %d/%m/%Y</p>",
        header_data={
            "notification_format": "PNG",
            "notification_type": "Report",
            "owners": [1],
            "notification_source": None,
            "chart_id": None,
            "dashboard_id": None,
            "slack_channels": None,
        },
        date_offset=date_offset,
    )

    notification = EmailNotification(
        recipient=ReportRecipients(type=ReportRecipientType.EMAIL), content=content
    )

    assert f"<p>Data of {expected}</p>" in notification._get_content().body
    assert notification._parse_name(content.name) == f"report {expected}"
