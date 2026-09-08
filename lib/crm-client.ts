'use client';

import type { LeadAttribution, LeadKind, LeadSubmission } from '@/lib/crm';

const attributionKey = 'icc_first_touch_v1';

export function captureFirstTouch() {
  if (typeof window === 'undefined' || window.sessionStorage.getItem(attributionKey)) return;
  const params = new URLSearchParams(window.location.search);
  const value: LeadAttribution = {
    landingPage: window.location.href,
    referrer: document.referrer || undefined,
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  };
  window.sessionStorage.setItem(attributionKey, JSON.stringify(value));
}

export function currentAttribution(): LeadAttribution {
  if (typeof window === 'undefined') return {};
  captureFirstTouch();
  let first: LeadAttribution = {};
  try { first = JSON.parse(window.sessionStorage.getItem(attributionKey) ?? '{}') as LeadAttribution; } catch { first = {}; }
  const params = new URLSearchParams(window.location.search);
  return {
    ...first,
    currentPage: window.location.href,
    utmSource: first.utmSource || params.get('utm_source') || undefined,
    utmMedium: first.utmMedium || params.get('utm_medium') || undefined,
    utmCampaign: first.utmCampaign || params.get('utm_campaign') || undefined,
  };
}

export function buildLeadSubmission(input: {
  kind: LeadKind;
  name: string;
  phone: string;
  email?: string;
  enquiryConsent: boolean;
  marketingConsent: boolean;
  details: Record<string, string>;
  turnstileToken: string;
}): LeadSubmission {
  return {
    version: 1,
    submissionId: crypto.randomUUID(),
    kind: input.kind,
    name: input.name,
    phone: input.phone,
    email: input.email,
    enquiryConsent: input.enquiryConsent,
    marketingConsent: input.marketingConsent,
    details: input.details,
    attribution: currentAttribution(),
    submittedAt: new Date().toISOString(),
    turnstileToken: input.turnstileToken,
  };
}

export async function saveLead(lead: LeadSubmission) {
  try {
    const response = await fetch('/api/crm-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    const result = await response.json().catch(() => ({})) as { success?: boolean; fallback?: boolean; message?: string; errors?: Record<string, string> };
    if (!response.ok || !result.success) return { ok: false as const, fallback: result.fallback === true, message: result.message || 'We could not save your request.', errors: result.errors };
    return { ok: true as const };
  } catch {
    return { ok: false as const, fallback: true, message: 'We could not reach secure saving. You can still continue on WhatsApp.' };
  }
}
