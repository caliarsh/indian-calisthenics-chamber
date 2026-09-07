'use client';

import { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/site-config';

type Errors = Record<string, string>;
const valueOf = (form: FormData, name: string) => {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
};

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="field-error" id={id}>{message}</p> : null;
}

export function InternshipApplicationForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function submit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = ['name', 'city', 'background', 'experience', 'reason', 'availability'] as const;
    const values = Object.fromEntries(fields.map(field => [field, valueOf(form, field)]));
    const next: Errors = {};
    if (!values.name) next.name = 'Please tell us your name.';
    if (!values.city) next.city = 'Choose your preferred training city.';
    if (!values.background) next.background = 'Choose the option that best describes you.';
    if (!values.experience) next.experience = 'Tell us about your training or coaching experience.';
    if (!values.reason) next.reason = 'Tell us why you want to become a trainer.';
    if (!values.availability) next.availability = 'Tell us when you can attend.';
    setErrors(next); setSent(false);
    const location = siteConfig.locations.find(item => item.id === values.city);
    if (Object.keys(next).length || !location) return;
    const message = [
      `Hi ${siteConfig.name}, I’d like to apply for the six-month ICC Trainer Internship.`, '',
      `Name: ${values.name}`, `Preferred city: ${location.name}`, `Current background: ${values.background}`,
      `Training / coaching experience: ${values.experience}`, `Why I want to join: ${values.reason}`, `Availability: ${values.availability}`,
    ].join('\n');
    window.open(`https://wa.me/${location.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return <form className="trial-form community-form" onSubmit={submit} noValidate>
    <div className="field-grid"><div className="field"><label htmlFor="intern-name">Your name</label><Input id="intern-name" name="name" autoComplete="name" placeholder="Enter your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'intern-name-error' : undefined} /><FieldError id="intern-name-error" message={errors.name} /></div>
    <div className="field"><label htmlFor="intern-city">Preferred city</label><NativeSelect className="form-select" id="intern-city" name="city" defaultValue="" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'intern-city-error' : undefined}><NativeSelectOption value="" disabled>Choose a city</NativeSelectOption>{siteConfig.locations.map(location => <NativeSelectOption key={location.id} value={location.id}>{location.name}</NativeSelectOption>)}</NativeSelect><FieldError id="intern-city-error" message={errors.city} /></div></div>
    <div className="field"><label htmlFor="intern-background">Your current background</label><NativeSelect className="form-select" id="intern-background" name="background" defaultValue="" aria-invalid={Boolean(errors.background)} aria-describedby={errors.background ? 'intern-background-error' : undefined}><NativeSelectOption value="" disabled>Choose one</NativeSelectOption><NativeSelectOption value="Calisthenics athlete">Calisthenics athlete</NativeSelectOption><NativeSelectOption value="Fitness trainer">Fitness trainer</NativeSelectOption><NativeSelectOption value="Fitness enthusiast">Fitness enthusiast</NativeSelectOption><NativeSelectOption value="Student or career starter">Student or career starter</NativeSelectOption></NativeSelect><FieldError id="intern-background-error" message={errors.background} /></div>
    <div className="field"><label htmlFor="intern-experience">Training or coaching experience</label><Textarea id="intern-experience" name="experience" placeholder="What have you trained, coached, or studied so far?" aria-invalid={Boolean(errors.experience)} aria-describedby={errors.experience ? 'intern-experience-error' : undefined} /><FieldError id="intern-experience-error" message={errors.experience} /></div>
    <div className="field"><label htmlFor="intern-reason">Why do you want to become an ICC trainer?</label><Textarea id="intern-reason" name="reason" placeholder="Tell us what draws you to coaching and calisthenics" aria-invalid={Boolean(errors.reason)} aria-describedby={errors.reason ? 'intern-reason-error' : undefined} /><FieldError id="intern-reason-error" message={errors.reason} /></div>
    <div className="field"><label htmlFor="intern-availability">Your availability</label><Input id="intern-availability" name="availability" placeholder="Example: weekday mornings and weekends" aria-invalid={Boolean(errors.availability)} aria-describedby={errors.availability ? 'intern-availability-error' : undefined} /><FieldError id="intern-availability-error" message={errors.availability} /></div>
    <Button className="form-button" type="submit"><MessageCircle aria-hidden="true" /> Apply on WhatsApp <ArrowUpRight aria-hidden="true" /></Button>
    <p className="form-note">Your answers are placed into a WhatsApp message to the selected ICC branch. They are not stored on this website.</p>{sent && <output className="form-success" aria-live="polite">Your application is ready in WhatsApp.</output>}
  </form>;
}

export function AthleteApplicationForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function submit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = ['name', 'city', 'discipline', 'level', 'competition', 'motivation', 'goal', 'instagram'] as const;
    const values = Object.fromEntries(fields.map(field => [field, valueOf(form, field)]));
    const next: Errors = {};
    if (!values.name) next.name = 'Please tell us your name.';
    if (!values.city) next.city = 'Choose your nearest ICC branch.';
    if (!values.discipline) next.discipline = 'Choose your primary discipline.';
    if (!values.level) next.level = 'Choose your current level.';
    if (!values.competition) next.competition = 'Tell us about your competition experience.';
    if (!values.motivation) next.motivation = 'Tell us why you want to represent ICC.';
    if (!values.goal) next.goal = 'Tell us what you want to achieve next.';
    setErrors(next); setSent(false);
    const location = siteConfig.locations.find(item => item.id === values.city);
    if (Object.keys(next).length || !location) return;
    const message = [
      `Hi ${siteConfig.name}, I’d like to apply to join the ICC athlete pathway.`, '',
      `Name: ${values.name}`, `Nearest branch: ${location.name}`, `Primary discipline: ${values.discipline}`, `Current level: ${values.level}`,
      `Competition experience: ${values.competition}`, `Why I want to represent ICC: ${values.motivation}`, `Next competitive goal: ${values.goal}`,
      ...(values.instagram ? [`Instagram / athlete profile: ${values.instagram}`] : []),
    ].join('\n');
    window.open(`https://wa.me/${location.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return <form className="trial-form community-form" onSubmit={submit} noValidate>
    <div className="field-grid"><div className="field"><label htmlFor="athlete-name">Your name</label><Input id="athlete-name" name="name" autoComplete="name" placeholder="Enter your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'athlete-name-error' : undefined} /><FieldError id="athlete-name-error" message={errors.name} /></div>
    <div className="field"><label htmlFor="athlete-city">Nearest ICC branch</label><NativeSelect className="form-select" id="athlete-city" name="city" defaultValue="" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'athlete-city-error' : undefined}><NativeSelectOption value="" disabled>Choose a city</NativeSelectOption>{siteConfig.locations.map(location => <NativeSelectOption key={location.id} value={location.id}>{location.name}</NativeSelectOption>)}</NativeSelect><FieldError id="athlete-city-error" message={errors.city} /></div></div>
    <div className="field-grid"><div className="field"><label htmlFor="athlete-discipline">Primary discipline</label><NativeSelect className="form-select" id="athlete-discipline" name="discipline" defaultValue="" aria-invalid={Boolean(errors.discipline)} aria-describedby={errors.discipline ? 'athlete-discipline-error' : undefined}><NativeSelectOption value="" disabled>Choose a discipline</NativeSelectOption>{['Statics','Freestyle','Streetlifting','Weighted Endurance','Still exploring'].map(item => <NativeSelectOption value={item} key={item}>{item}</NativeSelectOption>)}</NativeSelect><FieldError id="athlete-discipline-error" message={errors.discipline} /></div>
    <div className="field"><label htmlFor="athlete-level">Current level</label><NativeSelect className="form-select" id="athlete-level" name="level" defaultValue="" aria-invalid={Boolean(errors.level)} aria-describedby={errors.level ? 'athlete-level-error' : undefined}><NativeSelectOption value="" disabled>Choose your level</NativeSelectOption><NativeSelectOption value="L1">L1 · Foundations</NativeSelectOption><NativeSelectOption value="L2">L2 · Strength</NativeSelectOption><NativeSelectOption value="L3">L3 · Performance</NativeSelectOption><NativeSelectOption value="Not assessed">Not assessed yet</NativeSelectOption></NativeSelect><FieldError id="athlete-level-error" message={errors.level} /></div></div>
    <div className="field"><label htmlFor="athlete-competition">Competition experience</label><Textarea id="athlete-competition" name="competition" placeholder="Events entered, results, or tell us if this would be your first competition" aria-invalid={Boolean(errors.competition)} aria-describedby={errors.competition ? 'athlete-competition-error' : undefined} /><FieldError id="athlete-competition-error" message={errors.competition} /></div>
    <div className="field"><label htmlFor="athlete-motivation">Why do you want to represent ICC?</label><Textarea id="athlete-motivation" name="motivation" placeholder="Tell us what you would bring to the athlete culture" aria-invalid={Boolean(errors.motivation)} aria-describedby={errors.motivation ? 'athlete-motivation-error' : undefined} /><FieldError id="athlete-motivation-error" message={errors.motivation} /></div>
    <div className="field"><label htmlFor="athlete-goal">Your next competitive goal</label><Textarea id="athlete-goal" name="goal" placeholder="What are you working towards over the next 6–12 months?" aria-invalid={Boolean(errors.goal)} aria-describedby={errors.goal ? 'athlete-goal-error' : undefined} /><FieldError id="athlete-goal-error" message={errors.goal} /></div>
    <div className="field"><label htmlFor="athlete-instagram">Instagram or athlete profile <span>(optional)</span></label><Input id="athlete-instagram" name="instagram" placeholder="@handle or profile link" /></div>
    <Button className="form-button" type="submit"><MessageCircle aria-hidden="true" /> Apply on WhatsApp <ArrowUpRight aria-hidden="true" /></Button>
    <p className="form-note">Applications are reviewed by ICC. Selection and competition support depend on readiness, conduct, event eligibility, and approval.</p>{sent && <output className="form-success" aria-live="polite">Your athlete application is ready in WhatsApp.</output>}
  </form>;
}

