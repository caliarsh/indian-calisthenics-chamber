const SPREADSHEET_ID = '15TsEvcwzBpKw85AayxhfSs_Y1D9FxTXC9jP5AftqSoc';
const SHEET_NAME = 'Sheet1';

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || '{}');
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('LEAD_WEBHOOK_SECRET');
    if (!expectedSecret || payload.secret !== expectedSecret) return jsonResponse({ success: false, error: 'unauthorized' });
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
      if (!sheet) throw new Error('Sheet not found');
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Submitted At', 'Name', 'Phone Number', 'City', 'Region', 'Country', 'Source Page']);
        sheet.setFrozenRows(1);
        sheet.getRange('A1:G1').setBackground('#8f1d2c').setFontColor('#fff7f7').setFontWeight('bold');
      }
      sheet.appendRow([payload.submittedAt || new Date().toISOString(), payload.name || '', payload.phone || '', payload.city || '', payload.region || '', payload.country || '', payload.sourcePage || '']);
    } finally { lock.releaseLock(); }
    return jsonResponse({ success: true });
  } catch (error) { return jsonResponse({ success: false, error: String(error) }); }
}
