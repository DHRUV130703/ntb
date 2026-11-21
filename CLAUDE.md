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
- Pages: Home, What We Do, Our Work, About Us, Our Approach, Contact (+ FAQ, footer).

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

## Design direction

- Layout/interaction reference: https://vs-goods.store/ — floating rounded white nav pill with a
  `Menu [+]` button, big medium-weight grotesk type, warm off-white canvas, charcoal sections,
  rounded cards with pastel tags, split buttons with an arrow cell, marquee strips, large
  uppercase hover list, tilted scattered cards.
- AI section content/visual reference: https://dhruv-studio.vercel.app/ — workflow node diagrams
  (trigger → AI step → app update), live order-tracking dashboard demo, 4-step build process.
- Brand colours (sampled from the logo): olive `#6C6847`, cream `#F1E6D8`. Canvas `#ECE9E2`,
  ink `#222423`. Accents: terracotta `#E8734A` (Creative), pink `#EBA6D9` (Creators),
  periwinkle `#7C83EB` (AI), lime `#C6E36B`.
- Font: Figtree (self-hosted via `@fontsource-variable/figtree`), stand-in for Roobert.
- Logo assets: `client/public/brand/` (from the founders' NTB logo; olive bg, cream letters).
  Gmail/Workspace logo exports are in `out/` (300×100 for the Workspace custom logo slot).

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

- Built: all six pages, FAQ, footer, contact API with routing, SEO meta, favicon/OG image.
- Our Work has **no projects yet**: it shows the four categories and an "in progress" note.
  Add real projects to `work.projects` in `client/src/content/site.js`.
- Pending from founders: company LinkedIn URL, real portfolio projects, SMTP app password,
  confirmation of founder role mapping.

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
