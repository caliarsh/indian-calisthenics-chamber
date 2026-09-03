'use client';

import { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/site-config';

type FieldName = 'name' | 'experience' | 'goal' | 'session';
type FormErrors = Partial<Record<FieldName, string>>;

function readText(form: FormData, field: FieldName) {
  const value = form.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

export function TrialForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: readText(form, 'name'),
      experience: readText(form, 'experience'),
      goal: readText(form, 'goal'),
      session: readText(form, 'session'),
    };

    const nextErrors: FormErrors = {};
    if (!values.name) nextErrors.name = 'Please tell us your name.';
    if (!values.experience) nextErrors.experience = 'Choose your current level.';
    if (!values.goal) nextErrors.goal = 'Tell us what you want to work towards.';
    if (!values.session) nextErrors.session = 'Choose a preferred session.';
    setErrors(nextErrors);
    setSent(false);
    if (Object.keys(nextErrors).length) return;

    const message = [
      `Hi ${siteConfig.name}, I’d like to book a trial.`,
      '',
      `Name: ${values.name}`,
      `Experience: ${values.experience}`,
      `Training goal: ${values.goal}`,
      `Preferred session: ${values.session}`,
    ].join('\n');
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return (
    <form className="trial-form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <Input id="name" name="name" autoComplete="name" placeholder="Enter your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="experience">Experience level</label>
          <NativeSelect className="form-select" id="experience" name="experience" aria-invalid={Boolean(errors.experience)} aria-describedby={errors.experience ? 'experience-error' : undefined} defaultValue="">
            <NativeSelectOption value="" disabled>Select your level</NativeSelectOption>
            <NativeSelectOption value="Complete beginner">Complete beginner</NativeSelectOption>
            <NativeSelectOption value="Some training experience">Some training experience</NativeSelectOption>
            <NativeSelectOption value="Intermediate athlete">Intermediate athlete</NativeSelectOption>
            <NativeSelectOption value="Advanced athlete">Advanced athlete</NativeSelectOption>
          </NativeSelect>
          {errors.experience && <p className="field-error" id="experience-error">{errors.experience}</p>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="goal">What would you like to achieve?</label>
        <Textarea id="goal" name="goal" placeholder="For example: my first pull-up, a stronger handstand, or better movement control" aria-invalid={Boolean(errors.goal)} aria-describedby={errors.goal ? 'goal-error' : undefined} />
        {errors.goal && <p className="field-error" id="goal-error">{errors.goal}</p>}
      </div>
      <div className="field">
        <label htmlFor="session">Preferred session</label>
        <NativeSelect className="form-select" id="session" name="session" aria-invalid={Boolean(errors.session)} aria-describedby={errors.session ? 'session-error' : undefined} defaultValue="">
          <NativeSelectOption value="" disabled>Choose a session</NativeSelectOption>
          <NativeSelectOption value="Weekday morning">Weekday morning</NativeSelectOption>
          <NativeSelectOption value="Weekday evening">Weekday evening</NativeSelectOption>
          <NativeSelectOption value="Saturday morning">Saturday morning</NativeSelectOption>
        </NativeSelect>
        {errors.session && <p className="field-error" id="session-error">{errors.session}</p>}
      </div>
      <Button className="form-button" type="submit">
        <MessageCircle aria-hidden="true" /> Continue on WhatsApp <ArrowUpRight aria-hidden="true" />
      </Button>
      <p className="form-note">We’ll prepare your message and open WhatsApp. No payment required.</p>
      {sent && <output className="form-success" aria-live="polite">Your trial request is ready in WhatsApp.</output>}
    </form>
  );
}
