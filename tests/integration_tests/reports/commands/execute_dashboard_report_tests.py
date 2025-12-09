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
from unittest.mock import MagicMock, patch
from uuid import uuid4

from flask import current_app

from superset.commands.dashboard.permalink.create import CreateDashboardPermalinkCommand
from superset.commands.report.execute import AsyncExecuteReportScheduleCommand
from superset.models.dashboard import Dashboard
from superset.reports.models import ReportSourceFormat
from tests.integration_tests.fixtures.tabbed_dashboard import (
    tabbed_dashboard,  # noqa: F401
)
from tests.integration_tests.reports.utils import create_dashboard_report


@patch("superset.reports.notifications.email.send_email_smtp")
@patch(
    "superset.commands.report.execute.DashboardScreenshot",
)
@patch(
    "superset.commands.dashboard.permalink.create.CreateDashboardPermalinkCommand.run"
)
def test_report_for_dashboard_with_tabs(
    create_dashboard_permalink_mock: MagicMock,
    dashboard_screenshot_mock: MagicMock,
    send_email_smtp_mock: MagicMock,
    tabbed_dashboard: Dashboard,  # noqa: F811
) -> None:
    create_dashboard_permalink_mock.return_value = "permalink"
    dashboard_screenshot_mock.get_screenshot.return_value = b"test-image"
    current_app.config["ALERT_REPORTS_NOTIFICATION_DRY_RUN"] = False

    with create_dashboard_report(
        dashboard=tabbed_dashboard,
        extra={"active_tabs": ["TAB-L1B", "TAB-L2BB"]},
        name="test report tabbed dashboard",
    ) as report_schedule:
        dashboard: Dashboard = report_schedule.dashboard
        AsyncExecuteReportScheduleCommand(
            str(uuid4()), report_schedule.id, datetime.utcnow()
        ).run()
        dashboard_state = report_schedule.extra.get("dashboard", {})
        permalink_key = CreateDashboardPermalinkCommand(
            str(dashboard.id), dashboard_state
        ).run()

        assert dashboard_screenshot_mock.call_count == 1
        url = dashboard_screenshot_mock.call_args.args[0]
        assert url.endswith(f"/superset/dashboard/p/{permalink_key}/")
        assert send_email_smtp_mock.call_count == 1
        assert len(send_email_smtp_mock.call_args.kwargs["images"]) == 1


@patch("superset.reports.notifications.email.send_email_smtp")
@patch(
    "superset.commands.report.execute.DashboardScreenshot",
)
@patch(
    "superset.commands.dashboard.permalink.create.CreateDashboardPermalinkCommand.run"
)
def test_report_with_header_data(
    create_dashboard_permalink_mock: MagicMock,
    dashboard_screenshot_mock: MagicMock,
    send_email_smtp_mock: MagicMock,
    tabbed_dashboard: Dashboard,  # noqa: F811
) -> None:
    create_dashboard_permalink_mock.return_value = "permalink"
    dashboard_screenshot_mock.get_screenshot.return_value = b"test-image"
    current_app.config["ALERT_REPORTS_NOTIFICATION_DRY_RUN"] = False

    with create_dashboard_report(
        dashboard=tabbed_dashboard,
        extra={"active_tabs": ["TAB-L1B"]},
        name="test report tabbed dashboard",
    ) as report_schedule:
        dashboard: Dashboard = report_schedule.dashboard
        AsyncExecuteReportScheduleCommand(
            str(uuid4()), report_schedule.id, datetime.utcnow()
        ).run()
        dashboard_state = report_schedule.extra.get("dashboard", {})
        permalink_key = CreateDashboardPermalinkCommand(
            dashboard.id, dashboard_state
        ).run()

        assert dashboard_screenshot_mock.call_count == 1
        url = dashboard_screenshot_mock.call_args.args[0]
        assert url.endswith(f"/superset/dashboard/p/{permalink_key}/")
        assert send_email_smtp_mock.call_count == 1
        header_data = send_email_smtp_mock.call_args.kwargs["header_data"]
        assert header_data.get("dashboard_id") == dashboard.id
        assert header_data.get("notification_format") == report_schedule.report_format
        assert header_data.get("notification_source") == ReportSourceFormat.DASHBOARD
        assert header_data.get("notification_type") == report_schedule.type
        assert len(send_email_smtp_mock.call_args.kwargs["header_data"]) == 7


