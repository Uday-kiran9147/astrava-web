# Astrava — Student Utility Hub
### Product Requirements Document
**Domain:** astrava.club &nbsp;·&nbsp; **Version:** v1.0 draft &nbsp;·&nbsp; **Owner:** Uday &nbsp;·&nbsp; **Last updated:** Sept 14, 2026

---

## 0. Read this first — a scope conflict to resolve

astrava.club is currently **live** as a founder-discovery / software-curation site: product curation, a submit-product funnel, a newsletter, and a few published articles on founder growth. A learning section for developers was already planned as an addition to *that* site.

This PRD describes a **different product** — a calculator/study-tool hub for students. Before building, decide one of three paths, because Google and users will both get confused if one hostname tries to be two unrelated things at once:

1. **Replace** the founder-discovery site entirely with the Student Utility Hub.
2. **Coexist** — Student Utility Hub on a subdomain or subpath (`tools.astrava.club` or `astrava.club/tools`), founder-discovery content stays where it is.
3. **Separate** — build the Student Utility Hub as its own thing, keep astrava.club as-is.

Everything below assumes the Student Utility Hub is being built as a distinct, focused product — the rest of this document is written so it works under any of the three paths above.

---

## 1. Product Vision

Astrava (Student Utility Hub) is a fast, ad-supported collection of free tools that help students calculate, study, and solve small everyday problems — built so that a user can land from Google, solve their problem in under 30 seconds, and discover one more useful tool before they leave.

Non-negotiables: no login, mobile-first, minimal JS, no unnecessary backend, SEO-friendly URLs, ads that never block the tool itself.

## 2. Problem

Students routinely search Google for small, specific tasks — "attendance percentage calculator," "CGPA to percentage," "how many classes can I miss," "convert kg to lbs," "word counter." The sites that currently rank are frequently slow, ad-choked, and poorly explained. There's room for a cleaner, faster, more trustworthy alternative.

## 3. Goals & Non-Goals

**Primary goals:** organic search traffic to genuinely useful tool pages; repeat usage; ad revenue; low infrastructure cost; a recognizable "utility" brand.
**Secondary goals:** a reusable tool-page framework for fast expansion; eventual Android companion apps for the highest-demand tools.
**Non-goals for v1:** LMS, social network, tutoring platform, AI chatbot, subscriptions, user accounts, a general news/content site.

## 4. Target Users

| Persona | Needs | Device |
|---|---|---|
| College student (17–25) | Marks, attendance, GPA/CGPA, exam prep | Android + Chrome |
| School student | Math, conversions, study timers, formulas | Android + Chrome |
| General user | Age/date calcs, percentages, conversions, typing/word tools | Mixed |

## 5. Site Structure

```
astrava.club/
├── tools/
│   ├── attendance-calculator
│   ├── cgpa-calculator
│   ├── percentage-calculator
│   ├── gpa-calculator
│   ├── age-calculator
│   ├── date-calculator
│   ├── unit-converter
│   ├── pomodoro-timer
│   ├── word-counter
│   └── typing-test
├── learn/          (mathematics, english, aptitude, programming)
└── reference/       (formulas, conversions, shortcuts)
```

## 6. V1 Feature Set

**Highest-polish tools (build first):**

| Tool | Inputs | Key outputs |
|---|---|---|
| Attendance Calculator | classes attended, total classes, target % (75/80/85/custom) | current %, classes missed/needed, max classes that can still be missed |
| CGPA Calculator | subject, credits, grade (dynamic rows) | CGPA, total credits, grade breakdown, CGPA→% conversion (formula must be configurable — institutions differ) |
| Percentage Calculator | 4 modes: X% of Y / X is what % of Y / % increase-decrease / % change | result + shown working |
| GPA Calculator | course, credits, grade; support 4.0/5.0/10-point scales | GPA, total credits, distribution |
| Age Calculator | DOB, calc date | years/months/days, next birthday, total days lived |

**Round-out tools (phase 2):** Date Calculator (difference / add / subtract days), Unit Converter (length, weight, temp, area, volume, speed, time, data), Pomodoro Timer (15/5, 25/5, 50/10, custom, with browser notifications), Word/Character Counter (fully client-side — never send user text to a server), Typing Speed Test (30s/60s, WPM, accuracy, errors), Exam Countdown (multi-exam, local storage).

**Every tool page follows the same layout:** breadcrumb → H1 + one-line description → calculator → result → "how it works" (worked example) → FAQ → related tools. This consistency is itself an SEO and UX asset — reuse one component template.

