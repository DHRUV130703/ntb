# Deploying nottobrag.app

The site deploys to **Vercel**: the React build is served as static files and `api/index.js`
runs the same Express app as a serverless function for `/api/*` (see `vercel.json`).

## 1. Email sending (do this first)

The contact form emails `riddhi@nottobrag.org` / `dhruv@nottobrag.org` through Google Workspace SMTP.

1. Pick the sending account (e.g. `dhruv@nottobrag.org`). It needs 2-Step Verification on.
2. Create an App Password: Google Account → Security → App passwords. Copy the 16-character code.
3. Locally: copy `server/.env.example` to `server/.env` and fill in `SMTP_PASS`.
4. On Vercel (Project → Settings → Environment Variables, or `vercel env add`), add:
   `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=dhruv@nottobrag.org`,
   `SMTP_PASS=<app password>`, `MAIL_FROM=NOT TO BRAG Website <dhruv@nottobrag.org>`.

Without these, production returns "We couldn't send your message" and shows the email addresses instead.

## 2. Deploy

```bash
npm i -g vercel@latest
vercel login
vercel link          # create/link a project called "nottobrag"
vercel --prod
```

Or push the repo to GitHub and import it at vercel.com/new (framework preset: Other; build
command and output directory come from `vercel.json`).

## 3. Attach the domain nottobrag.app

1. Vercel → Project → Settings → Domains → add `nottobrag.app` and `www.nottobrag.app`.
   Choose `nottobrag.app` as primary and let `www` redirect to it (or the reverse; pick one).
2. At the registrar (the panel with "Source URL / Destination URL"):
   - **Delete the existing URL redirect** `nottobrag.app → http://www.nottobrag.app/`. Registrar
     URL forwarding overrides DNS records and would stop Vercel from serving the site.
   - In DNS records add:
     | Type | Host | Value |
     |---|---|---|
     | A | `@` | `76.76.21.21` |
     | CNAME | `www` | `cname.vercel-dns.com` |
   - Use the exact values Vercel shows on the Domains page if they differ.
3. Wait for Vercel to show "Valid Configuration" (minutes to a few hours). HTTPS is issued
   automatically; `.app` domains are HTTPS-only, so the site won't load until the certificate exists.

## 4. Check after go-live

- `https://nottobrag.app` loads, `https://www.nottobrag.app` redirects.
- Send a test enquiry for each interest and confirm it lands in the right inbox (table in CLAUDE.md).
- Replying to the email goes to the enquirer (Reply-To header).
