import { AttendanceCalculator } from './attendance.service';
import { AttendanceConstants as C } from './attendance.constants';

/**
 * Unit Test Runner for Attendance Calculator Domain
 */
function runTests(): void {
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: unknown): void {
    if (condition) {
      passed++;
      console.log(`  [PASS] ${testName}`);
    } else {
      failed++;
      console.error(`  [FAIL] ${testName}`, detail ?? '');
    }
  }

  console.log('--- RUNNING ATTENDANCE CALCULATOR TESTS ---');

  // Test 1: Standard Current Percentage
  const p1 = AttendanceCalculator.currentPercent(38, 50);
  assert(p1 === 76.00, 'currentPercent(38, 50) === 76.00');

  const p2 = AttendanceCalculator.currentPercent(30, 50);
  assert(p2 === 60.00, 'currentPercent(30, 50) === 60.00');

  const p3 = AttendanceCalculator.currentPercent(1, 3);
  assert(p3 === 33.33, 'currentPercent(1, 3) === 33.33 (2 decimal precision)');

  // Test 2: Max Missable Classes
  // 40 attended out of 45 total with 75% target
  // floor((40*100)/75 - 45) = floor(53.33 - 45) = 8
  const m1 = AttendanceCalculator.maxMissable(40, 45, 75);
  assert(m1 === 8, 'maxMissable(40, 45, 75) === 8');

  // 30 attended out of 50 total with 75% target (currently in deficit) -> should be 0
  const m2 = AttendanceCalculator.maxMissable(30, 50, 75);
  assert(m2 === 0, 'maxMissable(30, 50, 75) === 0 (clamped to 0 when in deficit)');

  // Test 3: Classes Needed
  // 30 attended out of 50 total with 75% target
  // t = 0.75 -> ceil((0.75*50 - 30)/(1 - 0.75)) = ceil((37.5 - 30)/0.25) = ceil(7.5/0.25) = 30
  const n1 = AttendanceCalculator.classesNeeded(30, 50, 75);
  assert(n1 === 30, 'classesNeeded(30, 50, 75) === 30');

  // 38 attended out of 50 with 75% target (already >= 75%) -> 0 needed
  const n2 = AttendanceCalculator.classesNeeded(38, 50, 75);
  assert(n2 === 0, 'classesNeeded(38, 50, 75) === 0 when above target');

  // Test 4: 100% Target Special Case
  const n100Perfect = AttendanceCalculator.classesNeeded(50, 50, 100);
  assert(n100Perfect === 0, 'classesNeeded(50, 50, 100) === 0 when perfect');

  const n100Deficit = AttendanceCalculator.classesNeeded(49, 50, 100);
  assert(n100Deficit === -1, 'classesNeeded(49, 50, 100) === -1 (impossible recovery)');

  // Test 5: Full Calculation Flow
  const res1 = AttendanceCalculator.calculate({ attended: 38, total: 50, targetPercent: 75 });
  assert(res1.currentPercent === 76.00, 'calculate: currentPercent is 76');
  assert(res1.missed === 12, 'calculate: missed is 12');
  assert(res1.status === 'margin', 'calculate: status is margin (76% is within 3% margin of 75%)');
  assert(res1.maxMissable === 0, 'calculate: maxMissable is 0 for 38/50 @ 75% (38/51=74.5%)');
  assert(res1.classesNeeded === 0, 'calculate: classesNeeded is 0');

  const resSecure = AttendanceCalculator.calculate({ attended: 40, total: 50, targetPercent: 75 });
  assert(resSecure.status === 'on_track', 'calculate: status is on_track for 80% vs 75%');

  // Test 6: 100% Calculation Telemetry
  const res100 = AttendanceCalculator.calculate({ attended: 49, total: 50, targetPercent: 100 });
  assert(res100.is100PercentTarget === true, 'calculate 100%: is100PercentTarget is true');
  assert(res100.note === C.MSG_TARGET_100_DEFICIT, 'calculate 100%: note indicates impossible 100%');

  // Test 7: Validation Guards
  const v1 = AttendanceCalculator.validate({ attended: 55, total: 50, targetPercent: 75 });
  assert(!v1.isValid && v1.error === C.ERR_ATTENDED_EXCEEDS_TOTAL, 'validate rejects attended > total');

  const v2 = AttendanceCalculator.validate({ attended: 10, total: 0, targetPercent: 75 });
  assert(!v2.isValid && v2.error === C.ERR_TOTAL_ZERO_OR_NEGATIVE, 'validate rejects total <= 0');

  const v3 = AttendanceCalculator.validate({ attended: -5, total: 20, targetPercent: 75 });
  assert(!v3.isValid && v3.error === C.ERR_ATTENDED_NEGATIVE, 'validate rejects negative attended');

  const v4 = AttendanceCalculator.validate({ attended: 10, total: 20, targetPercent: 120 });
  assert(!v4.isValid && v4.error === C.ERR_INVALID_TARGET, 'validate rejects target > 100');

  console.log(`\nTEST SUMMARY: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
