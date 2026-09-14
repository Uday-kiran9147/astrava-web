---
name: calculator-math-precision
description: >-
  Defines the exact mathematical formulas, canonical service algorithms, precision rounding,
  and boundary edge-case handling for all 11 Astrava tools. Use whenever implementing or
  auditing mathematical algorithms, domain service classes, or unit tests.
---

# Calculator Math Precision & Edge-Case Specifications

Mathematical precision is the top priority of the Astrava hub. Imprecise calculations, drift under background throttling, or silent `NaN`/`Infinity` errors are strictly prohibited.

---

## 1. Universal Rules for Math Services

1. **No Silent `NaN` or `Infinity`**: Every calculation must validate inputs before computation. If an invalid state occurs, throw a descriptive domain error or return an explicit validation failure object.
2. **Rounding Rules**: Round final display numbers using explicit precision constants (e.g. `Number(val.toFixed(C.DECIMAL_PRECISION))`). Never perform intermediate rounding that accumulates floating-point errors.
3. **UTC Date Operations**: Always use `Date.UTC()` for date calculations. Never use local time constructors when computing date intervals or differences to avoid Daylight Savings Time (DST) off-by-one errors.
4. **Drift-Proof Timers**: Timers and countdowns must compute remaining time as a delta from a fixed end-timestamp (`Date.now()`), never by decrementing a counter inside `setInterval`.

---

## 2. Per-Tool Mathematical Specifications

### 2.1 Attendance Calculator (`/tools/attendance-calculator`)
- **Current Attendance %**:
  $$\text{currentPercent} = \left(\frac{\text{attended}}{\text{total}}\right) \times 100$$
- **Max Classes Missable**:
  $$\text{maxMissable} = \max\left(0, \left\lfloor \frac{\text{attended} \times 100}{\text{target}} - \text{total} \right\rfloor\right)$$
- **Classes Needed**:
  $$\text{classesNeeded} = \max\left(0, \left\lceil \frac{t \times \text{total} - \text{attended}}{1 - t} \right\rceil\right) \quad \text{where } t = \frac{\text{target}}{100}$$
- **Edge Cases & Guards**:
  - `total <= 0` $\rightarrow$ Validation Error ("Total classes must be greater than 0").
  - `attended > total` $\rightarrow$ Validation Error ("Attended classes cannot exceed total classes").
  - `attended < 0 || total < 0` $\rightarrow$ Validation Error ("Class count cannot be negative").
  - `target = 100` $\rightarrow$ Special-case message: "100% requires attending every remaining class" (bypasses division by zero $(1-t)$).

---

### 2.2 CGPA Calculator (`/tools/cgpa-calculator`)
- **Weighted CGPA**:
  $$\text{CGPA} = \frac{\sum (\text{credits}_i \times \text{gradePoints}_i)}{\sum \text{credits}_i}$$
  Rounded to 2 decimal places.
- **CGPA to Percentage Conversion**:
  Support swappable institution formulas defined in constants:
  1. `Standard/CBSE`: $\text{Percentage} = \text{CGPA} \times 9.5$
  2. `AICTE/VTU`: $\text{Percentage} = (\text{CGPA} - 0.75) \times 10$
  3. `Direct Scale`: $\text{Percentage} = (\text{CGPA} / \text{ScaleMax}) \times 100$
- **Edge Cases & Guards**:
  - Empty subject list $\rightarrow$ Disable calculate action.
  - $\sum \text{credits} = 0$ $\rightarrow$ Validation Error ("Total credits must be greater than 0").
  - Negative credits $\rightarrow$ Reject at input level.

---

### 2.3 GPA Calculator (`/tools/gpa-calculator`)
- **Weighted GPA**: Scale-agnostic weighted average.
- **Supported Scales**:
  - `4.0 Scale` (US Standard: A=4.0, A-=3.7, B+=3.3, etc.)
  - `5.0 Scale` (International: A=5.0, B=4.0, etc.)
  - `10.0 Scale` (Indian / Engineering: O=10, A+=9, A=8, etc.)
- **Edge Cases & Guards**: Same as CGPA (zero credits guard, credit bounds validation).

---

### 2.4 Percentage Calculator (`/tools/percentage-calculator`)
Must support **4 distinct modes** (do NOT merge C and D):
- **Mode A (X% of Y)**:
  $$\text{Result} = \left(\frac{X}{100}\right) \times Y$$
- **Mode B (X is what % of Y)**:
  $$\text{Result} = \left(\frac{X}{Y}\right) \times 100$$
  *Guard*: Error if $Y = 0$.
- **Mode C (% increase / decrease from Old to New)**:
  $$\Delta\% = \left(\frac{\text{New} - \text{Old}}{\text{Old}}\right) \times 100$$
  *Guard*: Error if $\text{Old} = 0$. Display signed indicator: "Increase" if $\Delta\% > 0$, "Decrease" if $\Delta\% < 0$.
- **Mode D (Value after an X% change)**:
  $$\text{Result} = \text{Old} \times \left(1 + \frac{X}{100}\right)$$
  (Where $X$ can be positive for increase or negative for decrease).

---