## 7. Learn & Reference Sections

**Learn:** interactive practice, not articles — question, answer field, instant check, worked explanation, difficulty levels (easy/medium/hard), subject tracks (math, English, aptitude, programming). This is what will actually lift session length and pages-per-session, which matters more for both SEO dwell-time signals and ad RPM than raw page count.

**Reference:** formula sheets, conversion tables, cheat sheets (HTML/CSS/JS, Git commands), ASCII table, Roman numerals. Cheap to build, strong long-tail search value — but see the thin-content warning in §8.

---

## 8. SEO Strategy — building this to actually compete

"Best in the world" isn't a real target you can engineer toward — it's a byproduct of consistent execution over months, and you're entering a category (calculators, converters) that already has entrenched, high-authority incumbents (omnicalculator.com, calculator.net, rapidtables.com). What *is* achievable: out-execute them on speed, UX, and precision for a defined set of tools, then win long-tail queries first and broader ones over time. Treat the checklist below as the actual, controllable levers.

### Technical foundation
- **Core Web Vitals**: target LCP < 2.5s, INP < 200ms, CLS < 0.1 — non-negotiable for a tool that needs to feel instant on a mid-range Android phone on 4G.
- HTTPS everywhere, mobile-first responsive layout, no layout shift from late-loading ads.
- Clean, flat URLs (`/tools/attendance-calculator`), canonical tags on every page, XML sitemap submitted to Search Console, sensible `robots.txt`.
- Structured data: `SoftwareApplication`/`WebApplication` schema on tool pages, `FAQPage` schema **only** where the FAQ answers genuinely distinct questions (Google has cut back how often FAQ rich results even show, so don't add schema just to game a snippet).
- `BreadcrumbList` schema for navigation, Open Graph tags for shareability.

### On-page, per tool page
- Unique `<title>` and meta description per tool (not templated boilerplate — write each one).
- One H1, then 150–300 words of genuinely explanatory content: what the calculation means, the formula, one fully worked example with real numbers. This is what separates a "tool" from a "thin page" in Google's eyes.
- 3–5 internal links to related tools, placed contextually (not just a footer dump).

### The thin-content trap
The original plan's idea of spinning up `/75-percent-attendance`, `/80-percent-attendance`, `/85-percent-attendance` as separate pages is the single biggest SEO risk in this plan. Google's helpful-content systems actively devalue near-duplicate templated pages with only a swapped number. Two safer alternatives:
1. **One page, an interactive selector** — `/tools/attendance-calculator` with target-% presets built into the UI, not separate URLs.
2. If you do want separate URLs for search-intent reasons, each one needs genuinely different content (different context, different worked examples, different FAQ) — not a mail-merge template.

### E-E-A-T signals
A real About page (who built this and why), a working Contact page, accurate Privacy Policy — required for AdSense anyway (§9), and it's also a trust signal Google's quality raters explicitly look for on tool/utility sites.

### Off-page (realistic version)
No paid link schemes — that's a Google Publisher/Search policy violation and risks a manual action. Realistic channels: Product Hunt launch, dev.to / Hashnode posts about *how* the tools were built, relevant subreddits (r/developersIndia, college-specific subreddits), being genuinely useful enough that students share links in WhatsApp/Telegram groups (this drives direct traffic which itself is a positive signal).

---

## 9. Monetization — AdSense, not AdMob

One correction that matters before you set anything up: **Google AdMob is for native mobile apps (iOS/Android). Google AdSense is for websites.** astrava.club is a website, so AdSense is the product you need here — AdMob only becomes relevant if you ship the Android companion app mentioned in the original plan's "Future" section. Both can sit under the same Google Ads account with unified reporting, so this isn't a hard fork later, just the correct tool for each surface now.

### Will it earn money?
Yes, realistically — but calibrate expectations. As of 2026, AdSense no longer has an official minimum-traffic or minimum-domain-age requirement; approval depends on original, genuinely useful content, working legal pages (About/Contact/Privacy Policy), clean navigation, HTTPS, mobile-friendliness, and compliance with Publisher Policies — automated checks first, human review second if you pass those. Google's own published criteria focus on helpful content, clear navigation, required legal pages, a mobile-friendly HTTPS site, and policy compliance rather than a hard traffic or age threshold.

Earnings, though, depend heavily on *where your traffic comes from* and *what niche it's in* — more than on raw pageviews:

- For Indian traffic, 2026 benchmark data puts technology/education content at roughly ₹165–415 RPM (revenue per 1,000 pageviews) — well below finance/insurance (₹250–830) but well above general entertainment content (₹40–165). That works out to a rough $2–5 per 1,000 Indian pageviews for a site like this.
- The bigger lever than niche is visitor geography: US/UK/EU traffic typically clears $10–25+ RPM even for a mid-tier niche like education or tech tools, versus the much lower rates typical of India-heavy traffic.
- Practical implication for this plan: tools like the unit converter, word counter, and typing test are not India-specific — writing them in globally-neutral English and targeting global long-tail queries (not just Indian college-attendance phrasing) meaningfully raises blended RPM over time.

At realistic early-stage traffic (low thousands of monthly pageviews from a new domain), expect this to be **beer-money for the first several months**, not a income stream — revenue becomes meaningful once you're consistently in the tens of thousands of monthly pageviews with a decent slice of non-India traffic.

### Ad placement (keep the ones from the original plan — they're correct)
Never above/beside the calculator inputs, never disguised as buttons, no interstitials on arrival. Suggested vertical order: header → tool → result → ad → explanation → related tools.

---

## 10. Launch Metrics — concrete targets, not just categories

| Stage | Indexed pages | Organic sessions/mo | AdSense status | Realistic monthly revenue |
|---|---|---|---|---|
| Launch (10 tools live) | 10–15 | Near 0 — new domains take time to rank regardless of technical quality | Apply once About/Contact/Privacy pages + 10 tools are live | ₹0 |
| Month 3 | 25–40 (tools + a few reference/learn pages) | Low hundreds | Approved, low-volume ads live | ₹500–2,000 |
| Month 6 | 60–100 | Low thousands | Optimizing placement/RPM | ₹2,000–8,000 |
| Month 12 | 150+ | Tens of thousands (if content + backlinks land) | Mature | Wide range — depends heavily on traffic mix by this point |

Track, don't just estimate: organic sessions and indexed-page count from Search Console; tool completion rate and time-to-result from analytics events (`tool_view`, `calculation_completed`, `related_tool_clicked`); Core Web Vitals from PageSpeed Insights / Search Console; RPM and CTR from AdSense reporting once live. Treat pageviews alone as a vanity metric — completion rate and returning-visitor rate are the ones that predict whether this compounds.

## 11. Technical Requirements

Frontend: React/Next.js (or equivalent) with TypeScript, static generation or SSR for SEO, Tailwind or similar for a fast, consistent design system. Backend: none required for v1 — every tool listed above can run entirely client-side, which keeps hosting/DB/API costs near zero and sidesteps privacy concerns (user-entered text for the word counter, for instance, should never leave the browser).

## 12. Legal & Privacy Pages (required for AdSense approval, not optional)

About, Contact, Privacy Policy (must disclose ad-cookie usage), Terms of Use, and a cookie-consent notice — India's DPDP Act and most ad networks' consent requirements both expect this even for a no-login site.

## 13. Launch Phases

1. **Foundation** — design system, homepage, nav, SEO architecture, shared tool-page component, analytics, ad-placement framework, legal pages.
2. **Core tools** — the five highest-polish tools from §6.
3. **Round-out tools** — the remaining five.
4. **SEO expansion** — Learn/Reference content, only where each page adds genuinely differentiated value (see §8 thin-content warning).

## 14. V1 Acceptance Criteria

- [ ] Homepage + all 10 core tools work on mobile and desktop
- [ ] No account required anywhere
- [ ] Calculations verified accurate against known examples
- [ ] Every tool page has unique title/meta/H1 and passes Core Web Vitals thresholds
- [ ] Sitemap submitted, internal linking in place
- [ ] About/Contact/Privacy/Terms pages live
- [ ] Analytics events firing correctly
- [ ] AdSense application submitted only after the above are done
- [ ] Ads verified to never overlap or block calculator inputs

## 15. Open Questions

- Resolution of the §0 conflict with the existing founder-discovery site.
- India-first vs. global-first framing for the globally-relevant tools (affects RPM, per §9).
- Whether the CGPA→percentage formula should support multiple institutional conventions from day one or start with one and expand.

---
*Sources referenced for §8–§9: Google AdSense's published 2026 approval guidance and 2026 India/global AdSense RPM benchmark data (innopanda.com, upgrowth.in, adstimate.com).*
