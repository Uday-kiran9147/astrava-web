# PRD.md

# Astrava Landing Page V1

## Project Overview

Astrava is a distribution-first company focused on helping software products get discovered.

The purpose of this website is not to function as a product directory, SaaS application, or community platform.

The sole objective of V1 is to establish Astrava as a premium software discovery and distribution brand while collecting:

* Newsletter subscribers
* Product submissions
* Founder interest

The website should feel like a world-class media company rather than a startup landing page.

Target emotional response:

> "These people discover important products before everyone else."

---

# Core Positioning

## Primary Message

Helping great software products get discovered.

## Secondary Message

Discover promising software products, founder stories, and growth insights before everyone else.

## Brand Personality

Astrava should feel:

* Intelligent
* Curated
* Trustworthy
* Editorial
* Premium
* Sophisticated
* Minimal

Astrava should NOT feel:

* Corporate
* Agency-like
* Developer-focused
* Startup-template-like
* Overly playful
* Sales-driven

---

# Design Philosophy

## Design References

The overall quality bar should be comparable to:

* Linear
* Stripe
* Raycast
* Vercel
* Notion

Not visually copied.

Only inspiration for:

* Attention to detail
* Typography
* Motion
* Layout quality

---

# Visual Style

## Theme

Dark mode only for V1.

## Visual Keywords

* Premium
* Editorial
* Timeless
* Elegant
* Modern
* Calm

## Avoid

* Glassmorphism
* Neon effects
* Heavy gradients
* Excessive illustrations
* Generic SaaS visuals
* Crypto-style aesthetics

---

# Color System

## Background

```css
#09090B
```

## Surface

```css
#111113
```

## Secondary Surface

```css
#18181B
```

## Primary Text

```css
#FAFAFA
```

## Secondary Text

```css
#A1A1AA
```

## Accent

```css
#7C3AED
```

## Accent Hover

```css
#8B5CF6
```

---

# Typography

## Headings

Preferred:

* Geist
* Inter

Weight:

700-800

---

## Editorial Statements

Preferred:

* Instrument Serif

Used for:

* Vision section
* Quotes
* Large statements

---

## Body

Preferred:

* Inter

Weight:

400-500

---

# Landing Page Structure

---

# Section 1 — Hero

## Goal

Immediately communicate what Astrava does.

## Layout

Large centered headline.

### Headline

Helping great software products get discovered.

### Description

Discover promising software products, founder stories, and growth insights before everyone else.

### Primary CTA

Submit Product

### Secondary CTA

Join Newsletter

---

## Hero Background

Create a subtle animated network visualization.

Concept:

Products ↔ Founders ↔ Users

Implementation:

* Tiny nodes
* Thin connecting lines
* Low opacity
* Slow movement
* Elegant
* Non-distracting

The background should communicate "distribution network."

---

# Section 2 — Problem

## Heading

Most products don't fail because they're bad.

## Supporting Text

Most products fail because nobody discovers them.

Founders spend months building.

Distribution gets ignored.

Astrava exists to change that.

---

## Supporting Visual

Animated funnel visualization.

```text
1000 Products Built
      ↓
100 Seen
      ↓
10 Remembered
      ↓
1 Wins
```

Numbers should animate upward when section becomes visible.

---

# Section 3 — What Astrava Does

Three-column layout.

---

## Discover

We uncover promising software products.

---

## Analyze

We break down growth and distribution strategies.

---

## Amplify

We help great products reach new audiences.

---

Each card should contain:

* Icon
* Title
* Description

---

# Section 4 — Discovery Network

This should be the visual centerpiece of the website.

## Heading

The Discovery Network

## Description

Astrava connects founders, products, and audiences.

---

## Visualization

Interactive node graph.

Structure example:

```text
Founder A
     \
Founder B ---- Astrava ---- Users
     /
Founder C
```

Requirements:

* Nodes pulse softly
* Connections animate continuously
* Hover states reveal metadata
* Smooth motion
* High frame rate

This section should make Astrava feel larger than a simple blog.

---

# Section 5 — Audience Benefits

Three-column layout.

---

## For Founders

* Product visibility
* Launch opportunities
* Distribution

---

## For Builders

* Product discoveries
* Growth insights
* Startup intelligence

---

## For Early Adopters

* Discover new software before everyone else

---

# Section 6 — Featured Insights

Editorial content preview.

Display 3 large cards.

Examples:

* How a solo founder reached 10,000 users
* Anatomy of a successful launch
* Products worth watching this month

Purpose:

Demonstrate thought leadership.

Use placeholder content initially.

---

# Section 7 — Vision Statement

Large centered section.

Use serif typography.

Content:

We believe great products shouldn't lose to better marketing.

The future belongs to products that deserve to be discovered.

This section should feel emotional and memorable.

---

# Section 8 — Newsletter

## Heading

Stay ahead of what's next.

## Description

Get product discoveries, founder stories, and growth insights every week.

---

## Form Fields

Email

---

## CTA

Join Astrava

---

## Trust Signals

Weekly

No spam

Unsubscribe anytime

---

# Section 9 — Final CTA

Large closing section.

## Heading

Ready to get discovered?

## CTA

Submit Product

---

# Footer

Minimal.

Links:

* About
* Newsletter
* Twitter
* LinkedIn

Tagline:

Helping great software products get discovered.

---

# Motion Design System

## Philosophy

Motion should feel:

* Smooth
* Organic
* Premium
* Invisible

Never flashy.

Never gimmicky.

---

# Global Animation Rules

## Hero

Duration:

700–900ms

Animation:

```text
opacity: 0 → 1
translateY: 24px → 0
```

Stagger each line.

---

## Cards

Duration:

400ms

Animation:

```text
opacity: 0 → 1
translateY: 30px → 0
```

Stagger reveal.

---

## Scroll Animations

Trigger:

15% visibility

Animation:

```text
opacity: 0 → 1
translateY: 24px → 0
```

---

## Hover Animations

Cards:

```text
scale: 1 → 1.01
```

Buttons:

```text
translateY: -2px
scale: 1.02
```

Very subtle.

---

# Technical Requirements

## Framework

Next.js 15

App Router

TypeScript

---

## Styling

Tailwind CSS

Shadcn UI

---

## Animation

Framer Motion

GSAP only if absolutely necessary

---

## Icons

Lucide

---

## Deployment

Vercel

---

# Performance Requirements

Desktop Lighthouse:

* Performance > 95
* Accessibility > 95
* Best Practices > 95
* SEO > 95

---

# Responsive Requirements

Support:

* Mobile
* Tablet
* Desktop
* Ultrawide

The experience must feel premium on all devices.

---

# SEO Requirements

Homepage Title:

Astrava — Helping Great Software Products Get Discovered

Homepage Description:

Discover promising software products, founder stories, and growth insights before everyone else.

---

# Future Features (NOT IN V1)

Do not build:

* Authentication
* Product directory
* Product pages
* Founder profiles
* Community
* Comments
* Payments
* Search
* Dashboard

These belong to later phases.

---

# Success Criteria

A first-time visitor should immediately understand:

1. Astrava discovers software products.
2. Astrava understands distribution.
3. Astrava is trustworthy.
4. Submitting a product is valuable.
5. Joining the newsletter is valuable.

If these five outcomes are achieved, the landing page is successful.