@patch("superset.reports.notifications.email.send_email_smtp")
@patch(
    "superset.commands.report.execute.DashboardScreenshot",
)
@patch(
    "superset.commands.dashboard.permalink.create.CreateDashboardPermalinkCommand.run"
)
def test_report_for_dashboard_with_multiple_tabs(
    create_dashboard_permalink_mock: MagicMock,
    dashboard_screenshot_mock: MagicMock,
    send_email_smtp_mock: MagicMock,
    tabbed_dashboard: Dashboard,  # noqa: F811
) -> None:
    """Test that multiple tabs generate multiple screenshots"""
    create_dashboard_permalink_mock.return_value = "permalink"
    
    # Mock screenshot instance and its get_screenshot method
    screenshot_instance = MagicMock()
    screenshot_instance.get_screenshot.return_value = b"test-image"
    dashboard_screenshot_mock.return_value = screenshot_instance
    
    current_app.config["ALERT_REPORTS_NOTIFICATION_DRY_RUN"] = False

    with create_dashboard_report(
        dashboard=tabbed_dashboard,
        extra={"dashboard": {"activeTabs": ["TAB-L1A", "TAB-L1B", "TAB-L2BB"]}},
        name="test report multiple tabs",
    ) as report_schedule:
        AsyncExecuteReportScheduleCommand(
            str(uuid4()), report_schedule.id, datetime.utcnow()
        ).run()

        # Should create DashboardScreenshot 3 times (one for each tab)
        assert dashboard_screenshot_mock.call_count == 3
        
        # Verify each call has the correct tab anchor in URL
        calls = dashboard_screenshot_mock.call_args_list
        assert "anchor=TAB-L1A" in calls[0][0][0]
        assert "anchor=TAB-L1B" in calls[1][0][0]
        assert "anchor=TAB-L2BB" in calls[2][0][0]
        
        # Should send 1 email with 3 images
        assert send_email_smtp_mock.call_count == 1
        assert len(send_email_smtp_mock.call_args.kwargs["images"]) == 3


@patch("superset.reports.notifications.email.send_email_smtp")
@patch(
    "superset.commands.report.execute.DashboardScreenshot",
)
@patch(
    "superset.commands.dashboard.permalink.create.CreateDashboardPermalinkCommand.run"
)
def test_report_for_dashboard_with_no_tabs_backward_compatibility(
    create_dashboard_permalink_mock: MagicMock,
    dashboard_screenshot_mock: MagicMock,
    send_email_smtp_mock: MagicMock,
    tabbed_dashboard: Dashboard,  # noqa: F811
) -> None:
    """Test backward compatibility when no activeTabs specified"""
    create_dashboard_permalink_mock.return_value = "permalink"
    
    screenshot_instance = MagicMock()
    screenshot_instance.get_screenshot.return_value = b"test-image"
    dashboard_screenshot_mock.return_value = screenshot_instance
    
    current_app.config["ALERT_REPORTS_NOTIFICATION_DRY_RUN"] = False

    # No activeTabs specified - should work like before
    with create_dashboard_report(
        dashboard=tabbed_dashboard,
        extra={"dashboard": {}},
        name="test report no tabs",
    ) as report_schedule:
        AsyncExecuteReportScheduleCommand(
            str(uuid4()), report_schedule.id, datetime.utcnow()
        ).run()

        # Should create DashboardScreenshot only once (backward compatibility)
        assert dashboard_screenshot_mock.call_count == 1
        
        # Should send 1 email with 1 image
        assert send_email_smtp_mock.call_count == 1
        assert len(send_email_smtp_mock.call_args.kwargs["images"]) == 1
