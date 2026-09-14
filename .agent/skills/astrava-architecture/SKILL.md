---
name: astrava-architecture
description: >-
  Enforces the architectural structure, folder layout, strict constants-class pattern,
  design tokens, and TypeScript coding conventions for the Astrava Student Utility Hub.
  Use this skill whenever creating new tools, refactoring domains, adding components,
  or reviewing code for architectural compliance.
---

# Astrava Architecture & Coding Standards

This skill defines the mandatory architectural rules, folder structure, domain patterns, and coding conventions for the **Astrava Student Utility Hub**. Every component, service, constant, and page must strictly comply with this specification.

---

## 1. Golden Directives

1. **Zero Hardcoded Literals**: Never hardcode a magic number, UI label, formula coefficient, error message, or color hex directly inside a component or function body. Every literal belongs in a constants class.
2. **One Domain = One Folder**: Exactly three files per domain:
   - `<domain>.constants.ts`
   - `<domain>.service.ts`
   - `<domain>.types.ts`
3. **Pure Logic Isolation**: Calculation logic is strictly isolated in static methods of pure service classes. **Zero React hooks, JSX, or DOM dependencies inside `*.service.ts`**.
4. **Strict TypeScript**:
   - `noImplicitAny: true`
   - Explicit return types on **every** exported function and method
   - Zero `any` or loose `unknown` casts without type guards
   - Named exports only (never use `export default` for domain services, constants, or types)
5. **Design Token Conformance**: UI elements must strictly consume tokens from `@/shared/design-tokens` — no ad-hoc Tailwind arbitrary values or unapproved hex codes.
6. **No Backend / Server Storage**: All calculations run 100% client-side. User input must never be transmitted to any backend.

---

## 2. Directory Structure

All new features and tools must adhere to this exact directory hierarchy:

```
src/
├── domains/
│   ├── attendance/
│   │   ├── attendance.constants.ts
│   │   ├── attendance.service.ts
│   │   ├── attendance.types.ts
│   │   └── attendance.service.test.ts
│   ├── cgpa/
│   ├── gpa/
│   ├── percentage/
│   ├── age/
│   ├── date/
│   ├── unit-conversion/
│   ├── pomodoro/
│   ├── word-counter/
│   ├── typing-test/
│   └── exam-countdown/
├── shared/
│   ├── design-tokens.ts
│   ├── site.constants.ts
│   └── site.types.ts
├── components/
│   ├── ui/                    # Reusable atom/molecule primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── result-panel.tsx
│   │   └── breadcrumbs.tsx
│   ├── tools/                 # Tool-specific view components
│   │   ├── attendance/
│   │   │   ├── attendance-calculator-form.tsx
│   │   │   └── attendance-explanation.tsx
│   │   └── ...
│   └── layout/                # Global layout wrappers
│       ├── header.tsx
│       ├── footer.tsx
│       └── ad-container.tsx
└── app/
    ├── layout.tsx
    ├── page.tsx
    ├── tools/
    │   ├── page.tsx           # Directory of all tools
    │   └── [tool-slug]/
    │       └── page.tsx       # Dynamic or static tool page route
    ├── (legal)/
    │   ├── about/page.tsx
    │   ├── contact/page.tsx
    │   ├── privacy/page.tsx
    │   └── terms/page.tsx
    └── sitemap.ts
```

---

## 3. The Constants-Class & Service-Class Pattern

Every domain must follow this strict 3-file pattern without variation.

### 3.1 `<domain>.types.ts`
Define all data contracts, inputs, outputs, error types, and enum types.

```ts
// src/domains/attendance/attendance.types.ts

export interface AttendanceInput {
  attendedClasses: number;
  totalClasses: number;
  targetPercentage: number;
}

export interface AttendanceResult {
  currentPercentage: number;
  status: 'above_target' | 'on_target' | 'below_target';
  maxMissableClasses: number;
  classesNeededToTarget: number;
  targetRequires100Percent: boolean;
  message: string;
}

export interface AttendanceValidationError {
  field: keyof AttendanceInput | 'general';
  message: string;
}
```

