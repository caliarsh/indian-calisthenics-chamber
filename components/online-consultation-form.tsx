'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { onlineOffers, siteConfig, type Level } from '@/lib/site-config';

type FieldName = 'name' | 'level' | 'setup' | 'offer' | 'goal' | 'consultationTime';
type FormErrors = Partial<Record<FieldName, string>>;

function readText(form: FormData, field: FieldName) {
  const value = form.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function isLevel(value: string): value is Level {
  return value === 'L1' || value === 'L2' || value === 'L3';
}

export function OnlineConsultationForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [level, setLevel] = useState('');
  const [offerId, setOfferId] = useState('free-consultation');
  const [assessed, setAssessed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryLevel = params.get('level') ?? '';
    const queryOffer = params.get('offer') ?? '';

    queueMicrotask(() => {
      if (isLevel(queryLevel)) {
        setLevel(queryLevel);
        setAssessed(true);
      }
      if (onlineOffers.some((offer) => offer.id === queryOffer)) setOfferId(queryOffer);
    });
  }, []);

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: readText(form, 'name'),
      level: readText(form, 'level'),
      setup: readText(form, 'setup'),
      offer: readText(form, 'offer'),
      goal: readText(form, 'goal'),
      consultationTime: readText(form, 'consultationTime'),
    };
    const selectedOffer = onlineOffers.find((offer) => offer.id === values.offer);
    const nextErrors: FormErrors = {};

    if (!values.name) nextErrors.name = 'Please tell us your name.';
    if (!values.level) nextErrors.level = 'Choose your current level.';
    if (!values.setup) nextErrors.setup = 'Choose where you will train.';
    if (!selectedOffer) nextErrors.offer = 'Choose an offer to discuss.';
    if (!values.goal) nextErrors.goal = 'Tell us what you want to achieve.';
    if (!values.consultationTime) nextErrors.consultationTime = 'Choose a preferred consultation window.';

    setErrors(nextErrors);
    setSent(false);
    if (Object.keys(nextErrors).length || !selectedOffer) return;

    const onlineContact = siteConfig.locations.find((location) => location.id === 'bengaluru');
    if (!onlineContact) return;

    const message = [
      `Hi ${siteConfig.name}, I’d like to book a free 20-minute online consultation.`,
      '',
      `Name: ${values.name}`,
      `Current level: ${values.level}${assessed ? ' (website assessment)' : ''}`,
      `Training setup: ${values.setup}`,
      `Interested in: ${selectedOffer.name} (${selectedOffer.price})`,
      `Training goal: ${values.goal}`,
      `Preferred consultation time: ${values.consultationTime}`,
    ].join('\n');

    window.open(`https://wa.me/${onlineContact.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return (
    <form className="trial-form online-consultation-form" onSubmit={handleSubmit} noValidate>
      {assessed && <p className="assessed-badge">Assessment result applied: {level}</p>}
      <div className="field-grid">
        <div className="field">
          <label htmlFor="online-name">Your name</label>
          <Input id="online-name" name="name" autoComplete="name" placeholder="Enter your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'online-name-error' : undefined} />
          {errors.name && <p className="field-error" id="online-name-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="online-level">Current level</label>
          <NativeSelect className="form-select" id="online-level" name="level" value={level} onChange={(event) => setLevel(event.target.value)} aria-invalid={Boolean(errors.level)} aria-describedby={errors.level ? 'online-level-error' : undefined}>
            <NativeSelectOption value="" disabled>Select your level</NativeSelectOption>
            <NativeSelectOption value="Not sure">Not sure yet</NativeSelectOption>
            <NativeSelectOption value="L1">L1 · Foundations</NativeSelectOption>
            <NativeSelectOption value="L2">L2 · Strength</NativeSelectOption>
            <NativeSelectOption value="L3">L3 · Performance</NativeSelectOption>
          </NativeSelect>
          {errors.level && <p className="field-error" id="online-level-error">{errors.level}</p>}
        </div>
      </div>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="training-setup">Training setup</label>
          <NativeSelect className="form-select" id="training-setup" name="setup" defaultValue="" aria-invalid={Boolean(errors.setup)} aria-describedby={errors.setup ? 'training-setup-error' : undefined}>
            <NativeSelectOption value="" disabled>Home or gym</NativeSelectOption>
            <NativeSelectOption value="Home">Home</NativeSelectOption>
            <NativeSelectOption value="Gym">Gym</NativeSelectOption>
          </NativeSelect>
          {errors.setup && <p className="field-error" id="training-setup-error">{errors.setup}</p>}
        </div>
        <div className="field">
          <label htmlFor="online-offer">Offer to discuss</label>
          <NativeSelect className="form-select" id="online-offer" name="offer" value={offerId} onChange={(event) => setOfferId(event.target.value)} aria-invalid={Boolean(errors.offer)} aria-describedby={errors.offer ? 'online-offer-error' : undefined}>
            {onlineOffers.map((offer) => <NativeSelectOption value={offer.id} key={offer.id}>{offer.name} · {offer.price}</NativeSelectOption>)}
          </NativeSelect>
          {errors.offer && <p className="field-error" id="online-offer-error">{errors.offer}</p>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="online-goal">What would you like to achieve?</label>
        <Textarea id="online-goal" name="goal" placeholder="For example: build strength, learn a handstand, or follow a structured transformation plan" aria-invalid={Boolean(errors.goal)} aria-describedby={errors.goal ? 'online-goal-error' : undefined} />
        {errors.goal && <p className="field-error" id="online-goal-error">{errors.goal}</p>}
      </div>
      <div className="field">
        <label htmlFor="consultation-time">Preferred consultation window</label>
        <NativeSelect className="form-select" id="consultation-time" name="consultationTime" defaultValue="" aria-invalid={Boolean(errors.consultationTime)} aria-describedby={errors.consultationTime ? 'consultation-time-error' : undefined}>
          <NativeSelectOption value="" disabled>Choose a time window</NativeSelectOption>
          <NativeSelectOption value="Weekday morning">Weekday morning</NativeSelectOption>
          <NativeSelectOption value="Weekday afternoon">Weekday afternoon</NativeSelectOption>
          <NativeSelectOption value="Weekday evening">Weekday evening</NativeSelectOption>
          <NativeSelectOption value="Weekend">Weekend</NativeSelectOption>
        </NativeSelect>
        {errors.consultationTime && <p className="field-error" id="consultation-time-error">{errors.consultationTime}</p>}
      </div>
      <Button className="form-button" type="submit"><MessageCircle aria-hidden="true" /> Continue on WhatsApp <ArrowUpRight aria-hidden="true" /></Button>
      <p className="form-note">Your message opens in WhatsApp. No payment is required to book the consultation.</p>
      {sent && <output className="form-success" aria-live="polite">Your consultation request is ready in WhatsApp.</output>}
    </form>
  );
}
