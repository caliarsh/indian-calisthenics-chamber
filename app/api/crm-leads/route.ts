import { env } from 'cloudflare:workers';
import { leadSummary, validateLeadSubmission, type LeadSubmission } from '@/lib/crm';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type RuntimeEnv = {
  TURNSTILE_SECRET_KEY?: string;
  ZOHO_CLIENT_ID?: string;
  ZOHO_CLIENT_SECRET?: string;
  ZOHO_REFRESH_TOKEN?: string;
  ZOHO_API_DOMAIN?: string;
  ZOHO_ACCOUNTS_DOMAIN?: string;
  ZOHO_PIPELINE_ID?: string;
  ZOHO_PIPELINE_NAME?: string;
  ZOHO_SUB_PIPELINE?: string;
  ZOHO_INITIAL_STAGE?: string;
  ZOHO_OWNER_MAP_JSON?: string;
  ZOHO_FIELD_MAPPING_JSON?: string;
  CRM_TEST_MODE?: string;
};

type ZohoResponse = { data?: Array<{ code?: string; details?: { id?: string }; message?: string }> };
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function json(body: unknown, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function parseJsonMap(value?: string) {
  if (!value) return {} as Record<string, string>;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, string>) : {};
  } catch {
    return {} as Record<string, string>;
  }
}

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

