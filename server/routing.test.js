import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recipientsFor } from './lib/routing.js';
import { validateEnquiry } from './lib/validate.js';

const emails = (interests) => recipientsFor(interests).map((r) => r.email).sort();

test('creative interests go to Riddhi', () => {
  assert.deepEqual(emails(['Creative & Marketing', 'Creator Collaborations']), ['riddhi@nottobrag.org']);
});

test('AI interests go to Dhruv', () => {
  assert.deepEqual(emails(['AI & Automation', 'Business Intelligence']), ['dhruv@nottobrag.org']);
});

test('mixed, general or empty go to both', () => {
  const both = ['dhruv@nottobrag.org', 'riddhi@nottobrag.org'];
  assert.deepEqual(emails(['Creative & Marketing', 'AI & Automation']), both);
  assert.deepEqual(emails(['Something Else']), both);
  assert.deepEqual(emails([]), both);
});

test('validation catches missing fields and drops unknown interests', () => {
  const bad = validateEnquiry({ email: 'nope' });
  assert.equal(bad.ok, false);
  assert.ok(bad.errors.name && bad.errors.email && bad.errors.message);

  const good = validateEnquiry({
    name: 'Asha',
    email: 'ASHA@Example.com',
    message: 'We need a new brand campaign.',
    interests: ['Creative & Marketing', 'Hacking'],
  });
  assert.equal(good.ok, true);
  assert.equal(good.data.email, 'asha@example.com');
  assert.deepEqual(good.data.interests, ['Creative & Marketing']);
});
