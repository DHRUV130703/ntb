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
- Site structure (v2, see "Redesign v2"): **one scrolling page** + a Contact drawer. The copy deck's
  six "pages" become chapters of that page; deep detail lives in drawers, not new pages.

### Founders (both 23)

| Founder | Role | Email | Phone |
|---|---|---|---|
| Riddhi | Founder, Creative & Marketing | riddhi@nottobrag.org | +91 93725 15440 |
| Dhruv | Founder, Technology & AI | dhruv@nottobrag.org | +91 89286 51938 |

Role mapping is inferred (Dhruv's own studio site is the AI reference); confirm with the founders.
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
| 1 | **Hero** (v2.1, chosen by founders 2026-11-21 after the olive tile hero felt dull) | Bright cream stage. Huge headline "Not to brag, / but we [chip]": the chip is a tilted accent-coloured label (same language as the Cookies chip) that flips every 2.6s through *build brands* (terracotta) / *find creators* (pink) / *ship AI agents* (periwinkle) / *make dashboards* (green). Under it a 4-segment green progress bar (vs-goods "Now or never" style) that is clickable. Right: a tilted card in the same accent with the matching mockup; click opens that service drawer. Rotation pauses while hovering the bar/card; off under reduced motion. Phones: card moves above the copy, chip shrinks to fit. Copy in `story.hero.phrases`. | "Not to brag, but we …" + tagline line + Let's Talk. |
| 2 | **Three capabilities** | Horizontal rail of 3 large product-style cards (visual on top, white info strip with title + one line + coloured tag). Click → **service drawer** with that capability's full list + "Discuss this" button. | Title + one line each. Lists only in drawer. |
| 3 | **Pick a starting point** | Centred uppercase list, grey → ink on hover, a small preview card follows the cursor (like "MOCKUP LIBRARY"). BRANDING · CONTENT · CREATORS · AI AGENTS · DASHBOARDS. Click opens Contact drawer pre-filled. | Eyebrow "Where should we start?" |
| 4 | **Why NTB** | Charcoal section; 4 tilted cards float/settle on scroll (like the awards cards). One short line under it. | Card titles only: "A creative perspective." etc.; line: "Because good ideas deserve better execution." |
| 5 | **AI, shown not told** | Two big highlight cards side by side (like "Branding In Motion / Flowforms"): left an animated workflow (form → AI qualify → CRM → notify); right the live order dashboard, labelled **DEMO DATA**. | Tag + title per card. Implementation steps hidden behind "How we build it" toggle. |
| 6 | **How we work** | One row of 5 compact numbered steps (Discover → Optimise); hover/tap reveals the sentence. Engagement types as small pill chips beneath. | Step names only by default. |
| 7 | **The founders** | "THE TEAM" big uppercase, two large pill chips with photo + name + role, coloured like "THE FAMILY". Click → founder sheet (photo, 2-line bio, email, phone). Story ("Two 23-year-olds…") as 2 lines above. | "Two 23-year-olds making ideas happen." |
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

- v2 single-page redesign + "Not to brag, but we …" hero are **live on https://nottobrag.app**
  (pushed 2026-11-21, commit ca8d42a). Checked desktop 1024–1440, tablet 820, mobile 375.
- No portfolio projects yet. Pending from founders: company LinkedIn URL, real projects,
  confirmation of founder role mapping, analytics yes/no (decides the cookie banner).

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
