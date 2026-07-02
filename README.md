# 🌌 Astrava Landing Page & Founder Network

[![Next.js](https://img.shields.io/badge/Next.js-16.0%20(App%20Router)-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-ff69b4?style=flat-square&logo=framer-motion)](https://www.framer.com/motion/)

**Astrava Club** is a premium, invite-only digital network for Indian founders with a live product and a real problem to solve. Designed with an editorial, sophisticated, and minimal aesthetic, the landing page serves as the entry point for membership applications and community waiting lists.

For the detailed Product Requirements Document, please see the [PRD.md](file:///c:/MyFiles/company/Astrava.club/astrava-web/PRD.md).

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native CSS theme variables
- **Animations**: [Framer Motion v12](https://www.framer.com/motion/) for fluid page transitions, interactive scroll effects, and hover transitions
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utility Libraries**: `clsx`, `tailwind-merge`

---

## 📁 Repository Structure

Below is a map of the codebase architecture:

```text
astrava-web/
├── public/                 # Static assets (logos, icons, images)
├── src/
│   ├── app/                # Next.js App Router (Layouts, Pages, Globals)
│   │   ├── globals.css     # Global styles, Tailwind v4 theme, and custom patterns
│   │   ├── layout.tsx      # Root HTML structure and font loaders (DM Sans, Playfair, JetBrains)
│   │   └── page.tsx        # Homepage containing the section orchestrations
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Header navigation bar
│   │   ├── Hero.tsx        # Centered visual hero with waitlist marquee
│   │   ├── Problem.tsx     # The core thesis and problem funnel animation
│   │   ├── Features.tsx    # Column features (Discover, Analyze, Amplify)
│   │   ├── FounderStories.tsx # Network testimonials and success cards
│   │   ├── Criteria.tsx    # Details on membership qualification (Lookups & Exclusions)
│   │   ├── WaitlistForm.tsx # Application form with detailed questionnaire
│   │   ├── FAQ.tsx         # Frequently Asked Questions accordion
│   │   └── Footer.tsx      # Minimal footer navigation and tagline
│   └── lib/                # Shared utilities
│       └── utils.ts        # Tailwind merge helper
├── eslint.config.mjs       # Linting configuration
├── next.config.ts          # Next.js bundler settings
├── postcss.config.mjs      # PostCSS settings for Tailwind CSS v4
├── tsconfig.json           # TypeScript configuration
└── package.json            # Scripts and project dependencies
```

---

## 🎨 Design System

Astrava follows a highly curated, premium dark mode aesthetic (inspired by Stripe, Linear, and Vercel) defined inside [globals.css](file:///c:/MyFiles/company/Astrava.club/astrava-web/src/app/globals.css):

### Color Palette

- **Background**: `#0A0A0A` (Deep dark neutral)
- **Foreground / Text**: `#F5F0E8` (Warm soft white / editorial tone)
- **Card Background**: `#111111`
- **Muted text**: `#8A8378`
- **Primary / Brand Accent**: `#C9A84C` (Elegant Gold / Ochre)
- **Dark Accent**: `#3A3020`
- **Accent Hover**: `#E8C96A`

### Typography

- **Display Serif**: `var(--font-playfair)` (Playfair Display) – used for headings, quote marks, and key branding statements
- **Sans-Serif**: `var(--font-dm-sans)` (DM Sans) – default body, forms, and secondary elements
- **Monospace**: `var(--font-jetbrains)` (JetBrains Mono) – tags, labels, and marquee lists

---

## ⚡ Getting Started

### Prerequisites

Make sure you have Node.js (v18.x or later) and npm installed.

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Run the Development Server

Start the local server at `http://localhost:3000`:

```bash
npm run dev
```

### Build for Production

Compile the production bundle:

```bash
npm run build
```

### Linting

Analyze code quality and check for warnings/errors:

```bash
npm run lint
```

---

## 🎯 Verification & Launch Goals

1. **Aesthetics & Performance**: Ensure smooth scrolling, minimal UI latency, and premium dark/warm aesthetics.
2. **Device Optimization**: Fully responsive layouts supporting mobile, tablet, and wide desktop viewports.
3. **Waitlist Conversion**: Keep signup forms intuitive and validation feedback clear.
