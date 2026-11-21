import express from 'express';
import { validateEnquiry } from './lib/validate.js';
import { recipientsFor } from './lib/routing.js';
import { sendEnquiry } from './lib/mailer.js';

// Simple in-memory rate limit: 5 enquiries per IP per 10 minutes.
// (Per-instance only; good enough to stop accidental double-submits and casual spam.)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export function createApp() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '50kb' }));

  app.get('/api/health', (_req, res) => res.json({ ok: true }));

  app.post('/api/contact', async (req, res) => {
    // Honeypot: real people never fill the hidden "website" field.
    if (req.body?.website) return res.json({ ok: true });

    if (rateLimited(req.ip || 'unknown')) {
      return res.status(429).json({ ok: false, error: 'Too many messages. Please try again in a few minutes.' });
    }

    const result = validateEnquiry(req.body);
    if (!result.ok) return res.status(400).json({ ok: false, errors: result.errors });

    const recipients = recipientsFor(result.data.interests);
    try {
      const { delivered } = await sendEnquiry(result.data, recipients);
      return res.json({ ok: true, delivered, sentTo: recipients.map((r) => r.name) });
    } catch (err) {
      console.error('[contact] send failed:', err.message);
      return res.status(502).json({
        ok: false,
        error: 'We couldn’t send your message right now. Please email us directly instead.',
      });
    }
  });

  app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

  return app;
}
