import { env } from 'cloudflare:workers';
import { getCountryCallingCode, isSupportedCountry, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type RuntimeEnv = { GOOGLE_SHEETS_WEBHOOK_URL?: string; GOOGLE_SHEETS_WEBHOOK_SECRET?: string };
type CloudflareRequest = Request & { cf?: { city?: unknown; region?: unknown; country?: unknown } };
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function json(body: unknown, status: number) { return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } }); }
function text(value: unknown, maximum: number) { return typeof value === 'string' ? value.trim().slice(0, maximum) : ''; }
function withinRateLimit(request: Request) {
  const key = request.headers.get('CF-Connecting-IP') ?? 'local';
  const now = Date.now();
  const bucket = requestBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    if (requestBuckets.size > 1000) requestBuckets.clear();
    requestBuckets.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= 8;
}

export async function POST(request: Request) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ success: false, message: 'This submission origin is not allowed.' }, 403);
  if (!withinRateLimit(request)) return json({ success: false, message: 'Too many attempts. Please try again later.' }, 429);

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return json({ success: false, message: 'Submission is too large.' }, 413);
    body = JSON.parse(raw);
  } catch { return json({ success: false, message: 'Invalid submission.' }, 400); }
  if (!body || typeof body !== 'object') return json({ success: false, message: 'Invalid submission.' }, 400);

  const input = body as Record<string, unknown>;
  if (text(input.website, 200)) return json({ success: true }, 201);
  const name = text(input.name, 120);
  const phoneInput = text(input.phone, 40);
  const phoneCountry = text(input.phoneCountry, 2).toUpperCase();
  const supportedCountry = isSupportedCountry(phoneCountry) ? phoneCountry as CountryCode : null;
  const parsedPhone = supportedCountry ? parsePhoneNumberFromString(phoneInput, supportedCountry) : undefined;
  const selectedCallingCode = supportedCountry ? getCountryCallingCode(supportedCountry) : null;
  const phone = parsedPhone?.isValid() && (!phoneInput.startsWith('+') || parsedPhone.countryCallingCode === selectedCallingCode) ? parsedPhone.number : null;
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!phone) errors.phone = 'Enter a valid mobile number for the selected country code.';
  if (Object.keys(errors).length || !phone) return json({ success: false, errors }, 400);

  const runtime = env as unknown as RuntimeEnv;
  if (!runtime.GOOGLE_SHEETS_WEBHOOK_URL || !runtime.GOOGLE_SHEETS_WEBHOOK_SECRET) return json({ success: false, message: 'Online saving is being configured. Please try again shortly.' }, 503);

  const cf = (request as CloudflareRequest).cf;
  const payload = {
    secret: runtime.GOOGLE_SHEETS_WEBHOOK_SECRET,
    submittedAt: new Date().toISOString(), name, phone,
    city: text(cf?.city, 120), region: text(cf?.region, 120), country: text(cf?.country, 8),
    sourcePage: text(input.sourcePage, 500),
  };
  try {
    const response = await fetch(runtime.GOOGLE_SHEETS_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), redirect: 'follow' });
    if (!response.ok) throw new Error(`Google Sheets webhook returned ${response.status}`);
    const result = await response.text();
    if (!result.includes('ICC_WEBHOOK_SUCCESS_TRUE')) throw new Error('Google Sheets webhook rejected submission');
    return json({ success: true }, 201);
  } catch (error) {
    console.error('Trial lead submission failed', error instanceof Error ? error.message : 'Unknown error');
    return json({ success: false, message: 'We could not save your request. Please try again.' }, 502);
  }
}
