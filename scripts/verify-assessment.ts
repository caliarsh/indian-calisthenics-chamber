import assert from 'node:assert/strict';
import { calculateLevel, getRecommendedPrograms, parseAssessmentValue, scoreMetric } from '../lib/assessment';

assert.equal(scoreMetric('pushUps', 9), 1);
assert.equal(scoreMetric('pushUps', 10), 2);
assert.equal(scoreMetric('pushUps', 25), 3);
assert.equal(scoreMetric('pullUps', 1), 1);
assert.equal(scoreMetric('pullUps', 2), 2);
assert.equal(scoreMetric('pullUps', 8), 3);
assert.equal(parseAssessmentValue('pushUps', '-1'), null);
assert.equal(parseAssessmentValue('pushUps', '4.5'), null);
assert.equal(parseAssessmentValue('pushUps', '201'), null);
assert.equal(parseAssessmentValue('deadHang', '600'), 600);

assert.equal(calculateLevel({ pushUps: 0, pullUps: 0, deadHang: 0, hollowHold: 0, squats: 0 }), 'L1');
assert.equal(calculateLevel({ pushUps: 10, pullUps: 2, deadHang: 20, hollowHold: 15, squats: 20 }), 'L2');
assert.equal(calculateLevel({ pushUps: 25, pullUps: 8, deadHang: 45, hollowHold: 40, squats: 20 }), 'L3');
assert.equal(calculateLevel({ pushUps: 25, pullUps: 0, deadHang: 45, hollowHold: 40, squats: 40 }), 'L2');

assert.deepEqual(getRecommendedPrograms('L1').map((program) => program.id), ['online-pt', 'online-group', 'offline-pt', 'offline-group']);
assert.deepEqual(getRecommendedPrograms('L2').map((program) => program.id), ['online-pt', 'offline-pt', 'offline-group']);
assert.deepEqual(getRecommendedPrograms('L3').map((program) => program.id), ['online-pt', 'offline-pt', 'offline-group', 'athlete-batch']);

console.log('Assessment scoring checks passed.');
