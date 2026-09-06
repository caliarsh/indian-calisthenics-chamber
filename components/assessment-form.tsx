'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import {
  calculateAssessment,
  getRecommendedPrograms,
  parseWholeNumber,
  toTotalSeconds,
  type AssessmentResult,
  type AssessmentValues,
} from '@/lib/assessment';
import {
  assessmentConfig,
  levelDescriptions,
  type FlexibilityRating,
  type FormQuality,
  type MobilityRating,
} from '@/lib/site-config';

type FormErrors = Record<string, string>;

const formQualities: readonly FormQuality[] = ['Poor', 'Average', 'Good', 'Excellent'];
const mobilityRatings: readonly MobilityRating[] = ['Restricted', 'Average', 'Good'];
const flexibilityRatings: readonly FlexibilityRating[] = ['Poor', 'Average', 'Good'];

function read(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function scoreLabel(score: number) {
  return score === 3 ? 'Good' : score === 2 ? 'Average' : 'Needs work';
}

function RatingField({ id, label, options, error }: { id: string; label: string; options: readonly string[]; error?: string }) {
  return (
    <div className="rating-field">
      <label htmlFor={id}>{label}</label>
      <NativeSelect className="assessment-select" id={id} name={id} defaultValue="" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}>
        <NativeSelectOption value="" disabled>Choose rating</NativeSelectOption>
        {options.map((option) => <NativeSelectOption value={option} key={option}>{option}</NativeSelectOption>)}
      </NativeSelect>
      {error && <p className="metric-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

export function AssessmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [returnPath, setReturnPath] = useState<'online' | 'offline' | ''>('');

  useEffect(() => {
    const path = new URLSearchParams(window.location.search).get('path');
    queueMicrotask(() => setReturnPath(path === 'online' || path === 'offline' ? path : ''));
  }, []);

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: FormErrors = {};

    const pullExercise = read(form, 'pullExercise');
    const pullReps = parseWholeNumber(read(form, 'pullReps'), 200);
    const pullForm = read(form, 'pullForm') as FormQuality;
    const pushExercise = read(form, 'pushExercise');
    const pushReps = parseWholeNumber(read(form, 'pushReps'), 200);
    const pushForm = read(form, 'pushForm') as FormQuality;
    const circuitASeconds = toTotalSeconds(read(form, 'circuitAMinutes'), read(form, 'circuitASeconds'));
    const circuitBSeconds = toTotalSeconds(read(form, 'circuitBMinutes'), read(form, 'circuitBSeconds'));

    if (!assessmentConfig.strength.pull.some((option) => option.id === pullExercise)) nextErrors.pullExercise = 'Choose the pull test you completed.';
    if (pullReps === null) nextErrors.pullReps = 'Enter a whole number from 0 to 200.';
    if (!formQualities.includes(pullForm)) nextErrors.pullForm = 'Choose the quality of your repetitions.';
    if (!assessmentConfig.strength.push.some((option) => option.id === pushExercise)) nextErrors.pushExercise = 'Choose the push test you completed.';
    if (pushReps === null) nextErrors.pushReps = 'Enter a whole number from 0 to 200.';
    if (!formQualities.includes(pushForm)) nextErrors.pushForm = 'Choose the quality of your repetitions.';
    if (circuitASeconds === null) nextErrors.circuitA = 'Enter a valid time between 0:01 and 19:59.';
    if (circuitBSeconds === null) nextErrors.circuitB = 'Enter a valid time between 0:01 and 19:59.';

    const mobility = assessmentConfig.mobility.map((item) => read(form, item.id) as MobilityRating);
    const flexibility = assessmentConfig.flexibility.map((item) => read(form, item.id) as FlexibilityRating);
    assessmentConfig.mobility.forEach((item, index) => {
      if (!mobilityRatings.includes(mobility[index])) nextErrors[item.id] = 'Choose a mobility rating.';
    });
    assessmentConfig.flexibility.forEach((item, index) => {
      if (!flexibilityRatings.includes(flexibility[index])) nextErrors[item.id] = 'Choose a flexibility rating.';
    });

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || pullReps === null || pushReps === null || circuitASeconds === null || circuitBSeconds === null) return;

    const values: AssessmentValues = {
      pullExercise,
      pullReps,
      pullForm,
      pushExercise,
      pushReps,
      pushForm,
      circuitASeconds,
      circuitBSeconds,
      mobility,
      flexibility,
    };
    setResult(calculateAssessment(values));
  }

  function reset() {
    formRef.current?.reset();
    setErrors({});
    setResult(null);
  }

  const recommendations = result ? getRecommendedPrograms(result.level) : [];

  return (
    <div className="assessment-workspace">
      <form className="assessment-form comprehensive-assessment" ref={formRef} onSubmit={handleSubmit} onChange={() => setResult(null)} noValidate>
        <div className="assessment-form-heading">
          <span>Record your assessment</span>
          <small>All fields are required</small>
        </div>

        <section className="assessment-block" aria-labelledby="strength-heading">
          <div className="assessment-block-heading"><span>01</span><div><h2 id="strength-heading">Strength</h2><p>Select the movement used, enter clean repetitions, and rate the form quality.</p></div></div>
          <div className="strength-test-grid">
            {(['pull', 'push'] as const).map((kind) => (
              <fieldset className="test-card" key={kind}>
                <legend>{kind === 'pull' ? 'Pull strength' : 'Push strength'}</legend>
                <label htmlFor={`${kind}Exercise`}>Test used</label>
                <NativeSelect className="assessment-select" id={`${kind}Exercise`} name={`${kind}Exercise`} defaultValue="" aria-invalid={Boolean(errors[`${kind}Exercise`])}>
                  <NativeSelectOption value="" disabled>Choose movement</NativeSelectOption>
                  {assessmentConfig.strength[kind].map((option) => <NativeSelectOption value={option.id} key={option.id}>{option.label}</NativeSelectOption>)}
                </NativeSelect>
                {errors[`${kind}Exercise`] && <p className="metric-error">{errors[`${kind}Exercise`]}</p>}
                <div className="test-card-row">
                  <div>
                    <label htmlFor={`${kind}Reps`}>Repetitions</label>
                    <Input id={`${kind}Reps`} name={`${kind}Reps`} type="number" min="0" max="200" step="1" inputMode="numeric" placeholder="0" aria-invalid={Boolean(errors[`${kind}Reps`])} />
                    {errors[`${kind}Reps`] && <p className="metric-error">{errors[`${kind}Reps`]}</p>}
                  </div>
                  <div>
                    <label htmlFor={`${kind}Form`}>Form quality</label>
                    <NativeSelect className="assessment-select" id={`${kind}Form`} name={`${kind}Form`} defaultValue="" aria-invalid={Boolean(errors[`${kind}Form`])}>
                      <NativeSelectOption value="" disabled>Choose quality</NativeSelectOption>
                      {formQualities.map((quality) => <NativeSelectOption value={quality} key={quality}>{quality}</NativeSelectOption>)}
                    </NativeSelect>
                    {errors[`${kind}Form`] && <p className="metric-error">{errors[`${kind}Form`]}</p>}
                  </div>
                </div>
              </fieldset>
            ))}
          </div>
        </section>

        <section className="assessment-block" aria-labelledby="endurance-heading">
          <div className="assessment-block-heading"><span>02</span><div><h2 id="endurance-heading">Endurance</h2><p>Complete each circuit once with controlled form and record the total time.</p></div></div>
          <div className="circuit-grid">
            {assessmentConfig.endurance.circuits.map((circuit) => (
              <fieldset className="circuit-card" key={circuit.id}>
                <legend>{circuit.label}</legend>
                <ul>
                  {circuit.movements.map((movement) => <li key={movement}><span>{movement}</span><strong>{assessmentConfig.endurance.repetitions} reps</strong></li>)}
                  <li><span>{circuit.hold}</span><strong>{assessmentConfig.endurance.holdSeconds} sec</strong></li>
                </ul>
                <div className="circuit-time-label"><Clock3 aria-hidden="true" /><span>Total completion time</span></div>
                <div className="time-inputs">
                  <label htmlFor={`${circuit.id}Minutes`}><span>Minutes</span><Input id={`${circuit.id}Minutes`} name={`${circuit.id}Minutes`} type="number" min="0" max="19" step="1" inputMode="numeric" placeholder="0" aria-invalid={Boolean(errors[circuit.id])} /></label>
                  <b aria-hidden="true">:</b>
                  <label htmlFor={`${circuit.id}Seconds`}><span>Seconds</span><Input id={`${circuit.id}Seconds`} name={`${circuit.id}Seconds`} type="number" min="0" max="59" step="1" inputMode="numeric" placeholder="00" aria-invalid={Boolean(errors[circuit.id])} /></label>
                </div>
                {errors[circuit.id] && <p className="metric-error">{errors[circuit.id]}</p>}
              </fieldset>
            ))}
          </div>
          <p className="endurance-key"><strong>Under 3:00</strong> Good <span /><strong>3:00</strong> Average <span /><strong>Over 3:00</strong> Needs work</p>
        </section>

        <section className="assessment-block" aria-labelledby="mobility-heading">
          <div className="assessment-block-heading"><span>03</span><div><h2 id="mobility-heading">Mobility</h2><p>Move only through a comfortable, pain-free range.</p></div></div>
          <div className="rating-grid">
            {assessmentConfig.mobility.map((item) => <RatingField key={item.id} {...item} options={mobilityRatings} error={errors[item.id]} />)}
          </div>
        </section>

        <section className="assessment-block" aria-labelledby="flexibility-heading">
          <div className="assessment-block-heading"><span>04</span><div><h2 id="flexibility-heading">Flexibility</h2><p>Use the option listed that is safe and familiar to you.</p></div></div>
          <div className="rating-grid">
            {assessmentConfig.flexibility.map((item) => <RatingField key={item.id} {...item} options={flexibilityRatings} error={errors[item.id]} />)}
          </div>
        </section>

        <Button className="assessment-submit" type="submit">Calculate my level <ArrowRight aria-hidden="true" /></Button>
      </form>

      <aside className={`assessment-result ${result ? 'has-result' : ''}`} aria-live="polite">
        {result ? (
          <>
            <CheckCircle2 className="result-icon" aria-hidden="true" />
            <p className="result-kicker">Your indicative level</p>
            <strong>{result.level}</strong>
            <h2>{levelDescriptions[result.level].name}</h2>
            <p>{levelDescriptions[result.level].description}</p>
            <dl className="assessment-breakdown">
              <div><dt>Pull strength</dt><dd>{scoreLabel(result.scores.pull)}</dd></div>
              <div><dt>Push strength</dt><dd>{scoreLabel(result.scores.push)}</dd></div>
              <div><dt>Circuit 1</dt><dd>{result.endurance.circuitA}</dd></div>
              <div><dt>Circuit 2</dt><dd>{result.endurance.circuitB}</dd></div>
              <div><dt>Mobility</dt><dd>{scoreLabel(result.scores.mobility)}</dd></div>
              <div><dt>Flexibility</dt><dd>{scoreLabel(result.scores.flexibility)}</dd></div>
            </dl>
            <div className="result-programs">
              <span>Available training options</span>
              <ul>{recommendations.map((program) => <li key={program.id}>{program.mode} · {program.name}</li>)}</ul>
            </div>
            <a className="button result-button" href={`/book-trial?${returnPath ? `mode=${returnPath === 'online' ? 'Online' : 'Offline'}&` : ''}level=${result.level}`}>
              {returnPath === 'online' ? `Book an online consultation at ${result.level}` : `Book a trial at ${result.level}`} <ArrowRight aria-hidden="true" />
            </a>
            <button className="reset-button" onClick={reset} type="button"><RotateCcw aria-hidden="true" /> Retake assessment</button>
          </>
        ) : (
          <>
            <span className="result-placeholder">L?</span>
            <h2>Your result will appear here.</h2>
            <p>Complete strength, endurance, mobility, and flexibility checks to receive an indicative L1, L2, or L3 placement.</p>
          </>
        )}
      </aside>
    </div>
  );
}
