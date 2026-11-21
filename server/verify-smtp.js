// Checks the Gmail/SMTP login in server/.env without sending an email.
// Usage (from repo root):  npm run verify-smtp -w server
import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT = '465', SMTP_USER, SMTP_PASS } = process.env;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.error('Missing SMTP_HOST, SMTP_USER or SMTP_PASS in server/.env');
  process.exit(1);
}

const pass = SMTP_PASS.trim();
console.log(`Checking login for ${SMTP_USER} on ${SMTP_HOST}:${SMTP_PORT}`);
console.log(`Password: ${pass.length} characters${/\s/.test(pass) ? ' (contains spaces — remove them)' : ''}${pass.length === 16 ? '' : ' (App Passwords are 16 characters)'}`);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER.trim(), pass },
});

try {
  await transporter.verify();
  console.log('✅ Login works. Put exactly these SMTP_USER and SMTP_PASS values in Vercel.');
} catch (err) {
  console.error('❌ Login failed:', err.message.split('\n')[0]);
  process.exit(1);
}
