---
name: tool-page-builder
description: >-
  Guides the standard assembly, SEO metadata, JSON-LD schema, AdSense-safe layout structure,
  accessibility, and responsive design for every tool page in the Astrava Student Utility Hub.
  Use whenever generating new tool pages or updating tool UI layouts.
---

# Tool Page Builder & SEO/UX Standards

Every tool page on **astrava.club** must follow a unified template structure to maximize SEO dwell-time, adhere to Google AdSense compliance policies, and ensure seamless mobile and keyboard usability.

---

## 1. Standard Tool Page Layout Specification

Every tool route (`/tools/[tool-slug]`) must render these sections in this exact vertical order:

```
┌───────────────────────────────────────────────────────────┐
│ 1. Breadcrumbs (Home > Tools > Tool Name)                │
├───────────────────────────────────────────────────────────┤
│ 2. Tool Header (H1 + 1-2 sentence descriptive summary)   │
├───────────────────────────────────────────────────────────┤
│ 3. Calculator Card (Inputs + Primary CTA Button)          │
├───────────────────────────────────────────────────────────┤
│ 4. Result Panel (Metrics, Visual Status, Clear/Copy)      │
├───────────────────────────────────────────────────────────┤
│ 5. Ad Unit Slot (Safe location: below Result Panel)       │
├───────────────────────────────────────────────────────────┤
│ 6. "How It Works" (Formula + Worked Real-Number Example)  │
├───────────────────────────────────────────────────────────┤
│ 7. Frequently Asked Questions (Accordion / Structured)    │
├───────────────────────────────────────────────────────────┤
│ 8. Related Tools Grid (3-5 contextual internal links)     │
└───────────────────────────────────────────────────────────┘
```

---

## 2. AdSense Policy Safety Rules

1. **Input Zone Protection**: Never place ads above or immediately beside calculator inputs. Users must never accidentally click an ad while interacting with input fields.
2. **No Disguised Ads**: Ads must be clearly contained within a distinct layout slot labeled `"Advertisement"` in subtle text (`text-xs text-gray-400`).
3. **No Interstitials**: Never trigger full-screen interstitial overlays on button clicks or page load.
4. **Core Flow Unblocked**: The calculator and its immediate calculation result must always render before any ad unit in the DOM flow.

---

## 3. SEO & Structured Data (JSON-LD)

Each tool page must export strict static Next.js metadata and render structured JSON-LD schemas.

### 3.1 Metadata Definition Example
```ts
// src/app/tools/attendance-calculator/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attendance Calculator — Calculate Classes to Miss or Attend | Astrava',
  description: 'Free student attendance calculator. Find out your current attendance percentage, how many classes you can safely miss, or how many you need to reach 75%.',
  alternates: {
    canonical: 'https://astrava.club/tools/attendance-calculator',
  },
  openGraph: {
    title: 'Attendance Calculator | Astrava',
    description: 'Calculate attendance percentage and classes needed to reach your target.',
    url: 'https://astrava.club/tools/attendance-calculator',
    siteName: 'Astrava Student Utility Hub',
    type: 'website',
  },
};
```

### 3.2 JSON-LD Structured Data
Render `WebApplication` and `BreadcrumbList` schemas inside the page:

```tsx
export function AttendanceJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Astrava Attendance Calculator',
        url: 'https://astrava.club/tools/attendance-calculator',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Calculate student attendance percentage and classes needed to reach 75%, 80%, or custom goals.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://astrava.club',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://astrava.club/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Attendance Calculator',
            item: 'https://astrava.club/tools/attendance-calculator',
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 4. Explanatory Content & Anti-Thin-Content Standard

Google actively penalizes thin calculator pages. Every tool page must include **150–300 words of original educational content**:

1. **The Formula**: Clean mathematical representation (e.g. KaTeX / LaTeX or structured markdown).
2. **Step-by-Step Worked Example**: Must use real, relatable student numbers:
   - *Example*: "Suppose you have attended 38 out of 50 classes (76%) and want to maintain 75%..."
3. **Contextual FAQ**: 3–4 answers to practical student dilemmas (e.g. "What happens if I miss a lab session?", "How do medical certificates affect attendance calculations?").
4. **Contextual Internal Linking**: Link 3–5 related tools naturally within text (e.g. "Planning for semester exams? Use our [Exam Countdown](/tools/exam-countdown) and calculate your target [CGPA](/tools/cgpa-calculator).").

---

## 5. Accessibility & Mobile Standards

- **Keyboard Traversal**:
  - All form controls have explicit `<label>` tags with matching `htmlFor`/`id`.
  - Pressing `Enter` in any input field triggers the primary CTA form submission.
- **ARIA Live Regions**:
  - The Result Panel must include `aria-live="polite"` so screen readers announce calculated values upon update.
- **Mobile Viewport Compatibility**:
  - Test layouts at **360px** viewport width (entry-level Android).
  - Touch targets must be at least `48px × 48px`.
  - Primary CTA spans `w-full` on screens `< 640px`.
