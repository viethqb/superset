# Multi-Tab Screenshot Feature Implementation

## 📋 Overview
This implementation enables users to select and capture multiple tabs in dashboard reports/alerts, instead of being limited to a single tab.

## ✅ Changes Made

### 1. Frontend Changes

#### File: `superset-frontend/src/features/alerts/AlertReportModal.tsx`

**Changes:**
- ✅ Updated TreeSelect component to support multiple selection with checkboxes
- ✅ Added new handler `updateActiveTabsState()` to manage array of selected tabs
- ✅ Updated `onDashboardChange()` to clear activeTabs array
- ✅ Changed UI label from "Select tab" to "Select tabs (multiple)"
- ✅ Component now uses `activeTabs` array instead of single `anchor` value

**Key Features:**
- Multiple tab selection with checkboxes
- Responsive tag display (auto-collapse when many tabs selected)
- Parent/child hierarchy support with `showCheckedStrategy="SHOW_PARENT"`

### 2. Backend Changes

#### File: `superset/commands/report/execute.py`

**Changes:**
- ✅ Refactored `_get_screenshots()` method to support multiple tabs
- ✅ Added logic to loop through `activeTabs` array and capture each tab separately
- ✅ Maintained backward compatibility for reports without `activeTabs`
- ✅ Added error handling per tab (continues on failure instead of failing completely)
- ✅ Added logging for successful/failed tab captures

**Key Features:**
- For dashboards with `activeTabs`: captures one screenshot per tab
- For dashboards without `activeTabs`: captures single screenshot (backward compatible)
- For charts: unchanged behavior (single screenshot)
- Graceful error handling: if one tab fails, others continue

### 3. Validation

#### File: `superset/commands/report/create.py`

**Status:** ✅ Already supports `activeTabs` validation
- No changes needed - existing code validates both `activeTabs` and `anchor`

### 4. Testing

#### File: `tests/integration_tests/reports/commands/execute_dashboard_report_tests.py`

**New Tests Added:**
1. ✅ `test_report_for_dashboard_with_multiple_tabs()` - Tests 3 tabs generate 3 screenshots
2. ✅ `test_report_for_dashboard_with_no_tabs_backward_compatibility()` - Tests backward compatibility

## 🔄 Backward Compatibility

✅ **Fully backward compatible:**
- Old reports with no `activeTabs` continue to work
- Old reports with single `anchor` continue to work
- New reports can use multiple tabs
- No database migration required

## 📧 Email Notification

✅ **Already supported:**
- Email template already handles multiple images
- Each screenshot appears as a separate image in the email
- No changes needed to email notification code

## 🧪 How to Test

### Manual Testing:

1. **Create a new Report/Alert:**
   - Go to Settings → Alerts & Reports
   - Create new Report
   - Select a Dashboard with tabs
   - In "Select tabs (multiple)" field, check multiple tabs
   - Save and run the report

2. **Verify Email:**
   - Check that email contains multiple screenshots
   - Each screenshot should show the correct tab content

3. **Test Backward Compatibility:**
   - Edit an old report (created before this change)
   - Verify it still works without selecting tabs

### Automated Testing:

```bash
# Run the new test cases
pytest tests/integration_tests/reports/commands/execute_dashboard_report_tests.py::test_report_for_dashboard_with_multiple_tabs
pytest tests/integration_tests/reports/commands/execute_dashboard_report_tests.py::test_report_for_dashboard_with_no_tabs_backward_compatibility
```

## 📊 Technical Details

### Data Structure:

**New Format:**
```json
{
  "extra": {
    "dashboard": {
      "activeTabs": ["TAB-123", "TAB-456", "TAB-789"],
      "anchor": "TAB-123"  // kept for backward compatibility
    }
  }
}
```

### Screenshot Flow:

1. User selects multiple tabs in UI
2. Frontend saves to `activeTabs` array
3. Backend reads `activeTabs` from report config
4. For each tab:
   - Modify URL with `anchor=TAB_ID` parameter
   - Create DashboardScreenshot instance
   - Capture screenshot
   - Add to images array
5. All images sent in single email

## ⚠️ Limitations & Considerations

1. **Performance**: More tabs = longer execution time
   - Consider adding `MAX_TABS_PER_REPORT` config (e.g., 5-10 tabs max)
   
2. **Email Size**: Multiple screenshots increase email size
   - Monitor email sizes, consider compression if needed
   
3. **Timeouts**: Celery task timeout may need adjustment for many tabs
   - Current implementation continues on per-tab timeout

4. **Order**: Screenshots appear in the order tabs were selected

## 🚀 Future Enhancements (Optional)

- [ ] Add tab labels/titles to each screenshot in email
- [ ] Add preview of selected tabs before saving
- [ ] Parallel screenshot capture (requires async/threading)
- [ ] Drag & drop to reorder selected tabs
- [ ] Add config for max tabs per report
- [ ] Image compression for large emails

## 📝 Files Modified

1. `superset-frontend/src/features/alerts/AlertReportModal.tsx`
2. `superset/commands/report/execute.py`
3. `tests/integration_tests/reports/commands/execute_dashboard_report_tests.py`

## ✨ Summary

This implementation successfully enables multi-tab screenshot capture in Reports & Alerts while maintaining full backward compatibility. Users can now select multiple tabs from a dashboard and receive all screenshots in a single email notification.

