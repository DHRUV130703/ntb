# NOT TO BRAG® — website

This repo builds the website for **NOT TO BRAG** (NTB), an independent creative, marketing and
technology agency based in Mumbai. Live domain: **nottobrag.app**.

**Keep this file current.** Whenever the founders share new information (copy, people, links,
decisions, domains, credentials setup), update this file and the matching note in Claude's memory
in the same turn.

## Knowledge base

- Full website copy, FAQ, SEO and brand rules: [docs/website-content.md](docs/website-content.md).
  It is the source of truth. The site's copy lives in `client/src/content/site.js` and must match it.
- Positioning line: *Creative thinking. Intelligent technology. Meaningful growth.*
- Philosophy: *We don't just create ideas. We help turn them into something meaningful for businesses.*
- Three capabilities: **01 Creative & Marketing**, **02 Creators & Collaborations**,
  **03 AI & Business Intelligence**.
- **Sales kit** (2026-11-26): [docs/sales/README.md](docs/sales/README.md): offer menu with 6
  packages + Growth Audit entry offer (**Content & Social / social media management is NOT offered
  for now**, founders 2026-11-26: keep it out of the pitch deck/PDF, sales docs and emails. **Only the PDF
  was changed on request; the website and Instagram posts still list it. Don't remove it there until
  the founders say so.**) ([offers.md](docs/sales/offers.md), prices are `[₹__]`
  placeholders until the founders set them; ranges there are suggestions), outreach emails/DMs,
  discovery script, objections, proposal template, pipeline. Pitch deck = Slides artifact
  https://claude.ai/artifact/Qe1X9x4v5g812mcZsGM92i (15 slides, talk track in speaker notes).
- Instagram launch posts (teaser, reveal carousel, founders carousel): `out/instagram/post1–3`.
- Site structure (v2, see "Redesign v2"): **one scrolling page** + a Contact drawer. The copy deck's
  six "pages" become chapters of that page; deep detail lives in drawers, not new pages.

### Founders (both 23)

| Founder | Role | Email | Phone |
|---|---|---|---|
| Riddhi | Founder, **Creative Strategy & Partnerships** | riddhi@nottobrag.org | +91 93725 15440 |
| Dhruv | Founder, **AI Solutions & Business Automation** | dhruv@nottobrag.org | +91 89286 51938 |

Titles confirmed by the founders on 2026-11-23 (they replace "Creative & Marketing" / "Technology & AI"
for the people; the capability names stay as they are). Fields: `role`, `title`, `short` in
`founders` in `content/site.js`.
Photos: `client/public/images/founders/riddhi.jpg`, `dhruv.jpg` (real photos supplied by founders).

### Contact details

