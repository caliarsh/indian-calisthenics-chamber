# ICC CRM launch checklist

The website integration is deployment-ready but intentionally falls back to WhatsApp until the ICC Zoho and Cloudflare credentials below are configured.

#### 1. Configure Zoho Bigin Express

Create a **Training Enquiries** team pipeline with these stages: `New Enquiry`, `Contact Due`, `Trial/Consultation Scheduled`, `Attended`, `Follow-Up`, `Joined`, `Nurture`, and `Lost`.

Create a **Member Retention** team pipeline with these stages: `Active`, `Renewal Due`, `Follow-Up`, `Renewed`, `Frozen`, `Expired`, and `Alumni`.

In the Pipelines module, create fields for Website Submission ID (single line, unique), Enquiry Type, Training Mode, Branch, Program / Offer, Current Level, Training Goal, Preferred Date, Preferred Time, Lead Source Detail, Landing Page, Referrer, UTM Source, UTM Medium, UTM Campaign, Marketing Consent, and Website Submitted At. Obtain their API names from Bigin's field metadata screen.

Copy the Training Enquiries team pipeline ID, owner user IDs, exact sub-pipeline name, initial stage, and field API names into the Worker variables described below. Mapping `submissionId` to the unique Website Submission ID field makes retries idempotent.

Create an OAuth client in the Zoho API Console for the India data centre and obtain an offline refresh token with Contacts, Pipelines, Search, and settings/metadata access. The integration uses `accounts.zoho.in` and `zohoapis.in` by default.

## 2. Configure Cloudflare Turnstile and secrets

Create a managed Turnstile widget for `indiancalisthenicschamber.com`, the `www` hostname if used, and the `develop` Workers preview hostname.

Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in Cloudflare's build variables. Store these as encrypted Worker secrets, never source variables: `TURNSTILE_SECRET_KEY`, `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, and `ZOHO_REFRESH_TOKEN`.

Set the non-secret Worker variables using `.dev.vars.example` as the reference. `ZOHO_FIELD_MAPPING_JSON` maps the website's stable keys to Bigin API names. `ZOHO_OWNER_MAP_JSON` maps `online`, `bengaluru`, and `hyderabad` to Bigin user IDs. Never set `CRM_TEST_MODE=true` in production.

## 3. Configure follow-up workflows

Add owner assignment rules for Online, Bengaluru, and Hyderabad. Add tasks for immediate contact, 24-hour follow-up, trial or consultation reminders, and overdue enquiries. In Member Retention, add renewal tasks 30, 14, 7, and 1 day before expiry.

The first release does not connect either WhatsApp number to the WhatsApp Business Platform. Staff use click-to-WhatsApp links and send messages manually from the existing phone apps.

## 4. Import existing members

Download `/templates/icc-member-import-template.csv`, copy the member spreadsheet into that structure, and keep dates in `YYYY-MM-DD` format. Normalize Indian mobile numbers to `+91XXXXXXXXXX`. Deduplicate by mobile number, then Member ID.

Import 5–10 reviewed records into Member Retention first. Confirm branch, owner, membership expiry, freeze fields, and follow-up dates before importing the full sheet. Do not include medical notes or unrelated personal data.

## 5. Enable analytics and release

Create a Cloudflare Web Analytics site and set `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` as a build variable. Verify that page views appear without form contents or personal information.

Test on `develop` using test contacts, then promote to `main`. Confirm one website submission creates one contact, one pipeline record, the expected owner, and the correct WhatsApp destination.

