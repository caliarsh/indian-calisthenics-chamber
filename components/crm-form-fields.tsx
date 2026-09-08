'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { saveLead } from '@/lib/crm-client';
import type { LeadSubmission } from '@/lib/crm';

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

export type ConsentState = { enquiry: boolean; marketing: boolean };

export function useCrmSubmission() {
  const [consent, setConsent] = useState<ConsentState>({ enquiry: false, marketing: false });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [state, setState] = useState<{ type: 'idle' | 'saving' | 'saved' | 'fallback'; message?: string }>({ type: 'idle' });
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [pendingLead, setPendingLead] = useState<LeadSubmission | null>(null);
  const submit = useCallback(async (lead: LeadSubmission, url: string) => {
    setPendingLead(lead); setWhatsappUrl(url); setState({ type: 'saving' });
    const result = await saveLead(lead);
    if (result.ok) {
      setState({ type: 'saved' });
      window.open(url, '_blank', 'noopener,noreferrer');
      return null;
    }
    if (!result.fallback && result.errors) { setState({ type: 'idle' }); return result.errors; }
    setState({ type: 'fallback', message: result.message });
    return null;
  }, []);
  const retry = useCallback(() => pendingLead && whatsappUrl ? submit(pendingLead, whatsappUrl) : undefined, [pendingLead, submit, whatsappUrl]);
  return { consent, setConsent, turnstileToken, setTurnstileToken, state, whatsappUrl, submit, retry };
}

export function ContactAndConsentFields({
  prefix,
  errors,
  consent,
  onConsentChange,
}: {
  prefix: string;
  errors: Record<string, string>;
  consent: ConsentState;
  onConsentChange: (next: ConsentState) => void;
}) {
  return <>
    <div className="field-grid">
      <div className="field"><label htmlFor={`${prefix}-phone`}>Mobile number</label><Input id={`${prefix}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${prefix}-phone-error` : undefined} />{errors.phone && <p className="field-error" id={`${prefix}-phone-error`}>{errors.phone}</p>}</div>
      <div className="field"><label htmlFor={`${prefix}-email`}>Email <span>(optional)</span></label><Input id={`${prefix}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${prefix}-email-error` : undefined} />{errors.email && <p className="field-error" id={`${prefix}-email-error`}>{errors.email}</p>}</div>
    </div>
    <div className="consent-stack">
      <label className="consent-row" htmlFor={`${prefix}-enquiry-consent`}><Checkbox id={`${prefix}-enquiry-consent`} checked={consent.enquiry} onCheckedChange={checked => onConsentChange({ ...consent, enquiry: checked === true })} aria-invalid={Boolean(errors.enquiryConsent)} /><span>I agree that ICC may use these details to respond to this enquiry and arrange follow-up. <Link href="/privacy">Privacy notice</Link>.</span></label>
      {errors.enquiryConsent && <p className="field-error" id={`${prefix}-consent-error`}>{errors.enquiryConsent}</p>}
      <label className="consent-row" htmlFor={`${prefix}-marketing-consent`}><Checkbox id={`${prefix}-marketing-consent`} checked={consent.marketing} onCheckedChange={checked => onConsentChange({ ...consent, marketing: checked === true })} /><span>Send me occasional ICC program, event, and workshop updates. Optional.</span></label>
    </div>
  </>;
}

export function TurnstileField({ onTokenChange, error }: { onTokenChange: (token: string) => void; error?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !container.current || !window.turnstile || widget.current) return;
      widget.current = window.turnstile.render(container.current, {
        sitekey: siteKey,
        theme: 'light',
        callback: (token: string) => onTokenChange(token),
        'expired-callback': () => onTokenChange(''),
        'error-callback': () => { onTokenChange(''); setFailed(true); },
      });
    };
    const existing = document.querySelector<HTMLScriptElement>('script[data-icc-turnstile]');
    if (existing) {
      if (window.turnstile) render(); else existing.addEventListener('load', render, { once: true });
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.iccTurnstile = 'true';
      script.addEventListener('load', render, { once: true });
      script.addEventListener('error', () => setFailed(true), { once: true });
      document.head.appendChild(script);
    }
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = undefined;
    };
  }, [onTokenChange, siteKey]);

  const notice = error || (failed ? 'The security check could not load. WhatsApp fallback remains available.' : !siteKey ? 'Secure CRM saving is being configured. WhatsApp fallback remains available.' : '');
  return <div className="turnstile-field"><div ref={container} />{notice && <p className={error ? 'field-error' : 'turnstile-note'}>{notice}</p>}</div>;
}

export function CrmSubmitStatus({ state, whatsappUrl, onRetry }: { state: { type: 'idle' | 'saving' | 'saved' | 'fallback'; message?: string }; whatsappUrl: string; onRetry?: () => void }) {
  if (state.type === 'idle') return null;
  if (state.type === 'saving') return <output className="form-status">Saving your request securely…</output>;
  if (state.type === 'saved') return <output className="form-status success"><strong>Your request was saved.</strong><a href={whatsappUrl} target="_blank" rel="noreferrer">Continue on WhatsApp</a></output>;
  return <div className="form-status fallback" role="alert"><strong>{state.message || 'Online saving is temporarily unavailable.'}</strong><div>{onRetry && <button type="button" onClick={onRetry}>Retry saving</button>}<a href={whatsappUrl} target="_blank" rel="noreferrer">Continue only on WhatsApp</a></div></div>;
}
