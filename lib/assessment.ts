import { assessmentMetrics, programs, type Level } from '@/lib/site-config';

export type AssessmentValues = Record<(typeof assessmentMetrics)[number]['id'], number>;

export function scoreMetric(metricId: keyof AssessmentValues, value: number) {
  const metric = assessmentMetrics.find((item) => item.id === metricId);
  if (!metric) throw new Error(`Unknown assessment metric: ${metricId}`);
  if (value >= metric.tier3Min) return 3;
  if (value >= metric.tier2Min) return 2;
  return 1;
}

export function parseAssessmentValue(metricId: keyof AssessmentValues, raw: string) {
  const metric = assessmentMetrics.find((item) => item.id === metricId);
  if (!metric) throw new Error(`Unknown assessment metric: ${metricId}`);
  const value = Number(raw);
  if (raw.trim() === '' || !Number.isInteger(value) || value < 0 || value > metric.max) return null;
  return value;
}

export function calculateLevel(values: AssessmentValues): Level {
  const scores = assessmentMetrics.map((metric) => scoreMetric(metric.id, values[metric.id]));
  const total = scores.reduce((sum, score) => sum + score, 0);
  if (total >= 13 && scores.every((score) => score >= 2)) return 'L3';
  if (total >= 9) return 'L2';
  return 'L1';
}

export function getRecommendedPrograms(level: Level) {
  return programs.filter((program) => program.levels.includes(level));
}
