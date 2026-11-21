import { INTERESTS } from './routing.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

const LIMITS = { name: 120, business: 160, email: 200, phone: 20, message: 5000 };

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * Validates a contact-form payload.
 * Returns { ok: true, data } or { ok: false, errors: { field: message } }.
 */
export function validateEnquiry(body = {}) {
  const data = {
    name: clean(body.name),
    business: clean(body.business),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    message: clean(body.message),
    interests: Array.isArray(body.interests)
      ? [...new Set(body.interests.filter((i) => INTERESTS.includes(i)))]
      : [],
  };
  const errors = {};

  if (!data.name) errors.name = 'Please tell us your name.';
  if (!data.email) errors.email = 'We need an email to reply to.';
  else if (!EMAIL_RE.test(data.email)) errors.email = 'That email doesn’t look right.';
  if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = 'That number doesn’t look right.';
  if (!data.message) errors.message = 'Tell us a little about your project.';
  else if (data.message.length < 10) errors.message = 'A few more words, please.';

  for (const [field, max] of Object.entries(LIMITS)) {
    if (data[field].length > max) errors[field] = `Please keep this under ${max} characters.`;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
