---
name: no-ai-slop
description: >-
  Diagnostic guide and enforcement rules to detect, prevent, and fix "AI slop" UI
  patterns on Astrava. AI slop is the visual fingerprint of undirected AI-generated
  interfaces: generic obsidian cards everywhere, fake HUD labels with no meaning,
  padding-heavy layouts, identical gradients on every surface, and decoration that
  performs personality without having any. Use this skill whenever a UI looks
  templated, hollow, chatbot-aesthetic, or like a dark-mode dashboard generator ran
  unattended.
---

# Astrava Anti-AI-Slop Design Enforcement Guide

AI-generated UIs have a recognizable fingerprint. They look impressive in a screenshot and hollow in use. This skill defines that fingerprint precisely — what causes it, how to spot it in code, and what to replace it with.

**Rule of thumb:** if the layout could describe a SaaS dashboard, a blockchain explorer, or a crypto exchange without changing a single color or label, it is AI slop. Astrava is a student calculator site. It should look and feel like one — purposeful, precise, unpretentious.

---

## 1. The AI Slop Fingerprint — What to Look For

### 1.1 Decoration Performing Personality

**Symptoms:**
- Eyebrow text like `// PARAMETER 01`, `// ATTENDED_SESSIONS`, or `// SECTION: HOW IT WORKS` placed before every input or heading with no functional purpose.
- Pulsing dots (`animate-pulse`) on static elements that have no real-time state to communicate.
- Monospace `font-mono` applied to plain English prose just to look "techy."
- Status badges with `UPPERCASE TRACKING-WIDEST` labels like `SAFE MARGIN` or `TARGET SECURED` on a student attendance form.
- Laser glow shadows on everything: inputs, cards, badges, icons.

**Why it is slop:** These elements mimic the aesthetic of mission-critical software (flight HUDs, trading terminals) where the stakes justify the visual intensity. A student checking if they can skip Friday's lecture is not a pilot. The mismatch between aesthetic and context breaks trust and legibility.

**Fix:** Every decorative element must answer: *what functional information does this communicate that plain text cannot?* If the answer is "none," remove it.

---

### 1.2 The Obsidian Everything Problem

**Symptoms:**
- Background: `#0B0F19`. Cards: `#111827`. Secondary panels: `#0E131F`. Input fills: `#1F2937`. Nested cards: `#0D121F`.
- Five shades of near-black stacked on top of each other with 1px slate borders separating them.
- A result panel that is a dark card inside a dark section inside a dark page.
- White text (`text-white`, `text-slate-100`, `text-slate-200`) everywhere — no true hierarchy because everything is light-on-dark at the same contrast level.

**Why it is slop:** Dark obsidian stacking is the default aesthetic of unconstrained AI generation. It photographs well, ships fast, and communicates nothing specific. The user's eye has no natural place to land because every surface is equally dark.

**Fix:** Use darkness with intention and contrast:
- **One primary dark surface per tool** — the calculator card only.
- **Light results panel on dark page** or **dark calculator card on light page** — pick a direction and commit.
- The result (the output the user came for) must have the highest contrast moment on the page — not another dark box.
- Reserve deep obsidian for the shell (header, footer, page background). The working area should breathe.

---

### 1.3 The Fake HUD / Telemetry Aesthetic

**Symptoms:**
- Result panels styled as spacecraft dashboards with gradient top accent strips, radial blur glows, and animated status indicators for a number that changes once when you click a button.
- Labels like `TACTICAL TELEMETRY`, `MISSION-CRITICAL`, `LASER EMERALD`, or `CYBER AMBER` in design tokens.
- Status chips with pulsing LEDs for states that are simply green/red.
- Numbers displayed in `font-black font-mono tracking-tighter tabular-nums` at 6xl when `text-4xl font-bold` would be clearer.

**Why it is slop:** Telemetry aesthetic exists to communicate dynamic, real-time, high-frequency data streams. A student entering two numbers and pressing Calculate produces a static result. Wrapping a static number in HUD chrome is theatrical fraud — it signals urgency that does not exist and exhausts the user's attention budget on decoration.

**Fix:** Result panels should be clean, clear, and quietly confident:
- Large number, clearly labeled, correct color coding for status, brief plain-language interpretation below it.
- No gradient top strips, no radial glow blobs, no animated dots on a static number.
- Status should use color (green/amber/red) with a short plain label — not `ATTENDANCE DEFICIT` in monospace caps, but simply `Below target`.

---

### 1.4 Monospace Overuse

