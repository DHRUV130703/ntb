// Who receives a contact-form enquiry. Keep in sync with CLAUDE.md ("Contact form routing").

export const FOUNDERS = {
  riddhi: { name: 'Riddhi', email: 'riddhi@nottobrag.org' },
  dhruv: { name: 'Dhruv', email: 'dhruv@nottobrag.org' },
};

// Interest values must match the options in client/src/content/site.js (contact.interests).
export const INTEREST_ROUTES = {
  'Creative & Marketing': ['riddhi'],
  'Creator Collaborations': ['riddhi'],
  'AI & Automation': ['dhruv'],
  'Business Intelligence': ['dhruv'],
  'Strategic Partnerships': ['riddhi', 'dhruv'],
  'Something Else': ['riddhi', 'dhruv'],
};

export const INTERESTS = Object.keys(INTEREST_ROUTES);

/** Returns the founder records that should receive an enquiry with these interests. */
export function recipientsFor(interests = []) {
  const keys = new Set();
  for (const interest of interests) {
    for (const key of INTEREST_ROUTES[interest] ?? []) keys.add(key);
  }
  if (keys.size === 0) {
    keys.add('riddhi');
    keys.add('dhruv');
  }
  return [...keys].map((key) => FOUNDERS[key]);
}
