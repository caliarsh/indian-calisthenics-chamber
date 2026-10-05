# Google Sheets lead connection

The booking form sends only name, phone, source page, and Cloudflare's approximate city/region/country. It does not store the visitor's IP address or request precise GPS access.

1. Open the lead spreadsheet and choose **Extensions → Apps Script**.
2. Replace the editor contents with `scripts/google-sheets-lead-webhook.gs`.
3. In Apps Script, open **Project Settings → Script properties** and add `LEAD_WEBHOOK_SECRET` with a long random value.
4. Choose **Deploy → New deployment → Web app**. Execute as yourself and allow access to anyone.
5. Copy the `/exec` deployment URL.
6. Add these Cloudflare Worker secrets: `GOOGLE_SHEETS_WEBHOOK_URL` (the `/exec` URL) and `GOOGLE_SHEETS_WEBHOOK_SECRET` (the same random value).
7. Deploy the website and submit one test lead. Confirm a row appears in `Sheet1` with columns A:G.

The Google Drive account currently connected to Codex (`jam@goatfish.xyz`) needs Editor access to the spreadsheet if Codex should format or verify the live sheet directly.