**Symptoms:**
- `font-mono` on field labels, card eyebrows, breadcrumbs, navigation links, footer copyright.
- Monospace text that is not displaying a number, a code value, a formula, or a path.
- Eyebrow labels in `font-mono uppercase tracking-widest` that say things like `PARAMETER 01` above a field labeled "Total Classes."

**Why it is slop:** Monospace fonts communicate machine-readable output, code, formulas, or precise numerical data. Using them on plain English prose creates visual noise that says "I wanted this to look like a developer tool" without achieving readability or information density.

**Fix: Monospace belongs exactly and only on:**
- Numbers in the result panel (for stability and alignment: `tabular-nums`)
- Actual code blocks or formula representations
- Percentage values, numerical stats, timestamps
- Short computed output strings (e.g. `"38 / 50"`)

Everything else — labels, descriptions, help text, FAQ content, navigation — uses the site's sans-serif.

---

### 1.5 Shadow and Glow Everywhere

**Symptoms:**
- `shadow-[0_6px_24px_-2px_rgba(30,80,255,0.50),0_2px_8px_-1px_rgba(30,80,255,0.30)]` on the primary button.
- `shadow-[0_8px_30px_rgba(30,80,255,0.65)]` on hover.
- `shadow-[0_4px_24px_rgba(0,0,0,0.3)]` on cards.
- `shadow-[0_8px_32px_rgba(0,0,0,0.4)]` on the result panel.
- Radial blur blobs as `absolute` positioned `div` elements with `blur-3xl` for ambient glow.
- Multiple layered box-shadows on inputs, chips, and icons.

**Why it is slop:** Shadows establish hierarchy and focus. When every element casts a dramatic shadow, shadows cease to communicate anything — they become uniform visual noise. The laser-cobalt glow on a button looks striking once; when it appears on the button, the result card, and the status chip simultaneously, it is just blur.

**Fix: Shadow hierarchy — only three levels:**
1. **Focused/interactive CTA only**: The primary Calculate button gets the cobalt glow. Nothing else does.
2. **Elevated surface**: One subtle shadow on cards that float above the page background. `0 1px 3px rgba(0,0,0,0.12)` — not 6 layers deep.
3. **Flat**: Everything else. No shadow. Borders provide separation.

---

### 1.6 Padding-First Layout Thinking

**Symptoms:**
- Calculator form card with `p-7 sm:p-9` padding creating a content-to-card-edge gap that makes fields feel stranded in space.
- 6–8 pixel gap between a label and its field, then `space-y-6` or `space-y-8` between fields.
- Result stats in a 3-column grid where each cell has its own dark card with padding and border, creating a card-inside-card-inside-card effect.
- `space-y-16` between page sections on a single tool page.

**Why it is slop:** AI generators default to generous padding to look "premium." Real premium interfaces use space to create rhythm and guide the eye — not to pad out emptiness. Student tools should be compact and efficient: the user needs to enter two numbers and read one result. Every pixel of unnecessary vertical space is friction.

**Fix:** Work with information density, not against it:
- Fields: `gap-4` between fields, not `gap-6` or `gap-8`.
- Form card: `p-5 sm:p-6` padding maximum.
- Result stats: a clean horizontal flex row with dividers, not individual mini-cards.
- Section spacing: `space-y-8` between major sections, not `space-y-16`.
- If the page looks full at `360px` wide, the spacing is right.

---

## 2. The Positive Pattern — What Good Looks Like

A well-designed student calculator page has:

### 2.1 One Clear Visual Job Per Region

| Region | Job | How |
|---|---|---|
| Page header (H1 + description) | Name the tool and earn trust in 2 seconds | Large black type on light/dark, one clean sentence |
| Input region | Collect data efficiently | Clean inputs, visible labels, compact layout |
| Result | Deliver the answer with confidence | Large number, plain status, brief interpretation |
| Explanation | Build understanding | Readable prose, real formula, concrete example |
| FAQ | Prevent re-entry | Plain text accordion |

No region should try to do more than one job. The result panel is not also a status dashboard. The FAQ is not also an SEO content dump.

### 2.2 Typographic Hierarchy That Earns Its Levels

Maximum **four** type sizes per page:
1. `H1` — Tool name (one instance)
2. `H2` — Section titles ("How It Works", "FAQ")
3. Result number — the headline output
4. Body — all field labels, descriptions, help text

If a fifth level exists, merge or remove a level. Every additional size adds noise.

### 2.3 Color Meaning Locked

