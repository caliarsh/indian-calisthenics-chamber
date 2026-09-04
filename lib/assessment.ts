import {
  assessmentConfig,
  programs,
  type FlexibilityRating,
  type FormQuality,
  type Level,
  type MobilityRating,
  type StrengthTestOption,
} from '@/lib/site-config';

export interface AssessmentValues {
  pullExercise: string;
  pullReps: number;
  pullForm: FormQuality;
  pushExercise: string;
  pushReps: number;
  pushForm: FormQuality;
  circuitASeconds: number;
  circuitBSeconds: number;
  mobility: readonly MobilityRating[];
  flexibility: readonly FlexibilityRating[];
}

export type AssessmentBand = 'Needs work' | 'Average' | 'Good';

export interface AssessmentResult {
  level: Level;
  scores: {
    pull: number;
    push: number;
    circuitA: number;
    circuitB: number;
    mobility: number;
    flexibility: number;
  };
  endurance: {
    circuitA: AssessmentBand;
    circuitB: AssessmentBand;
  };
}

export function parseWholeNumber(raw: string, max: number) {
  const value = Number(raw);
  if (raw.trim() === '' || !Number.isInteger(value) || value < 0 || value > max) return null;
  return value;
}

export function toTotalSeconds(minutesRaw: string, secondsRaw: string) {
  const minutes = parseWholeNumber(minutesRaw, 19);
  const seconds = parseWholeNumber(secondsRaw, 59);
  if (minutes === null || seconds === null) return null;
  const total = (minutes * 60) + seconds;
  return total > 0 ? total : null;
}

export function scoreStrength(option: StrengthTestOption, repetitions: number, form: FormQuality) {
  let score = repetitions >= option.tier3Min ? 3 : repetitions >= option.tier2Min ? 2 : 1;
  if (form === 'Poor') score = 1;
  if (form === 'Average') score = Math.min(score, 2);
  return score;
}

export function classifyEndurance(seconds: number): AssessmentBand {
  if (seconds < assessmentConfig.endurance.benchmarkSeconds) return 'Good';
  if (seconds === assessmentConfig.endurance.benchmarkSeconds) return 'Average';
  return 'Needs work';
}

export function scoreEndurance(seconds: number) {
  const band = classifyEndurance(seconds);
  return band === 'Good' ? 3 : band === 'Average' ? 2 : 1;
}

function averageRating(ratings: readonly string[]) {
  const total = ratings.reduce((sum, rating) => sum + (rating === 'Good' ? 3 : rating === 'Average' ? 2 : 1), 0);
  return Math.round(total / ratings.length);
}

export function calculateAssessment(values: AssessmentValues): AssessmentResult {
  const pullOption = assessmentConfig.strength.pull.find((option) => option.id === values.pullExercise);
  const pushOption = assessmentConfig.strength.push.find((option) => option.id === values.pushExercise);
  if (!pullOption || !pushOption) throw new Error('Unknown strength test selection.');

  const scores = {
    pull: scoreStrength(pullOption, values.pullReps, values.pullForm),
    push: scoreStrength(pushOption, values.pushReps, values.pushForm),
    circuitA: scoreEndurance(values.circuitASeconds),
    circuitB: scoreEndurance(values.circuitBSeconds),
    mobility: averageRating(values.mobility),
    flexibility: averageRating(values.flexibility),
  };
  const scoreValues = Object.values(scores);
  const total = scoreValues.reduce((sum, score) => sum + score, 0);
  const level: Level = total >= 16 && scoreValues.every((score) => score >= 2)
    ? 'L3'
    : total >= 11
      ? 'L2'
      : 'L1';

  return {
    level,
    scores,
    endurance: {
      circuitA: classifyEndurance(values.circuitASeconds),
      circuitB: classifyEndurance(values.circuitBSeconds),
    },
  };
}

export function getRecommendedPrograms(level: Level) {
  return programs.filter((program) => program.levels.includes(level));
}
