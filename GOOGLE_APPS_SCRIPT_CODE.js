// GOOGLE APPS SCRIPT CODE
// Deploy this code in Google Apps Script and create a new deployment
// Instructions:
// 1. Go to https://script.google.com
// 2. Create a new project
// 3. Copy the entire code below into the editor
// 4. Save and Deploy as a Web App
// 5. Set "Execute as" to your email
// 6. Set "Who has access" to "Anyone"
// 7. Copy the Web App URL and paste it in the JavaScript (scriptURL variable in index.html)

// Configuration
const SHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheet ID
const SHEET_NAME = 'responses'; // Sheet name where data will be stored

// Main function to handle POST requests from the form
function doPost(e) {
  try {
    // Get the form parameters
    const params = e.parameter;
    
    // Extract form data
    const name = params.name || '';
    const email = params.email || '';
    const number = params.number || '';
    const message = params.message || '';
    
    // Get current timestamp
    const timestamp = new Date().toLocaleString('en-US');
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Add header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'name', 'email', 'number', 'message']);
    }
    
    // Append the new row with form data
    sheet.appendRow([timestamp, name, email, number, message]);
    
    // Log the submission (for debugging)
    Logger.log('Form Submission: ' + JSON.stringify({
      timestamp: timestamp,
      name: name,
      email: email,
      number: number,
      message: message
    }));
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Data stored successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log and return error
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to get all responses (for testing/debugging)
function getAllResponses() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  return data;
}
