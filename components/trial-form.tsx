'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

type FieldErrors = Partial<Record<'name' | 'phone' | 'form', string>>;
type SubmitState = 'idle' | 'saving' | 'saved';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const countryOptions = getCountries()
  .map((code) => ({ code, name: regionNames.of(code) ?? code, dialCode: getCountryCallingCode(code) }))
  .sort((left, right) => left.name.localeCompare(right.name));

function validatedPhone(value: string, country: CountryCode) {
  const parsed = parsePhoneNumberFromString(value, country);
  if (!parsed?.isValid()) return null;
  if (value.trim().startsWith('+') && parsed.countryCallingCode !== getCountryCallingCode(country)) return null;
  return parsed.number;
}
const readText = (form: FormData, field: string) => {
  const value = form.get(field);
  return typeof value === 'string' ? value.trim() : '';
};

export function TrialForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [country, setCountry] = useState<CountryCode>('IN');

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = readText(form, 'name');
    const phone = readText(form, 'phone');
    const normalizedPhone = validatedPhone(phone, country);
    const website = readText(form, 'website');
    const nextErrors: FieldErrors = {};

    if (name.length < 2) nextErrors.name = 'Please enter your name.';
    if (!normalizedPhone) nextErrors.phone = `Enter a valid phone number for ${regionNames.of(country) ?? country}.`;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitState('saving');
    try {
      const response = await fetch('/api/trial-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: normalizedPhone, phoneCountry: country, website, sourcePage: window.location.href }),
      });
      const result = await response.json().catch(() => ({})) as { success?: boolean; message?: string; errors?: FieldErrors };
      if (!response.ok || !result.success) {
        setErrors(result.errors ?? { form: result.message || 'We could not save your request. Please try again.' });
        setSubmitState('idle');
        return;
      }
      formElement.reset();
      setCountry('IN');
      setSubmitState('saved');
    } catch {
      setErrors({ form: 'We could not save your request. Please try again.' });
      setSubmitState('idle');
    }
  }

  if (submitState === 'saved') {
    return <output className="trial-form-success"><CheckCircle2 aria-hidden="true" /><h2>Thank you.</h2><p>Your details have been received. The ICC team will contact you shortly.</p></output>;
  }

  return <form className="trial-form trial-form-short" onSubmit={handleSubmit} noValidate>
    <div className="field"><label htmlFor="trial-name">Your name</label><Input id="trial-name" name="name" autoComplete="name" placeholder="Enter your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'trial-name-error' : undefined} />{errors.name && <p className="field-error" id="trial-name-error">{errors.name}</p>}</div>
    <div className="trial-phone-row">
      <div className="field"><label htmlFor="trial-country">Country code</label><NativeSelect id="trial-country" name="phoneCountry" value={country} onChange={(event) => { setCountry(event.target.value as CountryCode); setErrors((current) => ({ ...current, phone: undefined })); }} aria-label="Country calling code">{countryOptions.map((option) => <NativeSelectOption key={option.code} value={option.code}>{option.name} (+{option.dialCode})</NativeSelectOption>)}</NativeSelect></div>
      <div className="field"><label htmlFor="trial-phone">Mobile number</label><Input id="trial-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter mobile number" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'trial-phone-error' : undefined} />{errors.phone && <p className="field-error" id="trial-phone-error">{errors.phone}</p>}</div>
    </div>
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="trial-website">Website</label><Input id="trial-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    {errors.form && <p className="field-error form-error" role="alert">{errors.form}</p>}
    <Button className="form-button" type="submit" disabled={submitState === 'saving'}>{submitState === 'saving' ? 'Sending…' : 'Request a callback'} <ArrowUpRight aria-hidden="true" /></Button>
    <p className="form-note">By submitting, you agree that ICC may contact you about your enquiry. <Link href="/privacy">Privacy notice</Link>.</p>
  </form>;
}