### 2.5 Age Calculator (`/tools/age-calculator`)
- **Calendar-Aware Subtraction**:
  ```ts
  let years = targetYear - dobYear;
  let months = targetMonth - dobMonth;
  let days = targetDay - dobDay;

  if (days < 0) {
    // Borrow days from preceding month
    const prevMonthDays = daysInMonth(targetYear, targetMonth - 1);
    days += prevMonthDays;
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  ```
- **Total Days Lived**:
  $$\text{totalDays} = \left\lfloor \frac{\text{targetUTC} - \text{dobUTC}}{86400000} \right\rfloor$$
- **Next Birthday**:
  Calculate date of same month/day in current target year. If already passed, roll to next year.
- **Edge Cases & Guards**:
  - `DOB > Target Date` $\rightarrow$ Error ("Date of birth cannot be in the future").
  - `DOB = Feb 29` on non-leap target year $\rightarrow$ Fall back consistently to **Feb 28**.

---

### 2.6 Date Calculator (`/tools/date-calculator`)
- **Date Difference**:
  $$\Delta\text{Days} = \left\lfloor \frac{\text{DateB}_{\text{UTC}} - \text{DateA}_{\text{UTC}}}{86400000} \right\rfloor$$
  Output absolute difference + contextual badge ("X days after" / "X days before").
- **Add / Subtract Days**:
  ```ts
  const resultTime = Date.UTC(y, m, d) + (daysToAdd * 86400000);
  const resultDate = new Date(resultTime);
  ```
- **Guard**: Never use `new Date(year, month, day)` local constructors for math.

---

### 2.7 Unit Converter (`/tools/unit-converter`)
- **Factor-Based Conversion** (Length, Weight, Area, Volume, Speed, Time, Data):
  $$\text{Result} = \frac{\text{value} \times \text{FACTOR}[\text{from}]}{\text{FACTOR}[\text{to}]}$$
- **Temperature Conversion** (Requires Offset Math):
  - Celsius $\rightarrow$ Fahrenheit: $F = C \times \frac{9}{5} + 32$
  - Fahrenheit $\rightarrow$ Celsius: $C = (F - 32) \times \frac{5}{9}$
  - Celsius $\rightarrow$ Kelvin: $K = C + 273.15$
  - Kelvin $\rightarrow$ Celsius: $C = K - 273.15$
  - Fahrenheit $\rightarrow$ Kelvin: $K = (F - 32) \times \frac{5}{9} + 273.15$
  - Kelvin $\rightarrow$ Fahrenheit: $F = (K - 273.15) \times \frac{9}{5} + 32$
- **Guard**: Reject temperatures below Absolute Zero ($< -273.15^\circ\text{C}$, $< 0\text{K}$, $< -459.67^\circ\text{F}$).

---

### 2.8 Pomodoro Timer (`/tools/pomodoro-timer`)
- **Presets**: $\{15\text{m focus} / 5\text{m break}\}$, $\{25\text{m focus} / 5\text{m break}\}$, $\{50\text{m focus} / 10\text{m break}\}$, plus Custom input.
- **Drift-Proof Implementation**:
  ```ts
  // Store target end timestamp upon start/resume
  const endTimestamp = Date.now() + remainingMs;
  
  // On every tick and on document.addEventListener('visibilitychange', ...)
  const remaining = Math.max(0, endTimestamp - Date.now());
  ```

---

### 2.9 Word & Character Counter (`/tools/word-counter`)
- **Word Count**: Split trimmed string on `/\s+/`. If input is empty string, count is `0` (not `1`).
- **Character Count**: `input.length`.
- **Characters (No Spaces)**: `input.replace(/\s/g, '').length`.
- **Sentence Count**: Split on `/[.!?]+/`, filter non-empty trimmed segments.
- **Paragraph Count**: Split on `/\n\s*\n/`, filter non-empty segments.
- **Reading Time**:
  $$\text{ReadingTime} = \begin{cases} 0 \text{ min} & \text{if } \text{wordCount} = 0 \\ \max(1, \lceil \text{wordCount} / 225 \rceil) \text{ min} & \text{if } \text{wordCount} > 0 \end{cases}$$
- **Privacy Rule**: 100% client-side. Never send text to server or logs.

---

### 2.10 Typing Speed Test (`/tools/typing-test`)
- **Duration**: Preset `30s` and `60s`.
- **Gross WPM**:
  $$\text{Gross WPM} = \frac{\text{totalTypedChars} / 5}{\text{durationInMinutes}}$$
- **Net WPM (Headline Stat)**:
  $$\text{Net WPM} = \max\left(0, \frac{(\text{totalTypedChars} / 5) - \text{errorCount}}{\text{durationInMinutes}}\right)$$
- **Accuracy %**:
  $$\text{Accuracy} = \left(\frac{\text{correctChars}}{\text{totalTypedChars}}\right) \times 100$$
- **Guard**: Guard against `duration = 0` to prevent division by zero.

---

### 2.11 Exam Countdown (`/tools/exam-countdown`)
- **Remaining Time**:
  $$\text{deltaMs} = \text{examTimestamp} - \text{Date.now()}$$
  Split into days, hours, minutes, seconds using integer division:
  ```ts
  const days = Math.floor(deltaMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((deltaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((deltaMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((deltaMs % (1000 * 60)) / 1000);
  ```
- **Terminal State**: When `deltaMs <= 0`, stop interval, clamp values to `0`, and render "Exam day!" or "Exam has passed". Never display negative countdown numbers.
