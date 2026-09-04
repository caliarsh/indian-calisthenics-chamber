import assert from 'node:assert/strict';
import { assessmentConfig } from '../lib/site-config';
import {
  calculateAssessment,
  classifyEndurance,
  getRecommendedPrograms,
  parseWholeNumber,
  scoreStrength,
  toTotalSeconds,
  type AssessmentValues,
} from '../lib/assessment';

const pullUps = assessmentConfig.strength.pull[0];
assert.equal(scoreStrength(pullUps, 1, 'Good'), 1);
assert.equal(scoreStrength(pullUps, 2, 'Good'), 2);
assert.equal(scoreStrength(pullUps, 8, 'Excellent'), 3);
assert.equal(scoreStrength(pullUps, 8, 'Average'), 2);
assert.equal(scoreStrength(pullUps, 8, 'Poor'), 1);

assert.equal(parseWholeNumber('-1', 200), null);
assert.equal(parseWholeNumber('4.5', 200), null);
assert.equal(parseWholeNumber('201', 200), null);
assert.equal(toTotalSeconds('2', '59'), 179);
assert.equal(toTotalSeconds('3', '00'), 180);
assert.equal(toTotalSeconds('3', '01'), 181);
assert.equal(classifyEndurance(179), 'Good');
assert.equal(classifyEndurance(180), 'Average');
assert.equal(classifyEndurance(181), 'Needs work');

const base: AssessmentValues = {
  pullExercise: 'pull-ups',
  pullReps: 8,
  pullForm: 'Good',
  pushExercise: 'push-ups',
  pushReps: 25,
  pushForm: 'Good',
  circuitASeconds: 170,
  circuitBSeconds: 170,
  mobility: ['Good', 'Good', 'Good', 'Good', 'Good'],
  flexibility: ['Good', 'Good', 'Good'],
};
assert.equal(calculateAssessment(base).level, 'L3');
assert.equal(calculateAssessment({ ...base, pullForm: 'Poor' }).level, 'L2');
assert.equal(calculateAssessment({ ...base, pullReps: 0, pushReps: 0, circuitASeconds: 240, circuitBSeconds: 240, mobility: ['Restricted', 'Restricted', 'Restricted', 'Restricted', 'Restricted'], flexibility: ['Poor', 'Poor', 'Poor'] }).level, 'L1');

assert.deepEqual(getRecommendedPrograms('L1').map((program) => program.id), ['online-pt', 'online-group', 'offline-pt', 'offline-group']);
assert.deepEqual(getRecommendedPrograms('L2').map((program) => program.id), ['online-pt', 'offline-pt', 'offline-group']);
assert.deepEqual(getRecommendedPrograms('L3').map((program) => program.id), ['online-pt', 'offline-pt', 'offline-group', 'athlete-batch']);

console.log('Assessment scoring checks passed.');