| Color | Use | Never use for |
|---|---|---|
| `#1E50FF` Electric Cobalt | Primary CTA button only | Labels, borders, icons, decorative text |
| `#00D68F` Emerald | "On track" / success state | General decoration |
| `#FF2A55` Crimson | "Deficit" / error state | Warnings |
| `#FFAA00` Amber | "Margin" / caution state | General highlights |
| White/Dark slate | Text hierarchy | Status signaling |

If cobalt appears in more than **one element at a time**, it is being overused. The button competes with the badge, which competes with the icon — and nothing is primary anymore.

### 2.4 Functional Decoration Only

Allowed decoration:
- **Top accent bar** on the result panel: communicates status via color. One element, one purpose.
- **Pulsing dot** on the CTA: draws attention to the primary action before calculation. Remove it from the result, from the header, from everywhere else.
- **Monospace on the result number**: prevents layout shift as digits change.

Banned decoration:
- Gradient background radial glows on card containers.
- Eyebrow text labels `// LIKE THIS` on regular inputs.
- UPPERCASE MONOSPACE CAPS on result status labels in a form context.
- Animated elements on static data.

---

## 3. Code Patterns to Flag and Fix

### 3.1 Flag This Pattern
```tsx
// ❌ AI SLOP: eyebrow on every input, monospace label, fake HUD feel
<span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">
  PARAMETER 01
</span>
<label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 block mb-2">
  Total Classes Held
</label>
```

### 3.1 Replace With
```tsx
// ✓ Clean: one label, readable, no theater
<label className="text-sm font-semibold text-slate-700 block mb-1.5">
  Total classes held
</label>
```

---

### 3.2 Flag This Pattern
```tsx
// ❌ AI SLOP: obsidian card stacked inside obsidian page inside obsidian background
<div className="min-h-screen bg-[#0B0F19]">
  <div className="bg-[#111827] border border-slate-800 rounded-[14px] p-7">
    <div className="bg-[#0E131F] border-2 border-slate-800/90 p-5 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-[10px]">
```

### 3.2 Replace With
```tsx
// ✓ Clear surface hierarchy: one dark shell, one light working area
<div className="min-h-screen bg-slate-950">
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
    {/* inputs, result — all on white */}
  </div>
```

---

### 3.3 Flag This Pattern
```tsx
// ❌ AI SLOP: status badge performing military authority on a student form
<span className="text-xs font-mono font-extrabold uppercase px-3.5 py-1.5 rounded-[6px] tracking-wider border
  text-[#00D68F] border-[#00D68F]/30 bg-[#00D68F]/10">
  <span className="w-2 h-2 rounded-full animate-pulse bg-[#00D68F]" />
  TARGET SECURED
</span>
```

### 3.3 Replace With
```tsx
// ✓ Confident, readable, proportionate
<span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
  On track
</span>
```

---

### 3.4 Flag This Pattern
```tsx
// ❌ AI SLOP: every stat in its own dark mini-card
<div className="grid grid-cols-3 gap-3 mt-4">
  <div className="p-3.5 rounded-[10px] bg-[#111827] border border-slate-800">
    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Classes Attended</span>
    <span className="text-2xl font-black font-mono text-white tabular-nums">38</span>
  </div>
  // × 3 more identical mini-cards
```

### 3.4 Replace With
```tsx
// ✓ Clean horizontal stat row with dividers
<div className="flex items-stretch divide-x divide-slate-200 border-t border-slate-200 mt-5 pt-5">
  <div className="flex-1 px-4 first:pl-0">
    <div className="text-xs text-slate-500 mb-0.5">Attended</div>
    <div className="text-2xl font-bold text-slate-900 tabular-nums">38</div>
  </div>
  <div className="flex-1 px-4">
    <div className="text-xs text-slate-500 mb-0.5">Missed</div>
    <div className="text-2xl font-bold text-slate-900 tabular-nums">12</div>
  </div>
  <div className="flex-1 px-4">
    <div className="text-xs text-slate-500 mb-0.5">Total</div>
    <div className="text-2xl font-bold text-slate-900 tabular-nums">50</div>
  </div>
</div>
```

---

## 4. The One-Line Gut-Check

Before shipping any component, read the UI out loud. If describing it requires words like:
- "tactical", "laser", "HUD", "telemetry", "monolith", "cyber", "obsidian"
- "mission-critical", "command center", "flight instrument"

...and the product is a student attendance calculator — **the framing is wrong**. Fix the framing, the UI will follow.

The site should feel like a **smart, fast, trustworthy tool built by someone who cares** — not like an AI generated a dark dashboard at 2am and shipped it.
