export const leadKinds = [
  'training-enquiry',
  'internship-application',
  'athlete-application',
  'support-enquiry',
] as const;

export type LeadKind = (typeof leadKinds)[number];

export type LeadAttribution = {
  landingPage?: string;
  currentPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type LeadSubmission = {
  version: 1;
  submissionId: string;
  kind: LeadKind;
  name: string;
  phone: string;
  email?: string;
  enquiryConsent: boolean;
  marketingConsent: boolean;
  details: Record<string, string>;
  attribution: LeadAttribution;
  submittedAt: string;
  turnstileToken: string;
};

export type LeadValidationResult =
  | { ok: true; value: LeadSubmission & { phone: string } }
  | { ok: false; errors: Record<string, string> };

const allowedDetails: Record<LeadKind, readonly string[]> = {
  'training-enquiry': ['level', 'assessed', 'mode', 'branch', 'program', 'goal', 'preferredDate', 'preferredTime'],
  'internship-application': ['branch', 'background', 'experience', 'reason', 'availability'],
  'athlete-application': ['branch', 'discipline', 'level', 'competition', 'motivation', 'goal', 'instagram'],
  'support-enquiry': ['supportType', 'focus', 'range', 'message'],
};

const text = (value: unknown, maximum = 500) =>
  typeof value === 'string' ? value.trim().slice(0, maximum) : '';

export function normalizeIndianPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  const national = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(national) ? `+91${national}` : null;
}

export function validateLeadSubmission(input: unknown): LeadValidationResult {
  if (!input || typeof input !== 'object') return { ok: false, errors: { form: 'Invalid submission.' } };
  const raw = input as Partial<LeadSubmission>;
  const errors: Record<string, string> = {};
  const kind = leadKinds.includes(raw.kind as LeadKind) ? (raw.kind as LeadKind) : null;
  const name = text(raw.name, 120);
  const phone = normalizeIndianPhone(text(raw.phone, 30));
  const email = text(raw.email, 180);
  const submissionId = text(raw.submissionId, 80);
  const turnstileToken = text(raw.turnstileToken, 2200);
  if (!kind) errors.kind = 'Unknown enquiry type.';
  if (name.length < 2) errors.name = 'Please enter your full name.';
  if (!phone) errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (!submissionId || !/^[a-zA-Z0-9-]{16,80}$/.test(submissionId)) errors.form = 'Invalid submission identifier.';
  if (raw.enquiryConsent !== true) errors.enquiryConsent = 'Consent is required to process this enquiry.';
  if (!turnstileToken) errors.turnstile = 'Please complete the security check.';
  if (Object.keys(errors).length || !kind || !phone) return { ok: false, errors };

  const details: Record<string, string> = {};
  const inputDetails = raw.details && typeof raw.details === 'object' ? raw.details : {};
  for (const key of allowedDetails[kind]) {
    const value = text(inputDetails[key], 2000);
    if (value) details[key] = value;
  }
  const inputAttribution = raw.attribution && typeof raw.attribution === 'object' ? raw.attribution : {};
  const attribution: LeadAttribution = {
    landingPage: text(inputAttribution.landingPage, 500) || undefined,
    currentPage: text(inputAttribution.currentPage, 500) || undefined,
    referrer: text(inputAttribution.referrer, 500) || undefined,
    utmSource: text(inputAttribution.utmSource, 120) || undefined,
    utmMedium: text(inputAttribution.utmMedium, 120) || undefined,
    utmCampaign: text(inputAttribution.utmCampaign, 180) || undefined,
  };
  return {
    ok: true,
    value: {
      version: 1,
      submissionId,
      kind,
      name,
      phone,
      email: email || undefined,
      enquiryConsent: true,
      marketingConsent: raw.marketingConsent === true,
      details,
      attribution,
      submittedAt: text(raw.submittedAt, 40) || new Date().toISOString(),
      turnstileToken,
    },
  };
}

export function leadSummary(lead: LeadSubmission) {
  const lines = [
    `Website submission: ${lead.submissionId}`,
    `Type: ${lead.kind}`,
    ...Object.entries(lead.details).map(([key, value]) => `${key}: ${value}`),
    `Landing page: ${lead.attribution.landingPage ?? ''}`,
    `Current page: ${lead.attribution.currentPage ?? ''}`,
    `Referrer: ${lead.attribution.referrer ?? ''}`,
    `UTM source: ${lead.attribution.utmSource ?? ''}`,
    `UTM medium: ${lead.attribution.utmMedium ?? ''}`,
    `UTM campaign: ${lead.attribution.utmCampaign ?? ''}`,
    `Enquiry consent: yes`,
    `Marketing consent: ${lead.marketingConsent ? 'yes' : 'no'}`,
    `Submitted at: ${lead.submittedAt}`,
  ];
  return lines.join('\n').slice(0, 32000);
}

