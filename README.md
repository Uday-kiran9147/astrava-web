# Astrava Club

This is a [Next.js](https://nextjs.org) project for **Astrava Club** — India's private founder network.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses Google Fonts (`Playfair Display`, `DM Sans`, `JetBrains Mono`) as specified in the design brief.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Project Brief

Below is the original project brief for Astrava Club.

<details>
<summary>View Original Brief</summary>

# Astrava Club — Complete Landing Page Brief
> Hand this entire document to an AI agent to build the landing page.

---

## 1. PRODUCT OVERVIEW

**Product name:** Astrava Club  
**Domain:** astrava.club  
**Tagline:** India's private founder network. Invite only.  
**One-line pitch:** A curated, members-only community for Indian founders who are actively building — no noise, no fluff, no spectators.  
**Stage:** Pre-launch waitlist page (not a full app yet)  
**Primary goal of landing page:** Collect waitlist signups + communicate exclusivity  
**Secondary goal:** Attract the first 25 founding members at ₹4,999/year

---

## 2. TARGET AUDIENCE

**Primary:** Indian startup founders with a live product or ₹10L+ raised  
**Secondary:** Early-stage builders, indie hackers, bootstrapped SaaS founders  
**NOT for:** Job seekers, students without a live product, wannapreneurs  
**Geography:** India (metros + tier-2 cities)  
**Age:** 22–40  
**Mindset:** Builder > talker. Ships > talks about shipping.

---

## 3. BRAND IDENTITY

### Brand Personality
- **Premium but not arrogant** — like a well-run private members club, not a VC fund
- **Serious but warm** — this is a space for real talk, not corporate networking
- **Exclusive but not elitist** — merit-based, not connections-based
- **Indian but globally minded** — proud of building in India, not limited by it

### Brand Voice
- Direct. No filler words.
- Confident, not boastful.
- Speaks founder-to-founder, not brand-to-customer.
- Uses Indian context naturally (mentions ₹, mentions Bengaluru/Mumbai/Delhi, references real Indian startups).

### Color Palette
```
Primary background:   #0A0A0A  (near black — dark luxury feel)
Secondary background: #111111  (card surfaces)
Accent gold:          #C9A84C  (warm gold — premium signal)
Accent gold light:    #E8C96A  (hover states, highlights)
Text primary:         #F5F0E8  (warm white — not harsh pure white)
Text secondary:       #8A8378  (muted warm gray)
Text tertiary:        #4A4540  (very muted, hints)
Border:               #222018  (subtle warm dark border)
Border accent:        #3A3020  (slightly visible borders)
Success green:        #2D6A4F  (for "✓ verified" badges)
```

### Typography
```
Display font:    "Playfair Display" — Google Fonts (for hero headline, section titles)
                 Weights: 400 italic, 700, 900
Body font:       "DM Sans" — Google Fonts (for all body copy, UI elements)
                 Weights: 300, 400, 500
Mono font:       "JetBrains Mono" — Google Fonts (for stats, numbers, badges)
                 Weights: 400, 600
```

### Logo / Wordmark
```
Text: "ASTRAVA"
Style: All caps, wide letter-spacing (0.25em), Playfair Display 700
Beside it: "CLUB" in DM Sans 300, smaller, muted gold color
Combined: "ASTRAVA  CLUB" with a thin vertical divider between them
Optional: Small geometric diamond shape ◆ as icon mark before the wordmark
```

### Overall Aesthetic Direction
**Dark luxury editorial** — Think Soho House meets a private equity firm's website.  
Dark backgrounds. Warm gold accents. Generous white space. Serif display type with clean sans body.  
NO gradients. NO neon. NO purple. NO generic startup blues.  
Texture: Subtle grain overlay on the hero (CSS noise or SVG filter). Makes it feel premium, not flat.

---

## 4. PAGE STRUCTURE & COPY

Build the page as a single-scroll landing page with these sections in order:

---

### SECTION 1 — NAVBAR

**Left:** `◆ ASTRAVA  CLUB` wordmark (gold)  
**Right:** Two items — `"For Founders"` (text link, muted) + `"Join Waitlist →"` (small gold outlined button)  
**Style:** Fixed top, transparent with blur backdrop. Very minimal. No heavy borders.

---

### SECTION 2 — HERO

**Layout:** Full viewport height. Centered content. Subtle grain texture on background.

**Eyebrow text (small, uppercase, gold, wide tracking):**
```
INVITE ONLY · PRIVATE NETWORK · INDIA
```

**Headline (large, Playfair Display, warm white):**
```
Where India's real
founders come to
think out loud.
```
*(The word "real" in gold italic)*

**Subheadline (DM Sans 300, muted, max-width 520px, centered):**
```
Astrava Club is a private network for founders with a live 
product and a real problem to solve. No pitch decks. 
No posturing. Just honest conversations.
```

**CTA buttons (two, stacked or side by side on desktop):**
- Primary: `Apply for Membership →` — gold background, dark text, rounded pill
- Secondary: `See What's Inside ↓` — transparent, gold border, gold text

**Below CTA — social proof strip (small, muted):**
```
180+ founders on waitlist · 25 founding member spots remaining
```

**Below that — animated marquee of real Indian founder names / companies scrolling slowly:**
```
Zerodha · Wingify · CRED · Zepto · boAt · Sugar Cosmetics · Lenskart · Razorpay · Groww · BrowserStack · Freshworks · Mamaearth · Meesho · Slice
```
*(Just as inspiration logos — do not imply endorsement. Render as text in mono font, muted gold, scrolling left)*

---

### SECTION 3 — THE PROBLEM

**Layout:** Full width, dark card background (#111). Centered text. Large.

**Section eyebrow:** `THE PROBLEM`

**Headline:**
```
Every founder community
looks the same.
```

**Three-column cards below (or stacked on mobile):**

Card 1 — Icon: 💬 (render as emoji or Lucide icon)
```
Title: 300-person WhatsApp groups
Body: 2 people respond. The rest are lurkers waiting to pitch their startup.
```

Card 2 — Icon: 🎪
```
Title: Networking events
Body: Sponsored by a coworking space. Everyone has a pitch deck. Nobody has a real problem.
```

Card 3 — Icon: 🏆
```
Title: LinkedIn "communities"
Body: Mostly people posting fundraise announcements and congratulating each other.
```

**Bottom statement (large, bold):**
```
"Astrava Club was built because none of these 
worked for founders who are actually building."
```

---

### SECTION 4 — WHAT'S INSIDE (FEATURES)

**Section eyebrow:** `INSIDE THE CLUB`

**Headline:**
```
Everything a founder 
actually needs.
```

**Six feature blocks in a 2x3 grid (or 3x2 on desktop):**

Feature 1:
```
Icon: profile silhouette
Title: Founder Profiles
Body: Verified profiles with your live product, traction metrics, and what you're working on right now. No fake follower counts.
```

Feature 2:
```
Icon: grid/showcase
Title: Startup Showcase
Body: Feature your startup to a room of founders, angels, and operators who actually read it.
```

Feature 3:
```
Icon: handshake/connect
Title: Investor Matching
Body: When you're ready, we introduce you directly. No cold emails. No LinkedIn spray-and-pray.
```

Feature 4:
```
Icon: users/team
Title: Hiring Board
Body: Post roles to a network of builders. Find your technical co-founder, first engineer, or growth hire.
```

Feature 5:
```
Icon: microphone/audio
Title: Weekly Founder Rooms
Body: Private audio rooms every week. Real conversations about real problems — runway, pricing, product bets.
```

Feature 6:
```
Icon: newspaper/digest
Title: Founder Digest
Body: Weekly roundup of the most interesting Indian startup stories, curated by founders, for founders.
```

---

### SECTION 5 — FOUNDER STORIES (SOCIAL PROOF)

**Section eyebrow:** `REAL STORIES`

**Headline:**
```
The founders we write about.
The kind who belong here.
```

**Two featured story cards, side by side:**

Story Card 1:
```
Label: BOOTSTRAPPED EXIT
Company: Wingify
Founder: Paras Chopra
Metric: ₹1,660 Cr exit · Zero funding raised · 15 years
Quote: "His goal was ₹50,000 a month. He built a ₹1,660 crore company instead."
Tag: ◆ Featured in Astrava Club Digest
```

Story Card 2:
```
Label: BOOTSTRAPPED UNICORN
Company: Zerodha
Founder: Nithin Kamath
Metric: ₹15,000 Cr valuation · Zero ads · Zero VC
Quote: "Built India's largest broker with ₹30 lakh of personal savings and zero advertising spend."
Tag: ◆ Featured in Astrava Club Digest
```

**Below cards — small text:**
```
Stories like these, every week. Only for members.
```

---

### SECTION 6 — MEMBERSHIP TIERS (PRICING)

**Section eyebrow:** `MEMBERSHIP`

**Headline:**
```
Two ways in. 
One waitlist.
```

**Two pricing cards:**

Card 1 — FOUNDING MEMBER (featured/highlighted with gold border):
```
Badge: "25 SPOTS ONLY"
Name: Founding Member
Price: ₹4,999/year
Crossed-out regular price: ₹9,999/year
Description: Lock in the lowest rate ever. Founding members shape what Astrava Club becomes.
Includes:
  ✓ Full community access
  ✓ Founder profile + startup showcase
  ✓ Weekly founder rooms
  ✓ Investor matching (when ready)
  ✓ Hiring board
  ✓ Weekly digest
  ✓ Founding member badge (permanent)
  ✓ Direct access to founding team
CTA Button: "Apply as Founding Member →"
Urgency: "14 of 25 spots remaining"
```

Card 2 — CLUB MEMBER:
```
Name: Club Member
Price: ₹9,999/year
Description: Full access to everything Astrava Club offers, when doors reopen.
Includes:
  ✓ Full community access
  ✓ Founder profile + startup showcase
  ✓ Weekly founder rooms
  ✓ Investor matching (when ready)
  ✓ Hiring board
  ✓ Weekly digest
CTA Button: "Join Waitlist →"
Note: "Doors reopen after founding cohort fills"
```

**Below pricing — trust line:**
```
No auto-renewals without notice. Cancel anytime. Founding member rate locked for life.
```

---

### SECTION 7 — APPLICATION CRITERIA

**Section eyebrow:** `WHO GETS IN`

**Headline:**
```
This isn't for everyone.
That's the point.
```

**Layout:** Two columns — "We're looking for" and "This isn't for"

**Left — ✓ green checks:**
```
✓ Founders with a live product (doesn't need to be profitable)
✓ Founders who've raised ₹10L+ (doesn't need to be VC)
✓ Solo builders with paying customers
✓ Second or third-time founders
✓ Operators who've led significant teams at startups
```

**Right — ✗ red crosses:**
```
✗ People building their "first MVP" with no users yet
✗ Founders who primarily network for intros, not value
✗ Agency owners without a product business
✗ Students without a live company
✗ Anyone here to pitch, not to help
```

**Bottom note (italic, muted):**
```
Applications are reviewed manually. We reply within 48 hours.
```

---

### SECTION 8 — WAITLIST FORM

**Section eyebrow:** `JOIN THE WAITLIST`

**Headline:**
```
Apply for membership.
```

**Subtext:**
```
Tell us about what you're building. We review every application personally.
```

**Form fields:**
```
1. Full Name (text input)
2. Email address (email input)
3. LinkedIn profile URL (text input)
4. What are you building? (textarea, max 280 chars)
5. Current traction (dropdown):
   - Pre-revenue, but have users
   - ₹0–5L MRR
   - ₹5–25L MRR
   - ₹25L+ MRR
   - Raised funding (any stage)
6. How did you hear about Astrava Club? (text input, optional)
```

**Submit button:**
```
Text: "Submit Application →"
Style: Full-width gold button, large, with subtle hover animation
```

**Below form:**
```
Small text: "We'll reply within 48 hours. Your information is never shared."
```

---

### SECTION 9 — FAQ

**Section eyebrow:** `FAQ`

**Headline:** `Straight answers.`

**5 FAQ items (accordion or stacked):**

```
Q: Is this just another WhatsApp group?
A: No. Astrava Club has structured founder profiles, a startup showcase, a hiring board, investor matching, and weekly moderated founder rooms. WhatsApp groups don't vet members or create structured value. We do.

Q: What happens after I apply?
A: We review your application manually — usually within 48 hours. If you're a fit, we send you a payment link for the founding member rate. If we're not sure, we might ask a follow-up question.

Q: What if I'm pre-revenue?
A: We look at the full picture. Pre-revenue founders with real users and a clear market thesis get in. Pre-revenue founders with an idea and no execution don't — yet.

Q: Do I need to be based in a metro city?
A: No. Astrava Club is India-wide. Some of the best builders we know are in Pune, Jaipur, Kochi, and Ahmedabad.

Q: Can I cancel my membership?
A: Yes, anytime. Founding members keep their locked rate for as long as they stay active. There are no auto-renewals without advance notice.
```

---

### SECTION 10 — FOOTER

**Layout:** Clean, minimal, dark.

**Left:** `◆ ASTRAVA  CLUB` wordmark  
**Center:** `India's private founder network.`  
**Right links:** `Twitter/X` · `LinkedIn` · `Contact`  
**Bottom line:** `© 2025 Astrava Club · astrava.club · All rights reserved`

---

## 5. DESIGN SPECIFICATIONS

### Spacing System
```
Base unit: 4px
Common spacings: 8, 12, 16, 24, 32, 48, 64, 96, 128px
Section vertical padding: 96px top and bottom (64px mobile)
Max content width: 1140px
Card padding: 32px
```

### Border Radius
```
Buttons: 999px (full pill)
Cards: 12px
Inputs: 8px
Badges: 999px
```

### Shadows
```
Card shadow: 0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)
Gold glow (on primary CTA): 0 0 24px rgba(201, 168, 76, 0.25)
```

### Buttons
```
Primary CTA:
  Background: #C9A84C
  Text: #0A0A0A (dark)
  Padding: 14px 28px
  Font: DM Sans 500
  Border-radius: 999px
  Hover: background #E8C96A, slight scale(1.02)

Secondary CTA:
  Background: transparent
  Border: 1px solid #C9A84C
  Text: #C9A84C
  Same padding/radius
  Hover: background rgba(201,168,76,0.1)
```

### Form Inputs
```
Background: #111111
Border: 1px solid #3A3020
Border on focus: 1px solid #C9A84C
Text: #F5F0E8
Placeholder: #4A4540
Border-radius: 8px
Padding: 12px 16px
Font: DM Sans 400, 15px
```

### Cards
```
Background: #111111
Border: 0.5px solid #222018
Border-radius: 12px
Padding: 28px 32px
On hover: border-color #3A3020, slight translateY(-2px)
Transition: all 200ms ease
```

### Animations
```
Hero entrance: Fade up with staggered delay (eyebrow → headline → subheadline → CTA → strip)
Each element: opacity 0 → 1, translateY(20px) → 0
Duration: 600ms, ease-out
Stagger: 150ms between elements

Marquee: Infinite horizontal scroll, left direction, 40s duration, linear

Card hover: translateY(-2px), 200ms ease

CTA hover: scale(1.02), box-shadow increase, 150ms ease

Scroll reveal: Sections fade up as they enter viewport (IntersectionObserver)
```

### Grain Texture (Hero)
```css
/* Apply this pseudo-element over the hero section */
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.035;
  pointer-events: none;
}
/* OR use CSS filter: contrast() brightness() on a generated noise div */
```

---

## 6. MOBILE RESPONSIVENESS

```
Breakpoints:
  Mobile:  < 640px
  Tablet:  640px – 1024px
  Desktop: > 1024px

Mobile adjustments:
  - Hero headline font-size: 36px (desktop: 64px)
  - Section padding: 64px vertical
  - All grids → single column
  - Pricing cards → stacked, full-width
  - Navbar → hamburger menu (simple toggle)
  - Marquee → keep as-is (works well mobile)
  - Form → full-width fields
```

---

## 7. TECHNICAL STACK RECOMMENDATION

```
Framework:     Plain HTML + CSS + Vanilla JS   (simplest, fastest to deploy)
               OR Next.js (if SSR/SEO needed)
               OR Astro (for static performance)

CSS:           Custom CSS with variables (no Tailwind required, but fine if preferred)
Fonts:         Google Fonts CDN (Playfair Display, DM Sans, JetBrains Mono)
Icons:         Lucide Icons (CDN) or simple SVG inline icons
Animations:    CSS keyframes + IntersectionObserver for scroll reveals
Form backend:  Formspree.io (free tier, no backend needed) OR Netlify Forms
Hosting:       Vercel / Netlify (free tier is fine for landing page)
Analytics:     Plausible or simple Umami (privacy-first, fits the brand)
```

---

## 8. SEO & META

```html
<title>Astrava Club — India's Private Founder Network</title>
<meta name="description" content="A curated, invite-only network for Indian founders who are actively building. No noise. No fluff. Apply for founding membership." />
<meta property="og:title" content="Astrava Club — India's Private Founder Network" />
<meta property="og:description" content="Private founder community for Indian builders. Invite only. 25 founding member spots." />
<meta property="og:image" content="/og-image.png" />  <!-- Dark card with gold wordmark -->
<meta property="og:url" content="https://astrava.club" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="theme-color" content="#0A0A0A" />
```

---

## 9. OG IMAGE SPEC

```
Size: 1200 × 630px
Background: #0A0A0A
Center: "◆ ASTRAVA  CLUB" in gold
Below: "India's private founder network. Invite only."
Bottom right corner: "astrava.club" in muted text
Style: Minimal, dark luxury
```

---

## 10. WHAT NOT TO DO (HARD RULES FOR THE AI AGENT)

```
✗ No purple gradients anywhere
✗ No light/white background (entire site is dark)
✗ No Inter or Roboto fonts
✗ No generic SaaS blue (#0066FF type colors)
✗ No hero illustrations or 3D graphics
✗ No stock photos of people
✗ No confetti animations or playful micro-interactions
✗ No fake testimonials or headshots (no testimonial section at all)
✗ No heavy borders everywhere
✗ No cookie popup (not collecting cookies beyond form)
✗ No chat widget
✗ Do not imply Zerodha/Wingify/CRED are members or partners
   (they appear only in "stories we feature" context)
```

---

## 11. FOLDER STRUCTURE (SUGGESTED)

```
astrava-club/
├── index.html
├── styles/
│   ├── main.css
│   ├── components.css
│   └── animations.css
├── scripts/
│   └── main.js
├── assets/
│   ├── og-image.png
│   └── favicon.ico
└── README.md
```

---

## 12. FORM SUBMISSION BEHAVIOR

```
On submit:
  1. Validate all required fields (name, email, LinkedIn, building, traction)
  2. Show loading state on button ("Submitting...")
  3. Send to Formspree endpoint (or Netlify Forms)
  4. On success: Replace form with success message:
     ────────────────────────────────
     ◆ Application received.
     
     We'll review it and reply within 48 hours.
     In the meantime, follow us on LinkedIn and X
     to get early access to founder stories.
     
     [Follow on LinkedIn →]  [Follow on X →]
     ────────────────────────────────
  5. On error: Show inline error message in gold/red
```

---

*End of brief.*
</details>