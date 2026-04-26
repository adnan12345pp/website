# QUICK REFERENCE - Code Snippets

## HTML Form Code (from index.html)

```html
<form id="gform" method="post">
  <div class="container-fluid ">
    <div class="row justify-content-center ">
      <div class="col-md-5">
        <h2>Contact us</h2>
        <div class="mb-3">
          <label for="nameInput" class="form-label">Full Name</label>
          <input type="text" class="form-control" id="nameInput" name="name" placeholder="Your name" required>
        </div>
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email address</label>
          <input type="email" class="form-control" id="emailInput" name="email" placeholder="name@example.com" required>
        </div>
        <div class="mb-3">
          <label for="numberInput" class="form-label">Contact number</label>
          <input type="tel" class="form-control" id="numberInput" name="number" placeholder="Your phone number" required>
        </div>
        <div class="mb-3">
          <label for="messageInput" class="form-label">Message</label>
          <textarea class="form-control" id="messageInput" name="message" rows="3" required></textarea>
          <br>
          <div class="text-end">
            <input type="submit" value="Submit">
          </div>
        </div>
      </div>
      <div class="col-md-5 text-center"><img src="image/logo.png" class="img-fluid don" alt="" width="400px" height="300px"></div>
    </div>
  </div>
</form>
```

**Key Points:**
- ✅ Every input has a `name` attribute (name, email, number, message)
- ✅ No `action` attribute - handled by JavaScript fetch()
- ✅ All fields have `required` attribute for validation
- ✅ Form ID is `gform` for JavaScript reference

---

## JavaScript Code (from index.html)

```javascript
// Handle Contact Form Submission
document.getElementById('gform').addEventListener('submit', function(e) {
  e.preventDefault();

  // Google Apps Script Web App URL - REPLACE WITH YOUR ACTUAL URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwYDt8dbgh5EjqYXrS60HFyvKs0gOSrO7KcsUB6_gssmmHN4HKjn4akryPg7KM2z866fw/exec';

  // Get form data
  const formData = new FormData(this);

  // Convert FormData to object for debugging
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    number: formData.get('number'),
    message: formData.get('message')
  };

  console.log('Sending data:', data);

  // Send data using fetch
  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    console.log('Response:', response);
    alert('✓ Success! Your message has been sent.');
    document.getElementById('gform').reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('✗ Error! Please try again.');
  });
});
```

**Key Points:**
- ✅ `e.preventDefault()` stops default form submission
- ✅ `FormData(this)` captures all form fields automatically
- ✅ `fetch()` with POST method sends data to Apps Script
- ✅ Success handler shows alert and resets form
- ✅ Error handler displays error message
- ⚠️ **IMPORTANT:** Replace the `scriptURL` with your Web App URL

---

## Google Apps Script Code

```javascript
const SHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheet ID
const SHEET_NAME = 'responses'; // Sheet name where data will be stored

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
```

**Key Points:**
- ✅ `e.parameter` extracts POST data from FormData
- ✅ All field names match HTML input `name` attributes
- ✅ `appendRow()` adds new row to the sheet
- ✅ Timestamp is generated server-side
- ✅ Headers are created if sheet is empty
- ✅ Error handling with try-catch
- ✅ Returns JSON response

---

## What's Different From Your Old Code?

| Issue | Old Code | New Code |
|-------|----------|----------|
| Missing `name` attributes | ❌ No `name=` | ✅ `name="name"`, `name="email"`, etc. |
| Form submission | ❌ Default POST action | ✅ `fetch()` with FormData |
| Default prevention | ❌ Not prevented | ✅ `e.preventDefault()` |
| Only Timestamp saved | ❌ Other fields were empty | ✅ All fields saved properly |
| Success feedback | ❌ None | ✅ Alert + form reset |
| Data extraction in Apps Script | ❌ Manual parsing | ✅ `e.parameter.fieldName` |

---

## Testing Checklist

- [ ] Form fields have correct `name` attributes
- [ ] JavaScript file includes fetch() code
- [ ] Google Apps Script doPost() function is correct
- [ ] SHEET_ID is replaced with actual ID
- [ ] Web App URL is updated in JavaScript
- [ ] Apps Script is deployed as Web App with "Anyone" access
- [ ] Google Sheet has correct column headers
- [ ] Form submits without errors
- [ ] Data appears in Google Sheet within 5 seconds
- [ ] All fields (name, email, number, message) are populated
- [ ] Timestamp is automatically added
- [ ] Success alert appears after submission
- [ ] Form clears after submission

---

## Common Mistakes to Avoid

1. ❌ Forgetting to replace `SHEET_ID` in Apps Script
2. ❌ Forgetting to replace `scriptURL` in JavaScript
3. ❌ Using wrong sheet name in Apps Script (must match exactly)
4. ❌ Deploying Apps Script with wrong execution permissions
5. ❌ Not saving the Apps Script after making changes
6. ❌ Using old Web App URL from previous deployment
7. ❌ Forgetting to click "Deploy" after changing code
8. ❌ Leaving form inputs without `name` attributes

---

## Tips for Success

✅ **Always check browser console (F12 → Console) for errors**
✅ **Check Apps Script Executions for server-side errors**
✅ **Use Ctrl+Shift+Delete to hard refresh and clear cache**
✅ **Test in an incognito/private browser window**
✅ **Verify sheet name matches exactly (case-sensitive)**
✅ **Make new deployments after code changes, don't reuse old URLs**
