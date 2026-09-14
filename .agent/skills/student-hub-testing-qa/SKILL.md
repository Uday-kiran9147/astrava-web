---
name: student-hub-testing-qa
description: >-
  Provides testing methodologies, edge-case test suites, validation harnesses, and QA checklists
  for domain service classes and UI components in the Astrava Student Utility Hub. Use whenever
  writing unit tests, running regression checks, or verifying tool accuracy before release.
---

# Student Hub Testing & QA Guidelines

Every calculation domain and UI component in Astrava must pass strict automated and manual quality gates before being deemed complete.

---

## 1. Domain Service Unit Testing Standards

Because all calculation logic is encapsulated in pure static service classes (`*.service.ts`), every tool can and must be unit-tested without rendering DOM or React trees.

### 1.1 Unit Test Template (`*.service.test.ts`)
```ts
// src/domains/attendance/attendance.service.test.ts
import { describe, it, expect } from 'vitest';
import { AttendanceCalculator } from './attendance.service';
import { AttendanceConstants as C } from './attendance.constants';

describe('AttendanceCalculator', () => {
  describe('currentPercent', () => {
    it('calculates exact percentage rounded to 2 decimal places', () => {
      expect(AttendanceCalculator.currentPercent(38, 50)).toBe(76.0);
      expect(AttendanceCalculator.currentPercent(1, 3)).toBe(33.33);
    });

    it('throws when total classes is zero', () => {
      expect(() => AttendanceCalculator.currentPercent(0, 0)).toThrow(C.ERROR_TOTAL_ZERO);
    });

    it('throws when attended exceeds total', () => {
      expect(() => AttendanceCalculator.currentPercent(11, 10)).toThrow(C.ERROR_ATTENDED_EXCEEDS_TOTAL);
    });

    it('throws on negative input values', () => {
      expect(() => AttendanceCalculator.currentPercent(-5, 10)).toThrow(C.ERROR_NEGATIVE_VALUES);
    });
  });

  describe('maxMissable', () => {
    it('calculates correct missable classes when above target', () => {
      // 40 attended out of 45 total (88.89%), target 75% -> floor(40*100/75 - 45) = floor(53.33 - 45) = 8
      expect(AttendanceCalculator.maxMissable(40, 45, 75)).toBe(8);
    });

    it('returns 0 when already below target', () => {
      // 30 attended out of 50 total (60%), target 75% -> floor(3000/75 - 50) = 40 - 50 = -10 -> clamp to 0
      expect(AttendanceCalculator.maxMissable(30, 50, 75)).toBe(0);
    });
  });

  describe('classesNeeded', () => {
    it('calculates minimum classes needed to reach target percentage', () => {
      // 30 attended out of 50 total (60%), target 75% -> ceil((0.75*50 - 30)/(1 - 0.75)) = ceil(7.5/0.25) = 30
      expect(AttendanceCalculator.classesNeeded(30, 50, 75)).toBe(30);
    });

    it('returns 0 when already at or above target', () => {
      expect(AttendanceCalculator.classesNeeded(40, 50, 75)).toBe(0);
    });
  });
});
```

---

## 2. Mandatory Edge-Case Verification Matrix

Before signing off on any domain, verify all tests in this matrix:

| Tool Domain | Mandatory Test Cases |
| :--- | :--- |
| **Attendance** | `total = 0`, `attended > total`, `attended < 0`, `target = 100%`, `attended = 0, total > 0` |
| **CGPA** | Zero subjects, total credits = 0, negative credit inputs, boundary grade values (0 to 10) |
| **GPA** | Scale switching (4.0 vs 5.0 vs 10.0), credit weighting accuracy, zero credits |
| **Percentage** | Mode B with `Y = 0`, Mode C with `Old = 0`, negative change percentages, fractional decimals |
| **Age** | `DOB > Today`, `DOB = Feb 29` in non-leap year, same-day birth, next birthday transition |
| **Date** | Difference crossing Daylight Savings Time boundary, leap year addition, negative day subtract |
| **Unit Converter** | Temperature at absolute zero ($-273.15^\circ\text{C}$), negative values on length/weight, reciprocal accuracy |
| **Pomodoro** | Background tab throttling (verify end-timestamp delta), zero seconds boundary, pause/resume state |
| **Word Counter** | Empty string (`""`), whitespace-only (`"   \n\t  "`), multiple spaces between words, punctuation only |
| **Typing Test** | `duration = 0`, `correctChars > totalTyped`, gross vs net WPM differentiation |
| **Exam Countdown** | Target timestamp in the past (`remaining <= 0`), year-crossing timers, leap-day exams |

---

## 3. Pre-Release Verification Checklist

Run these commands and manual checks before marking any tool or PR as completed:

```bash
# 1. Strict TypeScript Compilation Check
npx tsc --noEmit

# 2. Linter Verification
npm run lint

# 3. Unit Tests Execution
npm test
```

### Manual UX & Responsive Audit
- [ ] **360px Mobile Viewport**: Open Chrome DevTools, set width to `360px`, verify inputs, cards, and primary buttons fit without horizontal scrollbars.
- [ ] **Keyboard Only Navigation**: Tab through the entire tool, enter values, and press `Enter` to submit. Verify focus rings are clearly visible.
- [ ] **Accessibility Inspection**: Ensure color contrast ratios meet WCAG AA standards (minimum 4.5:1 for normal text).
- [ ] **Copy to Clipboard**: Verify share and result copy buttons copy formatted plain text with appropriate toast feedback.
