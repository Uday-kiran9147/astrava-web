---
name: astrava-seo-optimization
description: >-
  Enforces technical SEO, structured data (JSON-LD), on-page content optimization,
  Core Web Vitals performance, E-E-A-T authority signals, and internal linking strategies
  to rank Astrava at the top of Google search results for student utility queries.
  Use whenever creating new pages, writing metadata, building sitemaps, or auditing SEO.
---

# Astrava SEO & Search Dominance Strategy

This skill governs the complete Search Engine Optimization (SEO) architecture for **astrava.club**. The goal is to outrank legacy calculator websites (OmniCalculator, Calculator.net, RapidTables) through superior page speed, zero-clutter UX, rich structured data, and high-quality educational content.

---

## 1. Core SEO Directives & Principles

1. **Beat Incumbents on Speed & UX**: Serve 100% statically pre-rendered HTML with sub-100ms TTFB, zero render-blocking third-party scripts, and instantaneous client-side calculations.
2. **The Anti-Thin-Content Rule**: Google devalues bare calculator forms. Every tool page must include **150–350 words of original, value-dense educational content**:
   - The exact mathematical formula.
   - A step-by-step worked example with real, relatable student numbers.
   - 3–4 practical FAQs answering student edge cases.
   - 3–5 contextual internal links to related tools.
3. **No Programmatic Mail-Merge Spam**: Never spin up duplicate near-identical URLs (e.g. `/75-percent-attendance`, `/80-percent-attendance`, `/85-percent-attendance`). Use a single canonical tool page (`/tools/attendance-calculator`) with interactive preset chips.
4. **100% Mobile & Core Web Vitals Optimization**:
   - **LCP (Largest Contentful Paint)**: `< 2.5s` on mid-range Android on 4G.
   - **INP (Interaction to Next Paint)**: `< 200ms` (instantaneous JS math).
   - **CLS (Cumulative Layout Shift)**: `< 0.1` (reserved layout heights for ads and tabular numbers for outputs).

---

## 2. On-Page SEO Architecture & Metadata Standard

Every route in the Next.js App Router must export a comprehensive `Metadata` object following this strict formula:

### 2.1 Metadata Formula & Guidelines
- **Title Tag (50–60 characters)**:
  `[Primary Keyword / Exact Student Problem] — [Key Action / Benefit] | Astrava`
  - *Example*: `Attendance Calculator — Calculate Classes to Miss or Attend | Astrava`
  - *Example*: `CGPA to Percentage Calculator — VTU, CBSE, AICTE Formulas | Astrava`
- **Meta Description (140–155 characters)**:
  Must include primary keyword, secondary search intent, and a strong call to action without generic boilerplate.
  - *Example*: `Free student attendance calculator. Find out your current attendance percentage, how many classes you can safely miss, or how many you need to reach 75%.`