### 3.2 `<domain>.constants.ts`
One exported class containing only `static readonly` members. **No functions or computational logic**.

```ts
// src/domains/attendance/attendance.constants.ts

export class AttendanceConstants {
  static readonly DEFAULT_TARGET_PERCENT = 75;
  static readonly TARGET_PRESETS = [75, 80, 85] as const;
  static readonly MIN_TARGET_PERCENT = 1;
  static readonly MAX_TARGET_PERCENT = 100;
  static readonly DECIMAL_PRECISION = 2;
  static readonly MIN_CLASSES = 0;

  static readonly ERROR_TOTAL_ZERO = 'Total classes must be greater than 0.';
  static readonly ERROR_ATTENDED_EXCEEDS_TOTAL = 'Attended classes cannot exceed total classes.';
  static readonly ERROR_NEGATIVE_VALUES = 'Class numbers cannot be negative.';
  static readonly ERROR_TARGET_RANGE = 'Target percentage must be between 1 and 100.';
  
  static readonly MSG_100_PERCENT = '100% attendance requires attending every remaining class without missing any.';
  static readonly MSG_ON_TRACK = 'You are currently meeting your target attendance requirement.';
  static readonly MSG_DEFICIT = 'You need to attend more classes to reach your target.';
}
```

### 3.3 `<domain>.service.ts`
One exported class with `static` pure methods. **Named exports only**.

```ts
// src/domains/attendance/attendance.service.ts
import { AttendanceConstants as C } from './attendance.constants';
import type { AttendanceInput, AttendanceResult } from './attendance.types';

export class AttendanceCalculator {
  /**
   * Calculates the current attendance percentage.
   * @throws Error if validation fails.
   */
  static currentPercent(attended: number, total: number): number {
    if (total <= C.MIN_CLASSES) {
      throw new Error(C.ERROR_TOTAL_ZERO);
    }
    if (attended < C.MIN_CLASSES || total < C.MIN_CLASSES) {
      throw new Error(C.ERROR_NEGATIVE_VALUES);
    }
    if (attended > total) {
      throw new Error(C.ERROR_ATTENDED_EXCEEDS_TOTAL);
    }
    return Number(((attended / total) * 100).toFixed(C.DECIMAL_PRECISION));
  }

  /**
   * Calculates maximum number of consecutive classes a student can miss while maintaining target %.
   */
  static maxMissable(attended: number, total: number, targetPercent: number): number {
    if (targetPercent <= 0 || targetPercent > C.MAX_TARGET_PERCENT) {
      throw new Error(C.ERROR_TARGET_RANGE);
    }
    // largest x such that attended / (total + x) >= targetPercent / 100
    const x = Math.floor((attended * 100) / targetPercent - total);
    return Math.max(x, 0);
  }

  /**
   * Calculates minimum number of consecutive classes needed to reach target %.
   */
  static classesNeeded(attended: number, total: number, targetPercent: number): number {
    if (targetPercent >= C.MAX_TARGET_PERCENT) {
      return 0; // Handled specially in calculateFull
    }
    const t = targetPercent / 100;
    // smallest y such that (attended + y) / (total + y) >= t
    const y = Math.ceil((t * total - attended) / (1 - t));
    return Math.max(y, 0);
  }

  /**
   * Evaluates complete attendance standing.
   */
  static calculate(input: AttendanceInput): AttendanceResult {
    const current = this.currentPercent(input.attendedClasses, input.totalClasses);
    const isHundredTarget = input.targetPercentage === C.MAX_TARGET_PERCENT;

    const maxMiss = this.maxMissable(input.attendedClasses, input.totalClasses, input.targetPercentage);
    const needed = isHundredTarget ? 0 : this.classesNeeded(input.attendedClasses, input.totalClasses, input.targetPercentage);

    let status: AttendanceResult['status'] = 'on_target';
    let message = C.MSG_ON_TRACK;

    if (current > input.targetPercentage) {
      status = 'above_target';
    } else if (current < input.targetPercentage) {
      status = 'below_target';
      message = isHundredTarget ? C.MSG_100_PERCENT : C.MSG_DEFICIT;
    }

    return {
      currentPercentage: current,
      status,
      maxMissableClasses: maxMiss,
      classesNeededToTarget: needed,
      targetRequires100Percent: isHundredTarget,
      message,
    };
  }
}
```