async function verifyTurnstile(token: string, request: Request, runtime: RuntimeEnv) {
  if (runtime.CRM_TEST_MODE === 'true') return true;
  if (!runtime.TURNSTILE_SECRET_KEY) return false;
  const body = new FormData();
  body.set('secret', runtime.TURNSTILE_SECRET_KEY);
  body.set('response', token);
  const remoteIp = request.headers.get('CF-Connecting-IP');
  if (remoteIp) body.set('remoteip', remoteIp);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function accessToken(runtime: RuntimeEnv) {
  const params = new URLSearchParams({
    refresh_token: runtime.ZOHO_REFRESH_TOKEN ?? '',
    client_id: runtime.ZOHO_CLIENT_ID ?? '',
    client_secret: runtime.ZOHO_CLIENT_SECRET ?? '',
    grant_type: 'refresh_token',
  });
  const response = await fetch(`${runtime.ZOHO_ACCOUNTS_DOMAIN ?? 'https://accounts.zoho.in'}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  if (!response.ok) throw new Error('CRM authentication failed');
  const result = (await response.json()) as { access_token?: string };
  if (!result.access_token) throw new Error('CRM authentication returned no access token');
  return result.access_token;
}

async function zohoFetch(runtime: RuntimeEnv, token: string, path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Zoho-oauthtoken ${token}`);
  headers.set('Content-Type', 'application/json');
  return fetch(`${runtime.ZOHO_API_DOMAIN ?? 'https://www.zohoapis.in'}/bigin/v2${path}`, {
    ...init,
    headers,
  });
}

async function findContact(runtime: RuntimeEnv, token: string, phone: string) {
  const response = await zohoFetch(runtime, token, `/Contacts/search?phone=${encodeURIComponent(phone)}`);
  if (response.status === 204) return null;
  if (!response.ok) throw new Error('CRM contact search failed');
  const result = (await response.json()) as { data?: Array<{ id?: string }> };
  return result.data?.[0]?.id ?? null;
}

async function createContact(runtime: RuntimeEnv, token: string, lead: LeadSubmission) {
  const response = await zohoFetch(runtime, token, '/Contacts', {
    method: 'POST',
    body: JSON.stringify({ data: [{ Last_Name: lead.name, Phone: lead.phone, ...(lead.email ? { Email: lead.email } : {}), Description: leadSummary(lead) }] }),
  });
  if (!response.ok) throw new Error('CRM contact creation failed');
  const result = (await response.json()) as ZohoResponse;
  const id = result.data?.[0]?.details?.id;
  if (!id) throw new Error('CRM returned no contact identifier');
  return id;
}

function mappedFields(lead: LeadSubmission, mapping: Record<string, string>) {
  const source: Record<string, string | boolean> = {
    submissionId: lead.submissionId,
    kind: lead.kind,
    ...lead.details,
    source: lead.attribution.utmSource || lead.attribution.referrer || 'Direct website',
    landingPage: lead.attribution.landingPage ?? '',
    referrer: lead.attribution.referrer ?? '',
    utmSource: lead.attribution.utmSource ?? '',
    utmMedium: lead.attribution.utmMedium ?? '',
    utmCampaign: lead.attribution.utmCampaign ?? '',
    marketingConsent: lead.marketingConsent,
    submittedAt: lead.submittedAt,
  };
  return Object.fromEntries(Object.entries(mapping).flatMap(([key, apiName]) => apiName && key in source ? [[apiName, source[key]]] : []));
}

async function findSubmission(runtime: RuntimeEnv, token: string, submissionId: string, field?: string) {
  if (!field) return null;
  const criteria = `((${field}:equals:${submissionId}))`;
  const response = await zohoFetch(runtime, token, `/Pipelines/search?criteria=${encodeURIComponent(criteria)}`);
  if (response.status === 204) return null;
  if (!response.ok) throw new Error('CRM duplicate check failed');
  const result = (await response.json()) as { data?: Array<{ id?: string }> };
  return result.data?.[0]?.id ?? null;
}

async function createPipelineRecord(runtime: RuntimeEnv, token: string, lead: LeadSubmission, contactId: string) {
  const mapping = parseJsonMap(runtime.ZOHO_FIELD_MAPPING_JSON);
  const duplicateId = await findSubmission(runtime, token, lead.submissionId, mapping.submissionId);
  if (duplicateId) return duplicateId;
  const ownerMap = parseJsonMap(runtime.ZOHO_OWNER_MAP_JSON);
  const ownerKey = lead.details.mode === 'Online' ? 'online' : lead.details.branch;
  const pipelineName = runtime.ZOHO_PIPELINE_NAME ?? 'Training Enquiries';
  const record = {
    Deal_Name: `${lead.name} · ${lead.kind.replaceAll('-', ' ')}`,
    Contact_Name: { id: contactId },
    Sub_Pipeline: runtime.ZOHO_SUB_PIPELINE ?? pipelineName,
    Stage: runtime.ZOHO_INITIAL_STAGE ?? 'New Enquiry',
    Description: leadSummary(lead),
    ...(runtime.ZOHO_PIPELINE_ID ? { Pipeline: { id: runtime.ZOHO_PIPELINE_ID, name: pipelineName } } : {}),
    ...(ownerMap[ownerKey] ? { Owner: { id: ownerMap[ownerKey] } } : {}),
    ...mappedFields(lead, mapping),
  };
  const response = await zohoFetch(runtime, token, '/Pipelines', { method: 'POST', body: JSON.stringify({ data: [record] }) });
  if (!response.ok) throw new Error('CRM pipeline creation failed');
  const result = (await response.json()) as ZohoResponse;
  const id = result.data?.[0]?.details?.id;
  if (!id) throw new Error('CRM returned no pipeline identifier');
  return id;
}

export async function POST(request: Request) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ success: false, fallback: false, code: 'INVALID_ORIGIN', message: 'This submission origin is not allowed.' }, 403);
  if (!withinRateLimit(request)) return json({ success: false, fallback: true, code: 'RATE_LIMITED', message: 'Too many attempts. Please continue on WhatsApp.' }, 429);
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 32_768) return json({ success: false, fallback: false, code: 'TOO_LARGE', message: 'Submission is too large.' }, 413);
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 32_768) return json({ success: false, fallback: false, code: 'TOO_LARGE', message: 'Submission is too large.' }, 413);
    body = JSON.parse(raw);
  } catch { return json({ success: false, fallback: false, code: 'INVALID_JSON', message: 'Invalid submission.' }, 400); }
  const validation = validateLeadSubmission(body);
  if (!validation.ok) return json({ success: false, fallback: false, code: 'VALIDATION_ERROR', errors: validation.errors }, 400);
  const runtime = env as unknown as RuntimeEnv;
  const configured = runtime.TURNSTILE_SECRET_KEY && runtime.ZOHO_CLIENT_ID && runtime.ZOHO_CLIENT_SECRET && runtime.ZOHO_REFRESH_TOKEN;
  if (!configured && runtime.CRM_TEST_MODE !== 'true') return json({ success: false, fallback: true, code: 'CRM_NOT_CONFIGURED', message: 'Online saving is being configured. You can still continue on WhatsApp.' }, 503);
  if (!(await verifyTurnstile(validation.value.turnstileToken, request, runtime))) return json({ success: false, fallback: false, code: 'TURNSTILE_FAILED', errors: { turnstile: 'Security check expired or failed. Please try again.' } }, 400);
  if (runtime.CRM_TEST_MODE === 'true') return json({ success: true, testMode: true }, 201);
  try {
    const token = await accessToken(runtime);
    const contactId = await findContact(runtime, token, validation.value.phone) ?? await createContact(runtime, token, validation.value);
    const pipelineId = await createPipelineRecord(runtime, token, validation.value, contactId);
    return json({ success: true, contactId, pipelineId }, 201);
  } catch (error) {
    console.error('CRM submission failed', error instanceof Error ? error.message : 'Unknown error');
    return json({ success: false, fallback: true, code: 'CRM_UNAVAILABLE', message: 'We could not save your request right now. You can still continue on WhatsApp.' }, 502);
  }
}
