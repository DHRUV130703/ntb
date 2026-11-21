import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createApp } from './app.js';
import { smtpConfigured } from './lib/mailer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// API_PORT wins so a dev tool that sets PORT for Vite can't steal it; PORT is honoured in production hosts.
const PORT = Number(process.env.API_PORT || (process.env.NODE_ENV === 'production' && process.env.PORT) || 8787);
const app = createApp();

// In production (e.g. `npm run preview` or a Node host), also serve the built client.
const dist = path.resolve(__dirname, '../client/dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1h', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
  if (!smtpConfigured()) console.log('[api] SMTP not configured: enquiries are logged, not emailed.');
});