---

## 4. Design Tokens & Visual Hierarchy

All styling must reference design tokens from `src/shared/design-tokens.ts`:

```ts
// src/shared/design-tokens.ts
export class DesignTokens {
  static readonly COLOR_PRIMARY = '#2D5BFF';        // Primary CTAs ONLY
  static readonly COLOR_PRIMARY_HOVER = '#1E44CC';
  static readonly COLOR_SURFACE = '#FFFFFF';
  static readonly COLOR_BG = '#F7F8FA';
  static readonly COLOR_TEXT = '#111827';
  static readonly COLOR_TEXT_MUTED = '#6B7280';
  static readonly COLOR_ERROR = '#DC2626';
  static readonly COLOR_SUCCESS = '#16A34A';
  static readonly COLOR_WARNING = '#D97706';
  static readonly COLOR_BORDER = '#E5E7EB';

  static readonly RADIUS_MD = '10px';
  static readonly RADIUS_LG = '16px';
  static readonly SHADOW_CTA = '0 4px 14px rgba(45, 91, 255, 0.35)';
  static readonly SHADOW_CARD = '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)';

  static readonly SPACING_UNIT = 4; // px — all spacing must be a multiple of this
  static readonly FONT_FAMILY = "'Inter', sans-serif";
}
```

### 4.1 Primary CTA Specification
- **Target**: The "Calculate", "Convert", or "Start" action button.
- **Constraints**:
  - Minimum height: `48px` (h-12)
  - Font weight: `700` (font-bold)
  - Background: `DesignTokens.COLOR_PRIMARY` (`bg-[#2D5BFF]`)
  - Box Shadow: `DesignTokens.SHADOW_CTA`
  - Hover / Focus: scale to `1.02`, darken to `COLOR_PRIMARY_HOVER` (`#1E44CC`)
  - Width: Full width (`w-full`) on mobile (`< 640px`)
  - Only **ONE** primary CTA per tool screen.
- **Secondary Actions**: ("Reset", "Clear", "Copy", "Share") must use neutral outline/ghost styles with zero primary shadow to prevent competing with the primary CTA.

---

## 5. Naming & Syntax Conventions

| Item | Convention | Example |
| :--- | :--- | :--- |
| **Classes & Interfaces** | PascalCase | `AttendanceCalculator`, `AttendanceResult` |
| **Constants Class** | PascalCase + `Constants` | `CgpaConstants`, `UnitConverterConstants` |
| **Methods & Properties** | camelCase | `calculateCgpa()`, `maxMissableClasses` |
| **Constant Members** | UPPER_SNAKE_CASE | `DEFAULT_TARGET_PERCENT`, `DECIMAL_PRECISION` |
| **File Names** | kebab-case | `attendance.service.ts`, `result-panel.tsx` |
| **Route Slugs** | kebab-case | `/tools/attendance-calculator` |
| **Exports** | Named exports only | `export class ...`, `export interface ...` |

---

## 6. Architecture Compliance Checklist

Before committing or approving any code in the workspace, verify:
- [ ] No calculations occur inside `.tsx` components (all logic in `*.service.ts`).
- [ ] No magic numbers or hardcoded strings exist (all in `*.constants.ts`).
- [ ] `*.service.ts` imports no React hooks, DOM APIs, or UI libraries.
- [ ] Explicit return types exist on all exported methods.
- [ ] Unit tests exist for the service class covering happy paths and edge cases.
- [ ] Primary button strictly implements the design token CTA spec.
- [ ] Keyboard accessible: form submittable via `Enter`, tab navigation intact.
- [ ] Mobile responsive: functional and readable down to `360px` viewport width.