- **Canonical URL**:
  Always declare an absolute canonical tag matching the clean flat route.

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
    title: 'Attendance Calculator — Classes to Miss or Attend | Astrava',
    description: 'Calculate your exact attendance percentage and see how many classes you can skip while staying above 75%.',
    url: 'https://astrava.club/tools/attendance-calculator',
    siteName: 'Astrava Student Utility Hub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://astrava.club/og/attendance-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Astrava Attendance Calculator Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Attendance Calculator | Astrava',
    description: 'Calculate attendance percentage and classes needed to reach your target.',
    images: ['https://astrava.club/og/attendance-calculator.png'],
  },
};
```

---

## 3. Structured Data (JSON-LD) Schemas

Every tool page must embed structured JSON-LD graphs to secure rich snippets and high visibility in Google Search.

### 3.1 Standard Tool Schema Graph
Combine `WebApplication` and `BreadcrumbList` inside an inline script:

```tsx
// src/components/tools/attendance/attendance-json-ld.tsx
export function AttendanceJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://astrava.club/tools/attendance-calculator#app',
        name: 'Astrava Attendance Calculator',
        url: 'https://astrava.club/tools/attendance-calculator',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Instant student attendance percentage calculator. Calculates current attendance, maximum missable classes, and classes required to reach 75% or 80%.',
        featureList: [
          'Calculates current attendance percentage',
          'Calculates safe missable class count',
          'Calculates attendance deficit and needed classes',
          'Supports custom target percentages (75%, 80%, 85%)',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://astrava.club/tools/attendance-calculator#breadcrumb',
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

## 4. Semantic Heading Structure & Content Blueprint

Every tool page must follow a strict semantic heading hierarchy:

```
H1: Attendance Calculator (Matches primary search intent)
 └── Form & Calculator Interface (Accessible interactive controls)
 └── Result Panel (Immediate answer with aria-live="polite")
 └── Ad Slot (Below result panel)
 └── H2: How to Calculate Attendance Percentage
      ├── P: Concise explanation of the math
      ├── Code/Blockquote: Formatted mathematical formula
      └── H3: Step-by-Step Worked Example (Real numbers: 38/50 attended)
 └── H2: How Many Classes Can You Safely Miss?
      └── P: Explanation of attendance buffer formula
 └── H2: Frequently Asked Questions (FAQ)
      ├── H3: What is the 75% attendance rule in colleges?
      ├── H3: What happens if I have medical leave?
      └── H3: Can I reach 75% if I am at 60%?
 └── H2: Related Student Tools (3-5 internal contextual links)
```

---

## 5. Dynamic Sitemap & Crawl Optimization

### 5.1 Dynamic `sitemap.ts` Implementation
All routes must be indexed dynamically in `src/app/sitemap.ts`:

```ts
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

const BASE_URL = 'https://astrava.club';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    'attendance-calculator',
    'cgpa-calculator',
    'percentage-calculator',
    'gpa-calculator',
    'age-calculator',
    'date-calculator',
    'unit-converter',
    'pomodoro-timer',
    'word-counter',
    'typing-test',
    'exam-countdown',
  ];

  const toolEntries: MetadataRoute.Sitemap = tools.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return [...staticEntries, ...toolEntries];
}
```

### 5.2 Clean `robots.ts` Implementation
```ts
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://astrava.club/sitemap.xml',
  };
}
```

---

## 6. Internal Linking & Topic Cluster Architecture

To build search authority and lower bounce rates:
1. **Hub-and-Spoke Model**:
   - Primary Hub: `/tools` (Directory of all student calculators).
   - Category Clusters:
     - **Academic Standing**: Attendance Calculator $\leftrightarrow$ CGPA Calculator $\leftrightarrow$ GPA Calculator.
     - **Math & Utilities**: Percentage Calculator $\leftrightarrow$ Unit Converter $\leftrightarrow$ Date Calculator $\leftrightarrow$ Age Calculator.
     - **Study & Focus**: Pomodoro Timer $\leftrightarrow$ Exam Countdown $\leftrightarrow$ Word Counter $\leftrightarrow$ Typing Test.
2. **Contextual In-Content Links**:
   - Embed internal links inside worked examples and FAQ answers (e.g., *"After computing your attendance, check your semester schedule with our [Exam Countdown](/tools/exam-countdown)."*).
3. **Descriptive Anchor Text**: Never use "Click here" or "Check this". Use keyword-rich anchors like `[CGPA to Percentage Calculator](/tools/cgpa-calculator)`.

---

## 7. E-E-A-T & Google Trust Signals

Google holds educational and utility hubs to strict trust standards:
1. **Dedicated Trust Pages**:
   - `/about`: Clear statement of purpose, creator background, and mission to deliver fast, ad-light student tools.
   - `/contact`: Working contact form and email for feedback or bug reports.
   - `/privacy`: Compliant with GDPR and India's DPDP Act, clearly explaining cookie consent and Google AdSense ad cookies.
   - `/terms`: Clear terms of service and tool disclaimer.
2. **Transparent Mathematical Methodology**:
   - Every calculator must cite the formula source or standard convention (e.g. CBSE 9.5 multiplier, AICTE formula, UTC date calculations).

---

## 8. Pre-Publishing SEO Quality Checklist

Before shipping any tool page or route, verify:
- [ ] Unique `<title>` (50–60 chars) with primary target keyword.
- [ ] Unique `<meta name="description">` (140–155 chars) with compelling CTA.
- [ ] Explicit canonical tag pointing to `https://astrava.club/tools/[slug]`.
- [ ] OpenGraph and Twitter card metadata configured with 1200×630 preview image.
- [ ] Valid JSON-LD structured data (`WebApplication` + `BreadcrumbList`).
- [ ] Exactly one semantic `<h1>` on the page.
- [ ] 150–350 words of original explanatory content, including formula and worked example.
- [ ] 3–4 practical FAQs with clear, structured answers.
- [ ] 3–5 contextual internal links to related tools.
- [ ] Page included in `sitemap.ts`.
- [ ] Mobile responsive at 360px width with no horizontal overflow.
- [ ] Core Web Vitals verified: no CLS on load, instant INP on calculation.
