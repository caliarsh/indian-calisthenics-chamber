'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { ContactAndConsentFields, CrmSubmitStatus, TurnstileField, type ConsentState } from '@/components/crm-form-fields';
import { buildLeadSubmission, saveLead } from '@/lib/crm-client';
import type { LeadSubmission } from '@/lib/crm';
import { offlineOffers, onlineOffers, siteConfig, type Level, type TrainingMode } from '@/lib/site-config';

type FieldName = 'name' | 'phone' | 'email' | 'enquiryConsent' | 'turnstile' | 'experience' | 'goal' | 'mode' | 'location' | 'program' | 'date' | 'session';
type FormErrors = Partial<Record<FieldName, string>>;
type BookingOption = { id: string; label: string };
type SubmitState = { type: 'idle' | 'saving' | 'saved' | 'fallback'; message?: string };
const onlineGroup: BookingOption = { id: 'online-group', label: 'Online Group Classes · L1' };
const readText = (form: FormData, field: FieldName) => {
  const value = form.get(field);
  return typeof value === 'string' ? value.trim() : '';
};
const isLevel = (value: string): value is Level => value === 'L1' || value === 'L2' || value === 'L3';
const isMode = (value: string): value is TrainingMode => value === 'Online' || value === 'Offline';
const validPhone = (value: string) => /^(?:\+?91)?[6-9]\d{9}$/.test(value.replace(/[\s()-]/g, ''));
const validEmail = (value: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function TrialForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [experience, setExperience] = useState('');
  const [mode, setMode] = useState<TrainingMode | ''>('');
  const [location, setLocation] = useState('');
  const [program, setProgram] = useState('');
  const [assessed, setAssessed] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({ enquiry: false, marketing: false });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({ type: 'idle' });
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [pendingLead, setPendingLead] = useState<LeadSubmission | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryLevel = params.get('level') ?? '';
    const queryMode = params.get('mode') ?? '';
    const queryLocation = params.get('location') ?? '';
    const queryOffer = params.get('offer') ?? '';
    queueMicrotask(() => {
      if (isLevel(queryLevel)) { setExperience(queryLevel); setAssessed(true); }
      if (isMode(queryMode)) setMode(queryMode);
      if (queryMode === 'Offline' && siteConfig.locations.some(item => item.id === queryLocation)) setLocation(queryLocation);
      if (queryOffer) setProgram(queryOffer);
    });
  }, []);

  const options = useMemo<BookingOption[]>(() => {
    if (mode === 'Online') {
      const offers = onlineOffers.map(item => ({ id: item.id, label: `${item.name} · ${item.price}` }));
      return !isLevel(experience) || experience === 'L1' ? [...offers, onlineGroup] : offers;
    }
    if (mode === 'Offline') return offlineOffers
      .filter(item => (!location || item.locationIds.includes(location as 'bengaluru' | 'hyderabad')) && (!isLevel(experience) || item.id !== 'athlete-batch-monthly' || experience === 'L3'))
      .map(item => ({ id: item.id, label: `${item.category}${item.trainer ? ` · ${item.trainer}` : ''} · ${item.name} · ${item.price}${item.bonus ? ` · ${item.bonus}` : ''}` }));
    return [];
  }, [experience, location, mode]);
  const selectedOption = options.find(item => item.id === program);

  const attemptSave = useCallback(async (lead: LeadSubmission, url: string) => {
    setSubmitState({ type: 'saving' });
    const result = await saveLead(lead);
    if (result.ok) {
      setSubmitState({ type: 'saved' });
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (!result.fallback && result.errors) { setErrors(current => ({ ...current, ...result.errors })); setSubmitState({ type: 'idle' }); return; }
    setSubmitState({ type: 'fallback', message: result.message });
  }, []);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = { name: readText(form, 'name'), phone: readText(form, 'phone'), email: readText(form, 'email'), experience: readText(form, 'experience'), goal: readText(form, 'goal'), mode: readText(form, 'mode'), location: readText(form, 'location'), program: readText(form, 'program'), date: readText(form, 'date'), session: readText(form, 'session') };
    const selectedLocation = values.mode === 'Offline' ? siteConfig.locations.find(item => item.id === values.location) : undefined;
    const option = options.find(item => item.id === values.program);
    const nextErrors: FormErrors = {};
    if (!values.name) nextErrors.name = 'Please tell us your name.';
    if (!validPhone(values.phone)) nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!validEmail(values.email)) nextErrors.email = 'Enter a valid email address.';
    if (!consent.enquiry) nextErrors.enquiryConsent = 'Please agree so ICC can respond to your enquiry.';
    if (!values.experience) nextErrors.experience = 'Choose your current level.';
    if (!isMode(values.mode)) nextErrors.mode = 'Choose online or offline training.';
    if (values.mode === 'Offline' && !selectedLocation) nextErrors.location = 'Choose the city you are booking for.';
    if (!option) nextErrors.program = 'Choose a program or offer.';
    if (!values.goal) nextErrors.goal = 'Tell us what you want to work towards.';
    if (values.mode === 'Online' && !values.date) nextErrors.date = 'Choose a preferred call date.';
    if (!values.session) nextErrors.session = values.mode === 'Online' ? 'Choose a preferred call time.' : 'Choose a preferred training time.';
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) nextErrors.turnstile = 'Please complete the security check.';
    setErrors(nextErrors);
    setSubmitState({ type: 'idle' });
    if (Object.keys(nextErrors).length || !isMode(values.mode) || !option) return;
    const whatsappNumber = values.mode === 'Offline' ? selectedLocation?.whatsappNumber : siteConfig.onlineWhatsappNumber;
    if (!whatsappNumber) return;
    const message = [
      `Hi ${siteConfig.name}, I’d like to ${values.mode === 'Online' ? 'set up a free 15-minute online consultation' : 'book an offline trial'}.`, '',
      `Name: ${values.name}`, `Mobile: ${values.phone}`, ...(values.email ? [`Email: ${values.email}`] : []),
      `Level: ${values.experience}${assessed ? ' (website assessment)' : ''}`, `Training mode: ${values.mode}`,
      ...(selectedLocation ? [`Booking city: ${selectedLocation.name}`] : []), `Program / offer: ${option.label}`, `Training goal: ${values.goal}`,
      ...(values.mode === 'Online' ? [`Requested call date: ${values.date}`, `Requested call time: ${values.session}`, 'Call duration: 15 minutes'] : [`Preferred training time: ${values.session}`]),
    ].join('\n');
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const lead = buildLeadSubmission({
      kind: 'training-enquiry', name: values.name, phone: values.phone, email: values.email, enquiryConsent: consent.enquiry, marketingConsent: consent.marketing,
      details: { level: values.experience, assessed: assessed ? 'yes' : 'no', mode: values.mode, ...(selectedLocation ? { branch: selectedLocation.id } : {}), program: option.label, goal: values.goal, ...(values.date ? { preferredDate: values.date } : {}), preferredTime: values.session },
      turnstileToken: turnstileToken || 'configuration-pending',
    });
    setWhatsappUrl(url); setPendingLead(lead);
    await attemptSave(lead, url);
  }

  return <form className="trial-form" onSubmit={handleSubmit} noValidate>
    {assessed && <p className="assessed-badge">Assessment result applied: {experience}</p>}
    <div className="field-grid"><div className="field"><label htmlFor="name">Your name</label><Input id="name" name="name" autoComplete="name" placeholder="Enter your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div>
    <div className="field"><label htmlFor="experience">Current level</label><NativeSelect className="form-select" id="experience" name="experience" value={experience} onChange={e => { setExperience(e.target.value); setProgram(''); }} aria-invalid={Boolean(errors.experience)} aria-describedby={errors.experience ? 'experience-error' : undefined}><NativeSelectOption value="" disabled>Select your level</NativeSelectOption><NativeSelectOption value="Not sure">Not sure yet</NativeSelectOption><NativeSelectOption value="L1">L1 · Foundations</NativeSelectOption><NativeSelectOption value="L2">L2 · Strength</NativeSelectOption><NativeSelectOption value="L3">L3 · Performance</NativeSelectOption></NativeSelect>{errors.experience && <p className="field-error" id="experience-error">{errors.experience}</p>}</div></div>
    <ContactAndConsentFields prefix="trial" errors={errors} consent={consent} onConsentChange={setConsent} />
    <div className="field-grid"><div className="field"><label htmlFor="mode">Training mode</label><NativeSelect className="form-select" id="mode" name="mode" value={mode} onChange={e => { setMode(e.target.value as TrainingMode); setLocation(''); setProgram(''); }} aria-invalid={Boolean(errors.mode)} aria-describedby={errors.mode ? 'mode-error' : undefined}><NativeSelectOption value="" disabled>Online or offline</NativeSelectOption><NativeSelectOption value="Online">Online</NativeSelectOption><NativeSelectOption value="Offline">Offline</NativeSelectOption></NativeSelect>{errors.mode && <p className="field-error" id="mode-error">{errors.mode}</p>}</div>
    <div className="field"><label htmlFor="program">Program or offer</label><NativeSelect className="form-select" id="program" name="program" value={selectedOption ? program : ''} disabled={!mode} onChange={e => setProgram(e.target.value)} aria-invalid={Boolean(errors.program)} aria-describedby={errors.program ? 'program-error' : undefined}><NativeSelectOption value="" disabled>{mode ? 'Choose an option' : 'Choose mode first'}</NativeSelectOption>{options.map(item => <NativeSelectOption value={item.id} key={item.id}>{item.label}</NativeSelectOption>)}</NativeSelect>{errors.program && <p className="field-error" id="program-error">{errors.program}</p>}</div></div>
    {mode === 'Offline' && <div className="field"><label htmlFor="location">City <span aria-hidden="true">*</span></label><NativeSelect className="form-select" id="location" name="location" value={location} onChange={e => { setLocation(e.target.value); setProgram(''); }} required aria-required="true" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? 'location-error' : undefined}><NativeSelectOption value="" disabled>Choose Bengaluru or Hyderabad</NativeSelectOption>{siteConfig.locations.map(item => <NativeSelectOption value={item.id} key={item.id}>{item.area}</NativeSelectOption>)}</NativeSelect>{errors.location && <p className="field-error" id="location-error">{errors.location}</p>}</div>}
    <div className="field"><label htmlFor="goal">What would you like to achieve?</label><Textarea id="goal" name="goal" placeholder="Tell us your goal" aria-invalid={Boolean(errors.goal)} aria-describedby={errors.goal ? 'goal-error' : undefined} />{errors.goal && <p className="field-error" id="goal-error">{errors.goal}</p>}</div>
    {mode === 'Online' ? <div className="field-grid"><div className="field"><label htmlFor="date">Preferred call date</label><Input id="date" name="date" type="date" aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'date-error' : undefined} />{errors.date && <p className="field-error" id="date-error">{errors.date}</p>}</div><div className="field"><label htmlFor="session">Preferred call time</label><Input id="session" name="session" type="time" aria-invalid={Boolean(errors.session)} aria-describedby={errors.session ? 'session-error' : undefined} />{errors.session && <p className="field-error" id="session-error">{errors.session}</p>}</div></div> : <div className="field"><label htmlFor="session">Preferred training time</label><NativeSelect className="form-select" id="session" name="session" defaultValue="" aria-invalid={Boolean(errors.session)} aria-describedby={errors.session ? 'session-error' : undefined}><NativeSelectOption value="" disabled>Choose a time</NativeSelectOption>{['Weekday morning','Weekday evening','By appointment'].map(value => <NativeSelectOption value={value} key={value}>{value}</NativeSelectOption>)}</NativeSelect>{errors.session && <p className="field-error" id="session-error">{errors.session}</p>}</div>}
    <TurnstileField onTokenChange={setTurnstileToken} error={errors.turnstile} />
    <Button className="form-button" type="submit" disabled={submitState.type === 'saving'}><MessageCircle aria-hidden="true" /> {submitState.type === 'saving' ? 'Saving request…' : 'Save & continue on WhatsApp'} <ArrowUpRight aria-hidden="true" /></Button>
    <p className="form-note">We securely save your enquiry for follow-up, then prepare your WhatsApp message. No payment is taken here.</p>
    <CrmSubmitStatus state={submitState} whatsappUrl={whatsappUrl} onRetry={pendingLead && whatsappUrl ? () => attemptSave(pendingLead, whatsappUrl) : undefined} />
  </form>;
}