export function SupportForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function submit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = ['name', 'supportType', 'focus', 'range', 'message'] as const;
    const values = Object.fromEntries(fields.map(field => [field, valueOf(form, field)]));
    const next: Errors = {};
    if (!values.name) next.name = 'Please tell us your name or organisation.';
    if (!values.supportType) next.supportType = 'Choose how you would like to help.';
    if (!values.focus) next.focus = 'Choose what you would most like to support.';
    if (!values.message) next.message = 'Add a short note for the ICC team.';
    setErrors(next); setSent(false);
    if (Object.keys(next).length) return;
    const message = [
      `Hi ${siteConfig.name}, I’d like to support the growth of calisthenics in India.`, '',
      `Name / organisation: ${values.name}`, `Support type: ${values.supportType}`, `Preferred focus: ${values.focus}`,
      ...(values.range ? [`Indicative contribution: ${values.range}`] : []), `Message: ${values.message}`,
    ].join('\n');
    window.open(`https://wa.me/${siteConfig.onlineWhatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return <form className="trial-form community-form" onSubmit={submit} noValidate>
    <div className="field"><label htmlFor="support-name">Your name or organisation</label><Input id="support-name" name="name" autoComplete="name" placeholder="Enter a name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'support-name-error' : undefined} /><FieldError id="support-name-error" message={errors.name} /></div>
    <div className="field-grid"><div className="field"><label htmlFor="support-type">How would you like to help?</label><NativeSelect className="form-select" id="support-type" name="supportType" defaultValue="" aria-invalid={Boolean(errors.supportType)} aria-describedby={errors.supportType ? 'support-type-error' : undefined}><NativeSelectOption value="" disabled>Choose an option</NativeSelectOption>{['Make a contribution','Sponsor an athlete','Sponsor a workshop','Partner with ICC','Offer products or services'].map(item => <NativeSelectOption value={item} key={item}>{item}</NativeSelectOption>)}</NativeSelect><FieldError id="support-type-error" message={errors.supportType} /></div>
    <div className="field"><label htmlFor="support-focus">What would you like to support?</label><NativeSelect className="form-select" id="support-focus" name="focus" defaultValue="" aria-invalid={Boolean(errors.focus)} aria-describedby={errors.focus ? 'support-focus-error' : undefined}><NativeSelectOption value="" disabled>Choose a focus</NativeSelectOption><NativeSelectOption value="Athlete competition costs">Athlete competition costs</NativeSelectOption><NativeSelectOption value="Free community workshops">Free community workshops</NativeSelectOption><NativeSelectOption value="Competitions and events">Competitions and events</NativeSelectOption><NativeSelectOption value="Use where most needed">Use where most needed</NativeSelectOption></NativeSelect><FieldError id="support-focus-error" message={errors.focus} /></div></div>
    <div className="field"><label htmlFor="support-range">Indicative contribution <span>(optional)</span></label><NativeSelect className="form-select" id="support-range" name="range" defaultValue=""><NativeSelectOption value="">Prefer to discuss</NativeSelectOption>{['₹1,000–₹4,999','₹5,000–₹9,999','₹10,000–₹24,999','₹25,000+','Institutional sponsorship'].map(item => <NativeSelectOption value={item} key={item}>{item}</NativeSelectOption>)}</NativeSelect></div>
    <div className="field"><label htmlFor="support-message">Tell us how you would like to help</label><Textarea id="support-message" name="message" placeholder="Share any preference, partnership idea, or question" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'support-message-error' : undefined} /><FieldError id="support-message-error" message={errors.message} /></div>
    <Button className="form-button" type="submit"><MessageCircle aria-hidden="true" /> Discuss support on WhatsApp <ArrowUpRight aria-hidden="true" /></Button>
    <p className="form-note">This website does not process contributions. Verify the payment recipient directly with ICC before transferring money.</p>{sent && <output className="form-success" aria-live="polite">Your support message is ready in WhatsApp.</output>}
  </form>;
}
