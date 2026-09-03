'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateLevel, getRecommendedPrograms, parseAssessmentValue, type AssessmentValues } from '@/lib/assessment';
import { assessmentMetrics, levelDescriptions, type Level } from '@/lib/site-config';

type InputValues = Record<keyof AssessmentValues, string>;
type InputErrors = Partial<Record<keyof AssessmentValues, string>>;

const initialValues = Object.fromEntries(assessmentMetrics.map((metric) => [metric.id, ''])) as InputValues;

export function AssessmentForm() {
  const [values, setValues] = useState<InputValues>(initialValues);
  const [errors, setErrors] = useState<InputErrors>({});
  const [level, setLevel] = useState<Level | null>(null);

  function updateValue(id: keyof AssessmentValues, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
    setErrors((current) => ({ ...current, [id]: undefined }));
    setLevel(null);
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: InputErrors = {};
    const parsed = {} as AssessmentValues;

    assessmentMetrics.forEach((metric) => {
      const raw = values[metric.id];
      const number = parseAssessmentValue(metric.id, raw);
      if (number === null) {
        nextErrors[metric.id] = `Enter a whole number from 0 to ${metric.max}.`;
      } else {
        parsed[metric.id] = number;
      }
    });

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLevel(calculateLevel(parsed));
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setLevel(null);
  }

  const recommendations = level ? getRecommendedPrograms(level) : [];

  return (
    <div className="assessment-workspace">
      <form className="assessment-form" onSubmit={handleSubmit} noValidate>
        <div className="assessment-form-heading">
          <span>Enter your results</span>
          <small>All fields are required</small>
        </div>
        <div className="metric-list">
          {assessmentMetrics.map((metric, index) => (
            <div className="metric-row" key={metric.id}>
              <span className="metric-number">0{index + 1}</span>
              <div className="metric-copy">
                <label htmlFor={metric.id}>{metric.label}</label>
                <p>{metric.instruction}</p>
              </div>
              <div className="metric-input-wrap">
                <Input
                  id={metric.id}
                  inputMode="numeric"
                  max={metric.max}
                  min="0"
                  name={metric.id}
                  onChange={(event) => updateValue(metric.id, event.target.value)}
                  placeholder="0"
                  step="1"
                  type="number"
                  value={values[metric.id]}
                  aria-invalid={Boolean(errors[metric.id])}
                  aria-describedby={errors[metric.id] ? `${metric.id}-error` : undefined}
                />
                <span>{metric.unit}</span>
                {errors[metric.id] && <p id={`${metric.id}-error`} className="metric-error">{errors[metric.id]}</p>}
              </div>
            </div>
          ))}
        </div>
        <Button className="assessment-submit" type="submit">Calculate my level <ArrowRight aria-hidden="true" /></Button>
      </form>

      <aside className={`assessment-result ${level ? 'has-result' : ''}`} aria-live="polite">
        {level ? (
          <>
            <CheckCircle2 className="result-icon" aria-hidden="true" />
            <p className="result-kicker">Your indicative level</p>
            <strong>{level}</strong>
            <h2>{levelDescriptions[level].name}</h2>
            <p>{levelDescriptions[level].description}</p>
            <div className="result-programs">
              <span>Available training options</span>
              <ul>{recommendations.map((program) => <li key={program.id}>{program.mode} · {program.name}</li>)}</ul>
            </div>
            <a className="button result-button" href={`/?level=${level}#trial`}>Book a trial at {level} <ArrowRight aria-hidden="true" /></a>
            <button className="reset-button" onClick={reset} type="button"><RotateCcw aria-hidden="true" /> Retake assessment</button>
          </>
        ) : (
          <>
            <span className="result-placeholder">L?</span>
            <h2>Your result will appear here.</h2>
            <p>Complete all five tests and we’ll match your current capacity to L1, L2, or L3.</p>
          </>
        )}
      </aside>
    </div>
  );
}
