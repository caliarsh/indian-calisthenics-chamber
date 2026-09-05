'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { programs, siteConfig, type Level, type TrainingMode } from '@/lib/site-config';

type FieldName = 'name' | 'experience' | 'goal' | 'mode' | 'location' | 'program' | 'session';
type FormErrors = Partial<Record<FieldName, string>>;

function readText(form: FormData, field: FieldName) {
  const value = form.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function isLevel(value: string): value is Level {
  return value === 'L1' || value === 'L2' || value === 'L3';
}

export function TrialForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [experience, setExperience] = useState('');
  const [mode, setMode] = useState<TrainingMode | ''>('');
  const [location, setLocation] = useState('');
  const [program, setProgram] = useState('');
  const [assessed, setAssessed] = useState(false);

  useEffect(() => {
    const level = new URLSearchParams(window.location.search).get('level') ?? '';
    if (isLevel(level)) {
      queueMicrotask(() => {
        setExperience(level);
        setAssessed(true);
      });
    }
  }, []);

  const availablePrograms = useMemo(() => programs.filter((item) => {
    if (!mode || item.mode !== mode) return false;
    return !isLevel(experience) || item.levels.includes(experience);
  }), [experience, mode]);

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: readText(form, 'name'),
      experience: readText(form, 'experience'),
      goal: readText(form, 'goal'),
      mode: readText(form, 'mode'),
      location: readText(form, 'location'),
      program: readText(form, 'program'),
      session: readText(form, 'session'),
    };

    const selectedLocation = siteConfig.locations.find((item) => item.name === values.location);
    const nextErrors: FormErrors = {};
    if (!values.name) nextErrors.name = 'Please tell us your name.';
    if (!values.experience) nextErrors.experience = 'Choose your current level.';
    if (!values.goal) nextErrors.goal = 'Tell us what you want to work towards.';
    if (!values.mode) nextErrors.mode = 'Choose online or offline training.';
    if (!selectedLocation) nextErrors.location = 'Choose the city you are booking for.';
    if (!values.program) nextErrors.program = 'Choose a training program.';
    if (!values.session) nextErrors.session = 'Choose a preferred session.';
    setErrors(nextErrors);
    setSent(false);
    if (Object.keys(nextErrors).length) return;
    if (!selectedLocation) return;

    const message = [
      `Hi ${siteConfig.name}, I’d like to book a trial.`,
      '',
      `Name: ${values.name}`,
      `Level: ${values.experience}${assessed ? ' (website assessment)' : ''}`,
      `Training mode: ${values.mode}`,
      `Booking city: ${selectedLocation.name}`,
      `Program: ${values.program}`,
      `Training goal: ${values.goal}`,
      `Preferred session: ${values.session}`,
    ].join('\n');
    const url = `https://wa.me/${selectedLocation.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return (
    <form className="trial-form" onSubmit={handleSubmit} noValidate>
      {assessed && <p className="assessed-badge">Assessment result applied: {experience}</p>}
      <div className="field-grid">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <Input id="name" name="name" autoComplete="name" placeholder="Enter your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="experience">Current level</label>
          <NativeSelect className="form-select" id="experience" name="experience" aria-invalid={Boolean(errors.experience)} aria-describedby={errors.experience ? 'experience-error' : undefined} value={experience} onChange={(event) => { setExperience(event.target.value); setProgram(''); }}>
            <NativeSelectOption value="" disabled>Select your level</NativeSelectOption>
            <NativeSelectOption value="Not sure">Not sure yet</NativeSelectOption>
            <NativeSelectOption value="L1">L1 · Foundations</NativeSelectOption>
            <NativeSelectOption value="L2">L2 · Strength</NativeSelectOption>
            <NativeSelectOption value="L3">L3 · Performance</NativeSelectOption>
          </NativeSelect>
          {errors.experience && <p className="field-error" id="experience-error">{errors.experience}</p>}
        </div>
      </div>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="mode">Training mode</label>
          <NativeSelect className="form-select" id="mode" name="mode" aria-invalid={Boolean(errors.mode)} aria-describedby={errors.mode ? 'mode-error' : undefined} value={mode} onChange={(event) => { setMode(event.target.value as TrainingMode); setProgram(''); }}>
            <NativeSelectOption value="" disabled>Online or offline</NativeSelectOption>
            <NativeSelectOption value="Online">Online</NativeSelectOption>
            <NativeSelectOption value="Offline">Offline</NativeSelectOption>
          </NativeSelect>
          {errors.mode && <p className="field-error" id="mode-error">{errors.mode}</p>}
        </div>
        <div className="field">
          <label htmlFor="program">Program</label>
          <NativeSelect className="form-select" id="program" name="program" aria-invalid={Boolean(errors.program)} aria-describedby={errors.program ? 'program-error' : undefined} value={program} disabled={!mode} onChange={(event) => setProgram(event.target.value)}>
            <NativeSelectOption value="" disabled>{mode ? 'Choose a program' : 'Choose mode first'}</NativeSelectOption>
            {availablePrograms.map((item) => <NativeSelectOption value={item.name} key={item.id}>{item.name} · {item.levels.join(', ')}</NativeSelectOption>)}
          </NativeSelect>
          {errors.program && <p className="field-error" id="program-error">{errors.program}</p>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="location">Booking city</label>
        <NativeSelect className="form-select" id="location" name="location" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? 'location-error' : undefined} value={location} onChange={(event) => setLocation(event.target.value)}>
          <NativeSelectOption value="" disabled>Choose Bengaluru or Hyderabad</NativeSelectOption>
          {siteConfig.locations.map((item) => <NativeSelectOption value={item.name} key={item.id}>{item.area}</NativeSelectOption>)}
        </NativeSelect>
        {errors.location && <p className="field-error" id="location-error">{errors.location}</p>}
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
          <NativeSelectOption value="By appointment">By appointment</NativeSelectOption>
        </NativeSelect>
        {errors.session && <p className="field-error" id="session-error">{errors.session}</p>}
      </div>
      <Button className="form-button" type="submit"><MessageCircle aria-hidden="true" /> Continue on WhatsApp <ArrowUpRight aria-hidden="true" /></Button>
      <p className="form-note">We’ll prepare your message and open WhatsApp. No payment required.</p>
      {sent && <output className="form-success" aria-live="polite">Your trial request is ready in WhatsApp.</output>}
    </form>
  );
}
