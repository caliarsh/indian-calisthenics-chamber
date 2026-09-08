import assert from 'node:assert/strict';
import { leadSummary, normalizeIndianPhone, validateLeadSubmission } from '../lib/crm';

const valid = {
  version: 1 as const,
  submissionId: '2d165d8a-6b99-42a6-8eb6-7c84fa1bdf41',
  kind: 'training-enquiry' as const,
  name: 'Test Athlete',
  phone: '99028 28888',
  email: 'athlete@example.com',
  enquiryConsent: true,
  marketingConsent: false,
  details: { mode: 'Offline', branch: 'bengaluru', goal: 'Strict pull-ups', ignored: 'must not pass' },
  attribution: { landingPage: 'https://indiancalisthenicschamber.com/?utm_source=instagram', utmSource: 'instagram' },
  submittedAt: '2026-09-08T10:00:00.000Z',
  turnstileToken: 'test-token',
};

assert.equal(normalizeIndianPhone('9902828888'), '+919902828888');
assert.equal(normalizeIndianPhone('+91 93190 45223'), '+919319045223');
assert.equal(normalizeIndianPhone('12345'), null);

const result = validateLeadSubmission(valid);
assert.equal(result.ok, true);
if (result.ok) {
  assert.equal(result.value.phone, '+919902828888');
  assert.equal(result.value.details.ignored, undefined);
  assert.match(leadSummary(result.value), /UTM source: instagram/);
}

for (const mutation of [
  { phone: '-1' },
  { email: 'not-an-email' },
  { enquiryConsent: false },
  { turnstileToken: '' },
  { submissionId: 'short' },
]) assert.equal(validateLeadSubmission({ ...valid, ...mutation }).ok, false);

console.log('CRM payload validation checks passed.');