- Instagram: [@not.tobrag_](https://instagram.com/not.tobrag_)
- LinkedIn: **not supplied yet** (placeholder hidden until provided)
- Location: Mumbai, India | Working with businesses beyond borders.

### Brand rules (non-negotiable)

1. Never invent client names, testimonials, awards or performance statistics.
2. Label concept work as **CONCEPT PROJECT**; keep it separate from commissioned work.
3. Use real founder photos and real work.
4. Never promise guaranteed leads, sales, engagement or automation outcomes.
5. Describe AI by concrete business applications, no "revolutionise" hype.
6. Every service section needs a clear enquiry link.
7. Copy: confident, human, clear, professional.
8. Any demo numbers (e.g. the order dashboard on the AI section) must be visibly marked as demo data.

## Redesign v2 — spec (status: APPROVED and BUILT 2026-11-21)

Code map: `client/src/pages/Home.jsx` (all chapters), `components/Nav.jsx` (glass groups +
dropdown), `components/FloatingStack.jsx` (cookie + status cards), `components/Sheets.jsx`
(contact / service / founder drawers), `components/Visuals.jsx` (CSS mockup objects),
`components/Demos.jsx` (workflow + order dashboard), `state/ui.jsx` (sheet + consent state;
consent key `ntb-consent` in localStorage; Vercel Analytics injected only after "Accept all" in
production — **Web Analytics must be enabled in the Vercel dashboard** for data to appear).
Short chapter copy lives in `story` / `chapters` at the end of `content/site.js`.

v1 (six pages, every list shown at once, giant type everywhere) was rejected as "all over the
place". v2 is designed the way vs-goods.store is: one confident page, few words per screen,
detail only when the visitor asks for it.

### Principles

1. **One page, one story.** Home is the whole site. No page-to-page jumping. Contact, service
   detail and founder detail open as drawers/sheets over the page; closing returns you to where
   you were. Old URLs (`/what-we-do`, `/about`, `/approach`, `/work`, `/contact`) redirect to the
   matching chapter or open the drawer, so links never 404.
2. **Progressive disclosure.** Each chapter says one thing in ≤ 2 lines. Service lists, process
   detail and FAQ sit behind a click (drawer, hover preview, accordion). Never more than ~40 words
   of body copy visible per screen.
3. **Restraint in type.** Headlines 30–56px, medium weight, sentence case. Only two moments are
   huge: the uppercase starting-point list and the footer wordmark.
4. **Objects, not paragraphs.** Ideas are carried by cards: product-style cards, tilted floating
   cards, pill chips with avatars, a sticky status card. Copy labels the objects.
5. **One action everywhere:** "Let's Talk" opens the Contact drawer from any point on the page.

### Narrative (chapters on the single page)

| # | Chapter | What the visitor sees (vs-goods pattern it borrows) | Copy shown |
|---|---|---|---|
| 0 | **Nav** | Glassy translucent pill groups: left `Menu [+]` + "Work with us"; centre NTB mark + wordmark; right "Let's Talk". Menu opens a **small stacked dropdown of white rows** under the button (not full-screen), jumping to chapters. | — |
| 1 | **Hero** (v2.7 "moving wall", 2026-11-23; copy unchanged, layout chosen by founders after the cream page + single right-hand card felt plain) | Copy stays: "Not to brag, but we [chip]" with the chip flipping every 2.6s through *build brands* (terracotta) / *find creators* (pink) / *ship AI agents* (periwinkle) / *make dashboards* (green), the 4-segment green progress bar, Let's Talk + tagline. **Layout:** everything centred; above and below it two endless rows of tilted work objects (brand board, reel, creator shortlist, AI chat, AI step, weekly report, from `Visuals.jsx`) scroll in opposite directions with faded edges. Objects matching the active phrase light up (full colour, scale 1); the rest dim and desaturate. Hovering a row pauses it; clicking an object opens that service drawer. Reduced motion: rows still, chip doesn't auto-rotate. Phones: smaller tiles (mockups scaled with `zoom`), headline on 2 lines + chip, segments 2×2. Tiles defined in `WALL_TILES` in `Home.jsx`. | "Not to brag, but we …" + tagline + Let's Talk. |
| 2 | **Three capabilities** | Horizontal rail of 3 large product-style cards (visual on top, white info strip with title + one line + coloured tag). Click → **service drawer** (v2.2, after founders called the first version cluttered): accent-coloured header with the mockup + "01 / 03", tag, one headline (≤30px) and one lead line, then service groups as **pill tabs** (v2.3, replaced the accordion which still felt boxy: one tab per group, active = ink pill, row scrolls with a faded edge) over **one clean numbered list** with hairline dividers (no boxes, counts or bullet dots), "Next: 02 …" to move between capabilities without closing, and the enquiry button **docked** at the bottom. No pill clouds. | Title + one line each. Lists only in drawer rows. |
| 3 | **Pick a starting point** | Centred uppercase list, grey → ink on hover, a small preview card follows the cursor (like "MOCKUP LIBRARY"). BRANDING · CONTENT · CREATORS · AI AGENTS · DASHBOARDS. Click opens Contact drawer pre-filled. | Eyebrow "Where should we start?" |
| 4 | **Why NTB** | Charcoal section; 4 tilted cards float/settle on scroll (like the awards cards). One short line under it. | Card titles only: "A creative perspective." etc.; line: "Because good ideas deserve better execution." |
| 5 | **AI, shown not told** | Two big highlight cards side by side (like "Branding In Motion / Flowforms"): left an animated workflow (form → AI qualify → CRM → notify); right the live order dashboard, labelled **DEMO DATA**. | Tag + title per card. Implementation steps hidden behind "How we build it" toggle. |
| 6 | **How we work** | One row of 5 compact numbered steps (Discover → Optimise); hover/tap reveals the sentence. Engagement types as small pill chips beneath. | Step names only by default. |
| 7 | **The founders** (v2.6, superseded by v6 below; 2026-11-23; founders picked it after rejecting big portrait cards and the group-chat version) | **One typographic sentence**, same language as the hero: "Not to brag, but [● Riddhi] makes brands impossible to overlook, and [● Dhruv] builds the systems that make businesses work smarter." Names are tilted accent pill chips with a tiny round avatar inside (`story.team.sentence` holds the text parts). Hover/focus a chip (desktop) → small popover card under it: avatar, name, title, `short` line, "Talk to {name}" split button (Contact pre-routed) + email + call; Dhruv's opens toward the left. Touch/phones: tap a chip → same card as a bottom sheet with ✕; tap outside or Esc closes. Under the sentence: "Two 23-year-olds…" line + a small hint pill ("Hover/Tap a name to reach them directly"). **Rule: photos stay small (avatars), never hero-sized.** | One sentence + one line. |
| 8 | **Closing + footer** | Charcoal footer: "Have something in mind?" + Let's Talk; huge "NOT TO BRAG®" wordmark across full width between thin rules; corners: emails (left), Instagram/LinkedIn (right), "Manage cookies", ©. FAQ as a compact accordion just above the footer. | — |
| 9 | **Floating card stack** (persistent, bottom-right, closable) | Like vs-goods' "Now or never" card: "Now taking on projects · Book a call" with both founders' avatars and a split button → Contact drawer. Sits under the cookie card on first visit. | 1 line. |

**Work/portfolio:** no fake work. Until real projects exist, there is no Work chapter; the
capability cards carry the visuals. When projects arrive they become a horizontal rail in chapter 2.5.

### Contact drawer

Slides in from the right over a dimmed page. Step 1: four big choice cards ("What are you looking
for?"). Step 2: short form (name, brand, email, phone optional, message) with a line showing who
will read it ("Goes straight to Riddhi"). Success state in-drawer. Same `/api/contact` routing.

### Cookie consent (as vs-goods)

Pink card (`#EBA6D9`), headline "We use" + black tilted chip "Cookies", two split buttons
"Accept all" / "Reject non-essential", small line with "preferences" link. Shown bottom-right on
first visit, stacked above the status card. Choice stored in localStorage; "Manage cookies" in the
footer reopens it. **Only meaningful if we load something non-essential**: plan is Vercel Web
Analytics, loaded only after "Accept all". If the founders don't want analytics, drop the banner.

### Visual system

- Canvas `#DAD1C3` (warm sand, same family as vs-goods), paper `#F7F5F2`, ink `#222423`,
  brand olive `#6C6847` (hero, accents), cream `#F1E6D8`.
- Accents (tags, chips, cards), used sparingly: pink `#EBA6D9`, periwinkle `#6B7CF0`,
  green `#86D98A`, terracotta `#EE7A55`.
- Type: Figtree Variable (Roobert stand-in), weight 500 for headings, 400 body. Scale: 13 (labels,
  uppercase tags), 15–16 (body), 20, 30, 44, 56; display only for list + footer.
- Radius 12 (buttons, small cards), 20 (big cards). Glass: `rgba(255,255,255,.55)` + 18px blur.
- Buttons: split button (label cell + arrow cell `⏎`), dark / light / glass variants.
- Motion: slow drift in hero, cards settle with spring easing on scroll, hover lift ≤ 4px,
  everything off under `prefers-reduced-motion`.
- Mobile first-class: rails swipe, drawers become bottom sheets, cursor preview disabled.

### Reference notes

- Look and interaction reference: https://vs-goods.store/ (studied 2026-11-21 at 1440px).
- AI visuals reference: https://dhruv-studio.vercel.app/ (workflow nodes, order dashboard).
- Logo assets: `client/public/brand/` (NTB mark in cream/ink/olive). Gmail/Workspace logo exports
  in `out/`.

## Proposal v3 — jeppesen.dev direction (status: APPROVED and BUILT 2026-11-23; supersedes the v2 chapter table above where they differ)

Code map (v3): `pages/Home.jsx` sections Hero → Statement → Services → Beliefs → AiFeature →
ProcessLine → Founders → Closing, plus `useScrollProgress(ref, {start, end})` that drives the
statement words, the pinned beliefs band and the process line. Copy for new sections lives in `v3`
in `content/site.js`. Clash Grotesk is loaded from Fontshare in `client/index.html`
(`--display`). Paper grain = `body::after` SVG noise. Old sections (capability rail, start list,
tilted why-cards, AI duo, step cards, FAQ section) were removed; FAQ now sits in the Contact
drawer under "Questions first?".

**v3.1 fixes (2026-11-23, after founder review):**
- Hero: the big NTB mark on the right "didn't make sense" → removed. The mark now only plays as a
  ~1.5s **preloader** (slices lock together, panel slides up; once per session via
  sessionStorage `ntb-intro-seen`, skipped under reduced motion). Hero = editorial headline across
  the width ("**Not to brag,** but we" on one line, chip below) + a hairline **bottom bar**:
  lead line | four phrase segments | Let's Talk.
- Beliefs: grid + title + big line repeated the same sentence → now **one belief per screen**:
  pinned dark band, eyebrow + "03 / 06" counter, one huge line, six progress bars, small footer
  line "Because good ideas deserve better execution."
- Footer: giant personal emails were "completely wrong" → one big contact line "Tell us what
  you're building →" (opens Contact) + founders listed small with name, title and email; base row
  has ©, location, Instagram, Manage cookies, Back to top.

**v5 (2026-11-23, current): hero back to the chip headline + the v4 list moved to Services.**
- Hero = jeppesen preloader, then left-aligned "**Not to brag,** but we" + flipping chip + bottom
  bar (lead | four phrase segments | Let's Talk) on a **grid background**. The empty top area holds
  **floating sticker tags** (`STICKERS` in Home.jsx: Brand strategy, Visual identity, Reels &
  content, UGC campaigns, Creator shortlist, AI shopping assistant, Voice agents, Live dashboard,
  Weekly reports) that drift gently; the ones belonging to the current phrase fill with its accent.
  Phones: 4 stickers in a band above the headline.
  **No eyebrow line above the headline** (founders removed "Independent creative & technology
  studio · Mumbai" on 2026-11-23: "absolutely no need of this").
- (Superseded by v6, see below.) Services = the v4 vs-goods list via the reusable `HangingList` component: six services in giant
  uppercase on a grid, active line ink, hanging preview card (mockup + caption bar with the three
  bullets), auto-cycles while on screen, hover takes over, click opens the service drawer, plus
  "Not sure where to start? Let's talk".

**Mobile pass (2026-11-23):** audited 375 / 414 / 768. No horizontal overflow anywhere; hero
phrase tabs and footer links have ≥44px tap targets; slim two-button cookie card on phones (no
paragraph); stickers anchored with `translate: calc(var(--x) * -1%)` so they never overflow;
statement and closing get less vertical padding; AI card shows only the dashboard on phones.

**v6 (2026-11-26, current for Services, Founders and the nav menu).** The founders called the
giant services list with a card hanging over the text "too messy" on mobile and laptop, the
"Menu" text button unnecessary, and the founders sentence (name chips, hover popovers, split NTB
mark) "over the top". They picked these concepts from three options each:
- **Services = calm list + one preview card** (`Services` in Home.jsx, classes `svlist*`):
  numbered rows with the service name and an arrow; the active row gets a 4px accent bar. On
  laptops a sticky card on the right (mockup on the service colour, three plain lines, an
  "Explore {service}" button); hovering a row picks it and clicking opens the service drawer. On
  phones/narrow windows (<900px) the picked row opens the same card inline (tap to switch; the
  Explore button opens the drawer). No auto-cycling, nothing overlaps. `HangingList` is gone.
- **Founders = two simple cards** (`Founders`, classes `fcard*`): small round tight-crop avatar
  (`avatar` in `founders`, files `client/public/images/founders/*-avatar.jpg`; the full photos
  stay for the founder drawer), name, title, one line, "Talk to {name}" (Contact drawer
  pre-routed) + mail and call icon buttons. Title/lead lines come from `story.team`. The old
  chips, popovers, `fmark` and `story.team.sentence` use are removed (the data is still in
  site.js). **Photos stay avatar-sized.**
- **Nav: hamburger icon** instead of the "Menu" text (3 lines that turn into a cross; same small
  dropdown panel; `aria-label` Open/Close menu). On phones/touch the nav controls and menu rows are
  44px tall.

**Safari / WebKit pass (2026-11-23):** tested section by section in Playwright WebKit vs Chromium
(1440 and 390). Rules that came out of it:
- **Never use `text-wrap: pretty`.** In WebKit it crashed the page at phone width when the
  statement's words re-render on scroll ("A problem repeatedly occurred" on iPhone). `balance` on
  headings is fine.
- `:hover` rules live inside `@media (hover: hover)` so taps on iPhone/iPad don't leave hover stuck.
- Drawer scroll lock sets `overflow: hidden` on both `<html>` and `<body>` (iOS needs both); the
  scrim has `touch-action: none`.
- Vite's build adds `-webkit-backdrop-filter` / `-webkit-mask-image`; inputs stay ≥16px (no iOS zoom).

**v4 hero (superseded; the list now lives in Services):**
jeppesen's preloader (NTB mark slices lock together, once per session) + paper grain, then
vs-goods' "MOCKUP LIBRARY" list as the hero: centred eyebrow, "**Not to brag,** but we" (Clash
56px), then the four phrases as a giant uppercase list (BUILD BRANDS / FIND CREATORS / SHIP AI
AGENTS / MAKE DASHBOARDS); active line ink, others 17% grey; auto-cycles every 2.6s. A preview card
(accent media panel with the mockup + separate accent caption bar, like vs-goods' photo + orange
"New tools. Same creative guts." bar) hangs off the active line; on hover it follows the cursor
and hovering takes over the cycle; click = open that service. Card is clamped inside the list so
it never covers the bottom bar (lead line + Let's Talk). Grid-line background fading to the edges.
Phones: list ~10vw, card sits below the list. Copy is unchanged; only the presentation moved.

**v3.2 (superseded hero; beliefs deck still current):**
- Hero = headline at the top + **expanding strip** of four tall accent cards (one per phrase).
  The card for the current chip widens (flex-grow 8) to show its mockup, title, caption, → and a
  progress line; the others shrink to slim tabs with vertical labels. Hover = select + pause,
  click active card = open that service drawer. Bottom bar: lead line + Let's Talk. Hero grid
  uses `minmax(0,1fr)` so the strip can never widen the page on phones.
- Beliefs = **card deck**: canvas background, pinned; left eyebrow + "Because good ideas deserve
  better execution." + "04 / 06"; right six accent cards (cream, terracotta, pink, periwinkle,
  green, olive) that slide up from off-screen and land on a slightly rotated pile as you scroll
  (`BELIEF_LOOK` in Home.jsx). No repeated sentences.

Reference studied 2026-11-23: https://jeppesen.dev/ (one-partner branding/web studio). What makes it
work: a single grainy paper colour (#F2EDE4) + near-black ink (#252525); one display face
(Clash Grotesk, weight ~580, with a regular-weight continuation line); the brand mark animates as
the opening; scroll drives the storytelling (a statement whose words fill in as you scroll, a giant
services list that highlights as you scroll with a sticky preview); calm centred closing line with
one button; footer = dark band, giant wordmark with the logo mark set into it.

Rules kept: hero copy "Not to brag, but we [chip]" unchanged; pink cookie card + "Book a call" card
stay; no invented clients, testimonials or metrics (jeppesen's logo grid, testimonials and case
metrics are NOT copied); founder photos stay avatar-sized.

| # | Section | v3 change (jeppesen pattern) |
|---|---|---|
| 0 | Nav + surface | Nav slims to: NTB mark left; right = dark "Talk to the founders" button + "Menu". Whole site gets a subtle paper **grain** texture; palette tightens to paper + ink, accents only on chips/cards. Display font → **Clash Grotesk** (free, Fontshare) for headlines; Figtree stays for body. |
| 1 | Hero | **NTB mark intro**: on load the N, T and B blocks of the logo slide in and lock together (≈1.2s), then the headline appears. Left-aligned, two weights: "Not to brag," (bold) / "but we [chip]" (regular, chip still flips). One short lead line under it (from the copy deck: "We build brands, create connections and develop intelligent solutions that help businesses grow.") + Let's Talk. Right side: the big NTB mark stays as a slow-breathing object instead of the moving wall. |
| 2 | **New: statement** | Full-screen statement whose words fill from grey to ink as you scroll: "Great businesses need more than good marketing. They need creative thinking, meaningful connections and smarter systems." (copy deck, Introduction). |
| 3 | Services (replaces capability cards + "Where should we start?") | Giant stacked list of six services in Clash at ~100px, grey until active: Brand Strategy · Content & Social · Creator Partnerships · AI Agents · Revenue Automation · Business Intelligence. The item in the middle of the screen turns ink as you scroll; a **sticky preview card** on the right swaps to that service's mockup + 3 bullets. Click → existing service drawer. Two old chapters become one. |
| 4 | Why NTB / beliefs (dark band) | Dark pinned section in jeppesen's "clients" layout: left a grid of 6 bordered cells (the six beliefs), right one large line that cycles through them as you scroll. Replaces the dropping tilted cards. |
| 5 | AI, shown | One "featured work"-style card: demo media left (workflow + dashboard, labelled DEMO), text right, and a slow marquee of capabilities underneath (Lead qualification · CRM sync · Voice agents · Reporting) instead of metrics. |
| 6 | How we work | Five steps as a horizontal numbered line that fills as you scroll (Discover → Optimise); engagement pills below. |
| 7 | Founders | Keep the name-chip sentence; set it in Clash and add a small NTB-mark morph beside it (mark splits into two halves, one per founder). |
| 8 | Closing + footer | Centred closing line in Clash: "Have something in mind?" + one button "Book a 30-minute call" (opens Contact). Footer: dark band, giant "NOT TO BRAG" wordmark with the NTB mark set into it, founders' emails large on the right, small links in the corners. FAQ moves into the Contact drawer as a "Questions" tab. |

Effort: one focused pass; existing drawers, contact API and copy are reused.

## Stack and layout

```
client/   React 18 + Vite (JavaScript), react-router-dom. Pages in src/pages, copy in src/content.
server/   Node + Express. POST /api/contact validates the form and emails the founders (Nodemailer).
api/      Vercel serverless entry that re-uses server/app.js in production.
docs/     Knowledge base.
out/      Exported logo files (not part of the site).
```

Commands (from repo root):

- `npm install` — installs root, client and server (npm workspaces).
- `npm run dev` — Vite on :5173 and Express on :8787 (Vite proxies `/api`).
- `npm run build` — builds the client into `client/dist`.
- `npm test -w server` — routing + validation tests (node:test).
- `npm run preview` — production build served by Express on :8787.

### Status (2026-11-21)

- Repo: https://github.com/DHRUV130703/ntb (branch `main`). Pushes to `main` auto-deploy.
- Vercel: project `nottobrag` in team `dhruvs-projects-3e416bab`, live at https://nottobrag.vercel.app.
  Domains `nottobrag.app` (primary) and `www.nottobrag.app` (308 → apex) are added in Vercel.
  Registrar is **Namecheap** (nameservers `dns1/dns2.registrar-servers.com`). DNS done 2026-11-21:
  A `@` 76.76.21.21, CNAME `www` cname.vercel-dns.com.; https://nottobrag.app is live (Let's Encrypt
  cert), www 308-redirects to apex. Keep Namecheap's email-forwarding TXT/SPF record. SMTP env vars set in Vercel (Production). Email confirmed working
  2026-11-21: a test enquiry via https://nottobrag.app returned delivered:true to Riddhi + Dhruv.
  Sender is dhruv@nottobrag.org via Gmail SMTP with an App Password. If sending breaks, run
  `npm run verify-smtp -w server` (reads server/.env) to test the login locally.

- Live on https://nottobrag.app: v3 + v5 hero + mobile pass (pushed 2026-11-23).
- No portfolio projects yet. Pending from founders: company LinkedIn URL, real projects,
  analytics yes/no (decides the cookie banner).

### Contact form routing (`server/lib/routing.js`)

| Interest | Goes to |
|---|---|
| Creative & Marketing, Creator Collaborations | riddhi@nottobrag.org |
| AI & Automation, Business Intelligence | dhruv@nottobrag.org |
| Strategic Partnerships, Something Else, or none picked | both |

Multiple interests → union of recipients. Reply-To is the enquirer's email.

Env vars (`server/.env`, see `server/.env.example`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASS`, `MAIL_FROM`, `API_PORT` (dev API port, default 8787; `PORT` is only read in production
because preview tools set `PORT` for Vite). Founders use Google Workspace on nottobrag.org: SMTP is
`smtp.gmail.com:465` with an App Password. Without SMTP set, dev mode logs the email to the
console instead of sending; production returns an error.

## Deployment and domain

Target: Vercel (static client + `api/` function). Domain **nottobrag.app**: the registrar currently
has a URL redirect `nottobrag.app → http://www.nottobrag.app/`. To attach: add `nottobrag.app`
and `www.nottobrag.app` in the Vercel project, then at the registrar delete that redirect and set
`A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com` (or use the exact records Vercel shows).
Full steps: [docs/deploy.md](docs/deploy.md).
