# CONTACT FORM SETUP GUIDE

## Summary of Changes

### 1. **HTML Form (index.html) - UPDATED**
✅ Fixed input field names:
- `name="name"` for Full Name
- `name="email"` for Email Address  
- `name="number"` for Contact Number
- `name="message"` for Message textarea

### 2. **JavaScript Code (index.html) - ADDED**
✅ Implemented proper form submission:
- `e.preventDefault()` to prevent default form submission
- `fetch()` with FormData to send POST request
- Success alert and form reset after submission
- Error handling with try-catch
- Console logging for debugging

### 3. **Google Apps Script - PROVIDED**
✅ Corrected `doPost(e)` function to:
- Extract all form parameters (name, email, number, message)
- Get current timestamp
- Append data to Google Sheet with proper column mapping
- Return JSON success/error response

---

## Step-by-Step Setup Instructions

### STEP 1: Set Up Google Sheet
1. Create a new Google Sheet at https://sheets.google.com
2. Rename the first sheet to "responses" (or keep it as is)
3. In the first row, add headers: `Timestamp`, `name`, `email`, `number`, `message`
4. Copy the spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/XXXXX/edit`
   - The ID is the long string of characters between `/d/` and `/edit`

### STEP 2: Create Google Apps Script
1. Go to https://script.google.com
2. Click "New Project"
3. Delete any default code and paste the entire `GOOGLE_APPS_SCRIPT_CODE.js` content
4. Replace `'YOUR_SPREADSHEET_ID'` with your actual Google Sheet ID (from Step 1)
5. Save the project (Ctrl+S)

### STEP 3: Deploy as Web App
1. Click the "Deploy" button (top right)
2. Click "New deployment"
3. Select "Web app" from the dropdown menu
4. Configure:
   - Execute as: Select your email/account
   - Who has access: "Anyone"
5. Click "Deploy"
6. A dialog will appear with your Web App URL - **COPY THIS URL**
7. Click "Copy" to copy the entire URL

### STEP 4: Update JavaScript in index.html
1. Open `index.html` in VS Code
2. Find the line with `const scriptURL = 'https://script.google.com/macros/s/...'`
3. Replace the entire URL with your copied Web App URL from Step 3
4. Save the file

### STEP 5: Test the Form
1. Open your website in a browser
2. Navigate to the "Contact us" section
3. Fill in all fields:
   - Full Name
   - Email Address
   - Contact Number
   - Message
4. Click Submit
5. You should see: "✓ Success! Your message has been sent."
6. The form will automatically clear
7. Check your Google Sheet - the data should appear!

---

## Troubleshooting

### Issue: Form submits but data doesn't appear in Google Sheet
**Solution:**
- Check browser console (F12 → Console tab) for errors
- Verify the Web App URL is correct in index.html
- Check that the sheet name in the Apps Script matches your actual sheet name
- Ensure SHEET_ID is correct (no extra spaces or quotes)

### Issue: "Error" alert appears
**Solution:**
- Check the Apps Script execution logs:
  1. Go back to https://script.google.com
  2. Open your project
  3. Click "Executions" (left sidebar)
  4. Look for failed executions and view the error details

### Issue: Only timestamp appears, other fields are empty
**Solution (Original Issue):**
- This was because the form fields didn't have `name` attributes
- ✅ **FIXED** - All fields now have proper `name` attributes matching the Apps Script parameter names

### Issue: "403 Forbidden" or "Invalid deployment" error
**Solution:**
- Redeploy the Apps Script:
  1. In Apps Script, click Deploy → Manage deployments
  2. Delete the old deployment
  3. Create a new deployment with the updated code
  4. Update the URL in index.html

---

## File Structure After Setup

```
bootstrap/
├── index.html (✅ UPDATED with proper form fields and fetch JavaScript)
├── GOOGLE_APPS_SCRIPT_CODE.js (📝 Reference code for Apps Script)
├── CSS files
├── JS files
└── Image folder
```

---

## How It Works

1. **User fills form** → Enters name, email, phone, message
2. **User clicks Submit** → Form submission is intercepted by JavaScript
3. **fetch() sends POST request** → FormData is sent to Google Apps Script URL
4. **Apps Script receives data** → doPost(e) function processes the request
5. **Data appended to Sheet** → All fields stored in respective columns
6. **Success response** → User sees confirmation alert
7. **Form resets** → Ready for next submission

---

## Security Notes

- The Apps Script deployment is set to "Anyone" so anyone can submit data
- Consider adding email validation or CAPTCHA for production
- The spreadsheet ID and Apps Script URL are visible in the code (this is OK - they're not secrets)
- For added security, you could:
  - Add form validation
  - Add rate limiting in the Apps Script
  - Use CORS headers for domain restriction

---

## Field Mapping Reference

| HTML Input | Form Name | Google Sheet Column | Data Type |
|-----------|-----------|---------------------|-----------|
| Name input | `name` | B: name | Text |
| Email input | `email` | C: email | Email |
| Phone input | `number` | D: number | Phone |
| Message textarea | `message` | E: message | Long Text |
| Auto-generated | timestamp | A: Timestamp | Date/Time |

---

## Next Steps (Optional Enhancements)

- Add client-side form validation
- Add loading spinner during submission
- Store IP address or user agent in the sheet
- Add email notification when form is submitted
- Create a confirmation email to send to the user
- Add CAPTCHA to prevent spam
