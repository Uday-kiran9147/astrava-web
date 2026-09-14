# GEMINI.md — Astrava Student Utility Hub: Agent Build Context

> Feed this to the coding agent as persistent project context. If you're using **Gemini CLI**, save it as `GEMINI.md` at the project root (it's auto-loaded into every turn — `/memory show` lets you confirm it's in context, `/memory refresh` reloads it after edits). On other Gemini surfaces, paste it in as the opening system/context message. Companion doc: `README.md` (the product PRD) — that file defines *what* to build; this one defines *how*, with enough precision that the agent can't improvise the math or the architecture differently from tool to tool.

## 0. Core directives

- Read this whole file before writing any code. Don't start scaffolding from the first prompt alone.
- Never hardcode a number, label, formula constant, or color directly inside a component or function body. Every one of those belongs in a constants class (§2).
- One domain = one folder = one constants file + one logic/service class + one types file. Never mix two tools' logic in one file, and never put calculation logic inside a React component.
- Strict TypeScript everywhere: no `any`, no implicit `any`, explicit return types on every exported function.
- Precision on the math in §4 is the top priority of this build — rank it above visual polish. Before marking any tool "done," check it against that tool's edge cases.
- If this file and `README.md` ever disagree: `README.md` wins on **scope** (which tools exist, what's v1 vs later); this file wins on **implementation** (formulas, structure, constants, naming).

## 1. Stack & structure

- Next.js (App Router) + TypeScript, statically generated where possible — SEO requirement, see `README.md` §8/§11.
- Tailwind, driven entirely by the tokens in §3 — no ad hoc hex codes or magic spacing values in JSX.
- No backend or database for v1. Every calculator runs client-side; nothing the user types gets sent to a server.

```
/domains
  /attendance         attendance.constants.ts · attendance.service.ts · attendance.types.ts
  /cgpa
  /gpa
  /percentage
  /age
  /date
  /unit-conversion
  /pomodoro
  /word-counter
  /typing-test
  /exam-countdown
/shared
  design-tokens.ts
  site.constants.ts
/components
  /ui                 Button, Card, Input, ResultPanel — shared primitives only
  /tools               one folder per tool page, importing from /domains
/app
  /tools/[tool-slug]/page.tsx
```

## 2. The constants-class pattern — use this exact shape for every domain

Two files per domain, always:
- `*.constants.ts` — one exported class, only `static readonly` members. No logic.
- `*.service.ts` — one exported class, only `static` pure functions. No React imports, no side effects — this is what makes each tool trivially unit-testable.

```ts
// domains/attendance/attendance.constants.ts
export class AttendanceConstants {
  static readonly DEFAULT_TARGET_PERCENT = 75;
  static readonly TARGET_PRESETS = [75, 80, 85] as const;
  static readonly DECIMAL_PRECISION = 2;
  static readonly MIN_CLASSES = 0;
}

// domains/attendance/attendance.service.ts
import { AttendanceConstants as C } from './attendance.constants';

export class AttendanceCalculator {
  static currentPercent(attended: number, total: number): number {
    if (total <= C.MIN_CLASSES) throw new Error('Total classes must be greater than 0');
    if (attended > total) throw new Error('Attended cannot exceed total');
    return Number(((attended / total) * 100).toFixed(C.DECIMAL_PRECISION));
  }

  static maxMissable(attended: number, total: number, targetPercent: number): number {
    // largest x such that attended / (total + x) >= targetPercent / 100
    const x = Math.floor((attended * 100) / targetPercent - total);
    return Math.max(x, 0);
  }
}
```

Replicate this two-file shape for every domain in §4 — don't collapse constants and logic into one file, and don't special-case one tool's structure.

**Naming/style conventions:** PascalCase for classes, camelCase for methods/variables, kebab-case for files and routes, JSDoc on every exported method, named exports only (no default exports for constants/service classes — default exports make the constants pattern harder to grep for consistently).

## 3. Design tokens

I'm reading "intimidating action buttons" as **bold, high-contrast, unmissable primary CTAs** — large touch targets, strong contrast, a bit of shadow/scale on hover so "Calculate" never gets lost next to an ad unit. If you meant something more literally aggressive in styling, say so and I'll redo this section.

```ts
// shared/design-tokens.ts
export class DesignTokens {
  static readonly COLOR_PRIMARY = '#2D5BFF';        // used ONLY for primary CTAs
  static readonly COLOR_PRIMARY_HOVER = '#1E44CC';
  static readonly COLOR_SURFACE = '#FFFFFF';
  static readonly COLOR_BG = '#F7F8FA';
  static readonly COLOR_TEXT = '#111827';
  static readonly COLOR_TEXT_MUTED = '#6B7280';
  static readonly COLOR_ERROR = '#DC2626';
  static readonly COLOR_SUCCESS = '#16A34A';

  static readonly RADIUS_MD = '10px';
  static readonly RADIUS_LG = '16px';
  static readonly SHADOW_CTA = '0 4px 14px rgba(45, 91, 255, 0.35)';

  static readonly SPACING_UNIT = 4; // px — all spacing must be a multiple of this
  static readonly FONT_FAMILY = "'Inter', sans-serif";
}
```

**Primary CTA spec** ("Calculate" / "Convert" / "Start"): min-height 48px, `font-weight: 700`, background `COLOR_PRIMARY`, `box-shadow: SHADOW_CTA`, scale to 1.02 + darken to `COLOR_PRIMARY_HOVER` on hover, full-width on mobile. Secondary actions (Reset, Share) are outline-style and must never visually compete with the primary CTA — exactly one obvious primary action per tool.

## 4. Per-tool precision spec

Exact formulas and required edge-case handling. This is the section that determines whether the tools are actually *correct*, not just present.

**4.1 Attendance** — `current% = (attended/total)×100`. `maxMissable`: largest `x` s.t. `attended/(total+x) ≥ target/100` → `floor(attended×100/target − total)`, clamp to ≥0. `classesNeeded`: smallest `y` s.t. `(attended+y)/(total+y) ≥ target/100` → `ceil((t×total − attended)/(1−t))` where `t=target/100`, clamp to ≥0. *Edge cases:* `total=0` → validation error, not a divide-by-zero; `attended>total` → error; `target=100` → special-case with a message ("100% requires attending every remaining class"), don't run it through the general formula (division by zero).

**4.2 CGPA** — `CGPA = Σ(credit_i × gradePoint_i) / Σ(credit_i)`, rounded to 2 decimals. Grade→point map is a constants object, not hardcoded per-component — ship a default 10-point scale but keep it swappable. CGPA→% is genuinely ambiguous across institutions — don't hardcode one formula. Offer at least two named conventions as constants (e.g. `cgpa×9.5` and `(cgpa−0.75)×10`), default to one, and label which formula produced the shown result. *Edge cases:* zero subjects → disable Calculate; total credits = 0 → error; negative credits rejected at input.

**4.3 GPA** — same weighted-average shape as CGPA, but scale-agnostic: support 4.0/5.0/10.0 scales, each with its own grade→point map as a separate constants object. Same edge cases as CGPA.

**4.4 Percentage (4 distinct modes — don't merge C and D, they're different questions):**
- A: `X% of Y` → `(X/100)×Y`
- B: `X is what % of Y` → `(X/Y)×100` — error if `Y=0`
- C: `% increase/decrease from Old to New` → `((New−Old)/Old)×100`, signed, label "increase"/"decrease" by sign — error if `Old=0`
- D: `value after an X% change` → `Old×(1+X/100)` — this is C's inverse; keep it a separate mode

**4.5 Age Calculator** — calendar-aware subtraction, not day-division: `years = targetY−dobY; months = targetM−dobM; days = targetD−dobD`; if `days<0`, borrow a month (`days += daysInMonth(targetM−1)`, `months−=1`); if `months<0`, borrow a year (`months+=12`, `years−=1`). Next birthday = same month/day in current year, roll to next year if already passed. Total days lived = `floor((target−dob)/86400000)`. *Edge cases:* DOB in the future → error; DOB = Feb 29 with a non-leap target year → fall back to Feb 28 (pick this convention and keep it consistent); target before DOB → error.

**4.6 Date Calculator** — difference = `floor((dateB−dateA)/86400000)`, show absolute value + a before/after label. Add/subtract days: build dates with `Date.UTC(...)`, not local-time constructors — local-time math introduces off-by-one bugs across DST boundaries, and this is a common real bug in exactly this kind of tool.

**4.7 Unit Converter** — one canonical base unit per category, factors relative to it (e.g. length in meters, weight in kilograms): `result = (value × FACTORS[from]) / FACTORS[to]`. **Temperature cannot use this pattern** — it needs an offset, not just a scale factor. Dedicated functions: `CtoF = c => c×9/5+32`, `FtoC = f => (f−32)×5/9`, `CtoK = c => c+273.15`. *Edge case:* reject temperatures below absolute zero (−273.15°C).

**4.8 Pomodoro Timer** — presets `{focus:15,break:5} / {25,5} / {50,10}`, custom option. Compute remaining time from a stored end-timestamp each tick (`Date.now()` delta), not by decrementing a counter — `setInterval` drifts under background-tab throttling, so recompute from the timestamp on every tick and on `visibilitychange` so the display is still correct when the tab regains focus.

**4.9 Word/Character Counter** — words: split trimmed input on `/\s+/`, filter empty (0 for blank input, not 1). Characters: `input.length`; no-spaces: strip `/\s/`. Sentences: split on `/[.!?]+/`, filter non-empty trimmed segments. Paragraphs: split on `/\n\s*\n/`, filter non-empty. Reading time: `max(1, ceil(wordCount / WORDS_PER_MINUTE))` with `WORDS_PER_MINUTE=225` as a constant — except show "0 min" when word count is actually 0, don't apply the floor-of-1 there.

**4.10 Typing Speed Test** — define both metrics explicitly, this is the most commonly inconsistent calc across typing-test sites: `grossWPM = (totalTypedChars/5) / durationMinutes`; `netWPM = max(0, (totalTypedChars/5) − errorCount) / durationMinutes`; `accuracy = (correctChars/totalTypedChars)×100`. Report **net WPM** as the headline stat (industry convention), gross WPM as a secondary number. Guard against `duration=0`.

**4.11 Exam Countdown** — `remaining = examDateTime − now`, split into days/hours/min/sec via successive integer division. Use the same end-timestamp-based tick approach as §4.8 (no drift). When `remaining ≤ 0`, stop the interval and show a fixed "Exam day!" / "Exam has passed" state instead of negative numbers.

## 5. Before calling a tool "done"

- [ ] Calculation logic lives in `*.service.ts` as a pure static function — zero React imports in that file
- [ ] Every literal in that file traces back to a `*.constants.ts` entry
- [ ] Every edge case listed in §4 for that tool produces a user-facing error/empty state, never a silent `NaN`/`Infinity`
- [ ] Primary CTA matches the §3 spec exactly — no per-tool one-off button styling
- [ ] Fully usable via keyboard alone (logical tab order, Enter submits)
- [ ] Layout checked at 360px width (baseline low-end Android viewport)
