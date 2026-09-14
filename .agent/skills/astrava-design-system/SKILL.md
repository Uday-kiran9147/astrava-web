---
name: astrava-design-system
description: >-
  Defines the clean, high-contrast, crisp white/light theme design system for Astrava.
  Enforces purposeful typography, clear visual hierarchy, unmissable primary CTAs,
  and zero-slop utility design across all tools on the website.
---

# Astrava Design System — Clean Light Utility Theme

Astrava is an uncompromising, high-speed, precision-engineered utility hub for students. It is designed to feel **clean, crisp, trustworthy, and ultra-fast** — like a world-class reference instrument. It avoids dark "AI slop" tropes (fake sci-fi HUDs, nested obsidian boxes, pulsing dots on static text, monospace prose).

---

## 1. Core Visual Principles

1. **Crisp White Theme**: Pure white (`#FFFFFF`) surfaces against a subtle slate backdrop (`#F8FAFC`), bounded by crisp, subtle borders (`#E2E8F0` / `#CBD5E1`).
2. **Clear Surface Hierarchy**:
   - Canvas: `#F8FAFC` (Slate 50)
   - Surface / Cards: `#FFFFFF` (Pure White) with subtle shadow
   - Interactive Inputs: `#FFFFFF` with `#F1F5F9` hover and `#1E50FF` focus ring
   - Result Highlight: High-contrast white card with colored status accent
3. **The Unmissable Primary CTA**: A bold, high-contrast action button in Electric Cobalt (`#1E50FF` / `#0038D1`) with high tactile feedback.
4. **Purposeful Monospace**: Monospace typography (`font-mono`) is reserved strictly for numbers, tabular statistics (`tabular-nums`), code, and mathematical formulas. All labels, explanations, headings, and FAQ copy use clean, readable sans-serif (`Inter`).
5. **No Fake Decoration**: No random pulsing LEDs, no `// EYEBROWS`, no generic gradient glows. Every pixel serves a functional purpose.

---

## 2. Design Tokens (`src/shared/design-tokens.ts`)

```ts
export class DesignTokens {
  // Canvas & Surfaces (Light Theme)
  static readonly COLOR_BG = '#F8FAFC';             // Slate 50 canvas
  static readonly COLOR_SURFACE = '#FFFFFF';        // Pure white card
  static readonly COLOR_SURFACE_MUTED = '#F1F5F9';  // Slate 100 muted panel / row
  static readonly COLOR_SURFACE_HOVER = '#F8FAFC';  // Subtle hover state
  
  // Primary CTA & Accents
  static readonly COLOR_PRIMARY = '#1E50FF';        // Electric Cobalt
  static readonly COLOR_PRIMARY_HOVER = '#0038D1';  // Darker active cobalt
  static readonly COLOR_PRIMARY_LIGHT = '#EFF6FF';  // Selected chip fill / soft blue
  
  // Typography
  static readonly COLOR_TEXT = '#0F172A';          // Slate 900 (Headings, primary values)
  static readonly COLOR_TEXT_BODY = '#334155';     // Slate 700 (Readable copy)
  static readonly COLOR_TEXT_MUTED = '#64748B';    // Slate 500 (Labels, helper text)
  static readonly COLOR_TEXT_FAINT = '#94A3B8';    // Slate 400 (Dividers, breadcrumb slashes)
  
  // Borders
  static readonly COLOR_BORDER = '#E2E8F0';        // Slate 200 crisp border
  static readonly COLOR_BORDER_STRONG = '#CBD5E1'; // Slate 300 input border
  static readonly COLOR_BORDER_FOCUS = '#1E50FF';  // Focus ring

  // Semantic Statuses
  static readonly COLOR_SUCCESS = '#16A34A';       // Emerald 600
  static readonly COLOR_SUCCESS_BG = '#F0FDF4';    // Emerald 50
  static readonly COLOR_SUCCESS_BORDER = '#BBF7D0';// Emerald 200

  static readonly COLOR_WARNING = '#D97706';       // Amber 600
  static readonly COLOR_WARNING_BG = '#FFFBEB';    // Amber 50
  static readonly COLOR_WARNING_BORDER = '#FDE68A';// Amber 200

  static readonly COLOR_ERROR = '#DC2626';         // Red 600
  static readonly COLOR_ERROR_BG = '#FEF2F2';      // Red 50
  static readonly COLOR_ERROR_BORDER = '#FECACA';  // Red 200

  // Elevation & Radii
  static readonly RADIUS_SM = '6px';
  static readonly RADIUS_MD = '10px';
  static readonly RADIUS_LG = '14px';
  static readonly SHADOW_CARD = '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)';
  static readonly SHADOW_CTA = '0 4px 14px rgba(30, 80, 255, 0.35)';

  // Fonts
  static readonly FONT_SANS = "'Inter', system-ui, -apple-system, sans-serif";
  static readonly FONT_MONO = "'JetBrains Mono', 'SF Mono', Consolas, monospace";
}
```

---

## 3. Typography Hierarchy

| Element | Tailwind Classes | Purpose |
| :--- | :--- | :--- |
| **Page H1** | `text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900` | Dominant tool title |
| **Tool Summary** | `text-sm sm:text-base font-normal text-slate-600 max-w-xl` | 1-2 sentence descriptive summary |
| **Section H2** | `text-xl sm:text-2xl font-bold tracking-tight text-slate-900` | Section headings |
| **Form Label** | `text-sm font-semibold text-slate-700 block mb-1.5` | Crisp form field titles |
| **Result Stat** | `text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 tabular-nums` | Headline computed answer |
| **Status Badge** | `text-xs font-semibold px-2.5 py-1 rounded-md border` | Contextual status indicator (Green/Amber/Red) |
| **Body Copy** | `text-sm sm:text-base text-slate-600 leading-relaxed` | Explanations and FAQ text |

---

## 4. Component Rules

- **Buttons**:
  - Primary: Min-height 48-52px, `#1E50FF`, white bold text, slight elevation, clean scale feedback.
  - Secondary/Outline: White surface, `#E2E8F0` border, `#334155` text, hover `#F8FAFC`.
- **Cards**: Pure white (`bg-white`), 1px border (`border-slate-200`), subtle shadow (`shadow-sm`), rounded-xl (`rounded-xl` or `rounded-[14px]`).
- **Inputs**: White background, `border-slate-300`, `focus:border-[#1E50FF] focus:ring-2 focus:ring-blue-100`, monospace numbers with `tabular-nums`.
- **Result Panel**: Clean white card with colored status accent, large result number, clear plain-English explanation, and a horizontal divider row for metrics.
