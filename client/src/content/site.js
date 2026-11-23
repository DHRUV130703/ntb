// All website copy. Source of truth: docs/website-content.md — keep the two in sync.

export const brand = {
  name: 'NOT TO BRAG',
  mark: '®',
  tagline: 'Creative thinking. Intelligent technology. Meaningful growth.',
  philosophy: 'We don’t just create ideas. We help turn them into something meaningful for businesses.',
  location: 'Mumbai, India',
  reach: 'Working with businesses beyond borders.',
  instagram: { handle: '@not.tobrag_', url: 'https://instagram.com/not.tobrag_' },
  linkedin: null, // TODO: add company LinkedIn URL when the founders share it
  email: 'dhruv@nottobrag.org',
};

export const founders = [
  {
    id: 'riddhi',
    name: 'Riddhi',
    role: 'Founder — Creative Strategy & Partnerships',
    title: 'Creative Strategy & Partnerships',
    short: 'Brands, storytelling and the people behind great collaborations.',
    photo: '/images/founders/riddhi.jpg',
    email: 'riddhi@nottobrag.org',
    phone: '+91 93725 15440',
    tel: '+919372515440',
    bio: 'Riddhi brings the creative perspective: brands, storytelling, marketing and the people behind great collaborations.',
    owns: 'Creative direction, brand strategy, content, marketing, social media, creator partnerships and collaborations.',
    accent: 'terracotta',
  },
  {
    id: 'dhruv',
    name: 'Dhruv',
    role: 'Founder — AI Solutions & Business Automation',
    title: 'AI Solutions & Business Automation',
    short: 'AI agents, automation and the systems that help businesses run smarter.',
    photo: '/images/founders/dhruv.jpg',
    email: 'dhruv@nottobrag.org',
    phone: '+91 89286 51938',
    tel: '+918928651938',
    bio: 'Dhruv brings the technical perspective: artificial intelligence, automation and ways technology can make businesses more efficient.',
    owns: 'AI solutions, intelligent automation, technical implementation, customer experience systems, data integrations and business intelligence.',
    accent: 'periwinkle',
  },
];

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/work', label: 'Our Work' },
  { to: '/about', label: 'About Us' },
  { to: '/approach', label: 'Our Approach' },
  { to: '/contact', label: 'Contact' },
];

export const capabilities = [
  {
    id: 'creative',
    no: '01',
    title: 'Creative & Marketing',
    line: 'Making brands impossible to overlook.',
    body: 'We help brands discover their voice, communicate their identity and connect with the right audiences through strategic thinking and creative execution.',
    accent: 'terracotta',
    items: [
      'Brand strategy and positioning',
      'Brand identity and creative direction',
      'Social media strategy and management',
      'Content creation and production',
      'Digital marketing campaigns',
      'Creative concepts and storytelling',
      'Reels, photography and visual content',
      'Campaign planning and execution',
    ],
    cta: { label: 'Explore Creative & Marketing', to: '/what-we-do#creative' },
    interest: 'Creative & Marketing',
  },
  {
    id: 'creators',
    no: '02',
    title: 'Creators & Collaborations',
    line: 'Bringing the right people and brands together.',
    body: 'We connect brands with creators who align with their identity, audience and campaign objectives. From creator discovery to campaign coordination, we help turn collaborations into meaningful brand experiences.',
    accent: 'pink',
    items: [
      'Influencer marketing',
      'Creator discovery and sourcing',
      'Brand-creator partnerships',
      'UGC campaigns',
      'Influencer campaign strategy',
      'Talent coordination and management',
      'Campaign execution and reporting',
      'Brand partnership development',
    ],
    cta: { label: 'Explore Collaborations', to: '/what-we-do#creators' },
    interest: 'Creator Collaborations',
  },
  {
    id: 'ai',
    no: '03',
    title: 'AI & Business Intelligence',
    line: 'Making businesses work smarter.',
    body: 'We help businesses integrate intelligent technology into their everyday operations through AI-powered customer experiences, revenue automation and data-driven systems.',
    accent: 'periwinkle',
    groups: [
      {
        title: 'AI Customer Experience',
        items: [
          'AI shopping assistants',
          'AI-powered customer support',
          'Conversational AI agents',
          'AI voice agents',
          'Automated customer interactions',
        ],
      },
      {
        title: 'Revenue Automation',
        items: [
          'Lead qualification systems',
          'Automated lead follow-ups',
          'CRM workflow automation',
          'Sales pipeline automation',
          'Customer retention workflows',
        ],
      },
      {
        title: 'Business Intelligence',
        items: [
          'Custom business dashboards',
          'Data integrations',
          'Reporting automation',
          'Operational workflow automation',
          'Business performance visibility',
        ],
      },
    ],
    cta: { label: 'Explore AI Solutions', to: '/what-we-do#ai' },
    interest: 'AI & Automation',
  },
];

export const home = {
  hero: {
    title: 'Creative thinking. Intelligent technology. Meaningful growth.',
    lead: 'We build brands, create connections and develop intelligent solutions that help businesses grow.',
    body: 'From creative strategy and marketing to creator collaborations and AI-powered business solutions, we bring creativity and technology together to make businesses work better.',
    intro: 'Independent creative and technology studio. Built around ideas, people and possibilities.',
  },
  introduction: {
    title: 'Not just another agency. A different way of thinking.',
    paragraphs: [
      'At NOT TO BRAG, we believe great businesses need more than good marketing. They need creative thinking, meaningful connections and smarter systems.',
      'We bring together the worlds of branding, content, marketing, creator partnerships and artificial intelligence to help businesses build their presence, connect with their audiences and improve the way they operate.',
      'Whether it’s developing a brand campaign, connecting businesses with the right creators or building AI-powered solutions, we focus on ideas that have a purpose and execution that makes a difference.',
    ],
  },
  whatWeDo: { eyebrow: 'What we do', title: 'Three capabilities. One shared vision.' },
  why: {
    eyebrow: 'Why NOT TO BRAG?',
    title: 'Because good ideas deserve better execution.',
    lead: 'We bring creative thinking and technical capabilities under one roof.',
    points: [
      { title: 'A creative perspective.', body: 'We think about how brands communicate, connect and stand out.' },
      { title: 'A connected approach.', body: 'We bring brands, creators, audiences and opportunities together.' },
      { title: 'An intelligent mindset.', body: 'We look for ways technology can simplify processes and improve business operations.' },
      { title: 'A focus on execution.', body: 'We believe ideas are only as good as the thought and effort that go into bringing them to life.' },
    ],
  },
  featured: {
    eyebrow: 'Featured work',
    title: 'Ideas are great. Seeing them come to life is better.',
    body: 'Explore our creative concepts, campaign ideas, creator collaborations and technology demonstrations.',
  },
  closing: {
    title: 'Have something in mind?',
    body: 'A brand that needs a fresh perspective? A campaign waiting to happen? A business ready to work smarter?',
    kicker: 'We’d love to hear about it.',
  },
};

export const marqueeWords = [
  'Brand Strategy',
  'Creative Direction',
  'Social Media',
  'Content Production',
  'Influencer Marketing',
  'UGC Campaigns',
  'Creator Partnerships',
  'AI Agents',
  'AI Voice Agents',
  'Revenue Automation',
  'CRM Workflows',
  'Business Dashboards',
];

export const whatWeDo = {
  eyebrow: 'What we bring to the table',
  title: 'Different challenges. Thoughtful solutions.',
  lead: 'We work across creative, marketing, partnerships and technology to help businesses grow and operate more effectively.',
  creative: {
    letter: 'A',
    headline: 'We turn brand identities into experiences people remember.',
    lead: 'Every brand has a story. We help find the right way to tell it.',
    services: [
      { title: 'Brand Strategy & Positioning', items: ['Brand discovery', 'Brand communication', 'Brand positioning', 'Audience understanding'] },
      { title: 'Creative Direction & Design', items: ['Campaign concepts', 'Creative development', 'Visual storytelling', 'Digital creatives'] },
      {
        title: 'Social Media & Content',
        items: ['Social media management', 'Content calendars', 'Reel concepts and scripts', 'Photography and videography', 'Content production'],
      },
      { title: 'Digital Marketing', items: ['Digital campaigns', 'Marketing strategy', 'Audience engagement', 'Campaign performance analysis'] },
    ],
    cta: 'Discuss Your Brand',
  },
  creators: {
    letter: 'B',
    headline: 'The right collaboration can take a brand further.',
    lead: 'We help brands identify relevant creators, develop collaboration strategies and coordinate campaigns from discovery to execution.',
    services: [
      'Influencer Marketing',
      'Creator Sourcing',
      'UGC Campaigns',
      'Brand Collaborations',
      'Campaign Management',
      'Talent Partnerships',
      'Influencer Outreach and Coordination',
      'Campaign Reporting',
    ],
    approach: [
      'Understand the brand and campaign objectives.',
      'Identify relevant creators.',
      'Coordinate outreach and negotiations.',
      'Align campaign deliverables.',
      'Manage execution and communication.',
      'Review campaign performance.',
    ],
    cta: 'Start a Collaboration',
    forCreators: {
      title: 'Are you a content creator?',
      body: 'Looking to work with brands that align with your content and audience? We’d love to connect and explore potential collaborations.',
      cta: 'Join Our Creator Network',
    },
  },
  ai: {
    letter: 'C',
    headline: 'Technology should solve problems, not create more of them.',
    lead: 'We design and implement AI-powered solutions that help businesses improve customer interactions, streamline repetitive processes and make better use of their data.',
    services: [
      {
        title: 'AI Customer Experience',
        lead: 'Build more responsive and accessible customer experiences.',
        items: ['AI shopping assistants', 'Website chat assistants', 'AI customer support agents', 'AI voice agents', 'Conversational workflows'],
      },
      {
        title: 'Revenue Automation',
        lead: 'Make sales and lead management more organised and efficient.',
        items: ['Automated lead qualification', 'Lead follow-up workflows', 'CRM automation', 'Sales pipeline management', 'Customer retention workflows'],
      },
      {
        title: 'Business Intelligence',
        lead: 'Turn business information into clearer, more actionable insights.',
        items: ['Business intelligence dashboards', 'Data integrations', 'Automated reporting', 'Operational dashboards', 'Workflow and process automation'],
      },
    ],
    approach: [
      'Understand the existing business process.',
      'Identify repetitive tasks and opportunities.',
      'Design an appropriate AI or automation solution.',
      'Integrate with relevant business systems.',
      'Test and implement the workflow.',
      'Monitor, refine and improve where required.',
    ],
    cta: 'Discuss an AI Solution',
  },
};

// Example workflows shown on the AI section (illustrative, adapted from dhruv-studio.vercel.app).
export const workflows = [
  {
    title: 'Lead qualification',
    body: 'Website enquiries are read by AI, scored and routed to your CRM and sales team.',
    nodes: [
      { kind: 'trigger', label: 'Website form', sub: 'on submit' },
      { kind: 'ai', label: 'AI qualify', sub: 'score + summarise' },
      { kind: 'app', label: 'Add to CRM', sub: 'deal: create' },
      { kind: 'app', label: 'Notify sales', sub: 'email · WhatsApp' },
    ],
  },
  {
    title: 'AI customer support',
    body: 'An assistant answers common questions from your own knowledge base and hands anything tricky to a person.',
    nodes: [
      { kind: 'trigger', label: 'Chat message', sub: 'website · WhatsApp' },
      { kind: 'ai', label: 'AI agent', sub: 'your FAQs + orders' },
      { kind: 'check', label: 'Confident?', sub: 'else escalate' },
      { kind: 'app', label: 'Reply or hand off', sub: 'to your team' },
    ],
  },
  {
    title: 'Order tracking & alerts',
    body: 'New orders are sorted, saved and sent to a live dashboard. Delays are flagged before customers have to ask.',
    nodes: [
      { kind: 'trigger', label: 'New order', sub: 'store webhook' },
      { kind: 'ai', label: 'AI classify', sub: 'priority · region' },
      { kind: 'app', label: 'Live dashboard', sub: 'realtime' },
      { kind: 'check', label: 'Delayed?', sub: 'notify customer' },
    ],
  },
  {
    title: 'Automated reporting',
    body: 'Sheets, databases and tools stay in sync, and the weekly report builds itself.',
    nodes: [
      { kind: 'trigger', label: 'Data updated', sub: 'sheets · CRM · store' },
      { kind: 'app', label: 'Clean + merge', sub: 'dedupe' },
      { kind: 'app', label: 'Database', sub: 'upsert' },
      { kind: 'app', label: 'Report', sub: 'auto-refresh' },
    ],
  },
];

export const work = {
  eyebrow: 'Our work',
  title: 'Work that speaks for itself.',
  lead: 'Every project starts with an idea. Every execution starts with a purpose.',
  body: 'This is where we showcase our creative thinking, strategic approach and technical capabilities.',
  categories: [
    { no: '01', title: 'Brand & Creative', body: 'Brand identities, visual concepts, social media campaigns and creative direction.', accent: 'terracotta' },
    { no: '02', title: 'Content & Campaigns', body: 'Content strategies, digital campaigns, brand storytelling and marketing execution.', accent: 'green' },
    { no: '03', title: 'Creators & Collaborations', body: 'Creator campaigns, influencer partnerships and UGC concepts.', accent: 'pink' },
    { no: '04', title: 'AI & Automation', body: 'AI agent demonstrations, automated workflows, customer experience solutions and business dashboards.', accent: 'periwinkle' },
  ],
  // Add real projects here. Set concept: true for independent concept work (shown with a CONCEPT PROJECT label).
  // Fields: { title, client, category, concept, overview, objective, challenge, approach, services[], execution, results, image }
  projects: [],
};

export const about = {
  eyebrow: 'About us',
  title: 'Two 23-year-olds making ideas happen.',
  lead: 'A little creativity. A little technology. A lot of ambition.',
  story: [
    'NOT TO BRAG started with two people who looked at business from different perspectives but shared the same ambition: to build something of their own.',
    'One brings a creative perspective, an interest in brands, storytelling, marketing and the people behind great collaborations.',
    'The other brings a technical perspective, exploring artificial intelligence, automation and ways technology can make businesses more efficient.',
  ],
  together: ['Together, we created NOT TO BRAG.', 'A space where creative thinking meets intelligent technology.'],
  closing: [
    'We’re here to work with ambitious brands, connect with interesting people, solve business challenges and turn good ideas into meaningful work.',
    'We’re building, learning, experimenting and growing with every project.',
    'And we’re only getting started.',
  ],
  beliefs: [
    'Creativity should have a purpose.',
    'Technology should make things easier.',
    'Good collaborations create opportunities.',
    'Every business deserves thoughtful solutions.',
    'Execution matters as much as the idea.',
    'Trust is built through consistency.',
  ],
};

export const approach = {
  eyebrow: 'Our approach',
  title: 'Good work starts with good conversations.',
  lead: 'We don’t believe in offering the same solution to every business.',
  body: 'We start by understanding what you’re trying to achieve, identify what needs attention and build an approach around your requirements.',
  steps: [
    { no: '01', title: 'Discover', body: 'We get to know your business, understand your goals and identify the challenges you’re looking to solve.' },
    { no: '02', title: 'Strategise', body: 'We develop a direction, identify opportunities and define the right creative or technical approach.' },
    {
      no: '03',
      title: 'Create & Build',
      body: 'Our ideas move into execution, whether that’s a marketing campaign, creator partnership, content strategy or AI-powered system.',
    },
    {
      no: '04',
      title: 'Implement',
      body: 'We bring the work to life, coordinate the necessary elements and ensure everything is aligned with the agreed objectives.',
    },
    { no: '05', title: 'Optimise', body: 'We review the work, understand what’s working and identify opportunities to improve.' },
  ],
  engagements: {
    title: 'Work with us',
    lead: 'We offer flexible engagements depending on the scope and requirements of each project.',
    items: [
      'Project-based engagements',
      'Monthly marketing retainers',
      'Influencer campaign partnerships',
      'AI implementation projects',
      'Ongoing automation and support',
    ],
  },
};

export const contact = {
  title: 'Not to brag, but we’d love to hear from you.',
  lead: 'Have an idea, a business challenge or a collaboration in mind?',
  body: 'Tell us a little about it. Let’s see what we can create together.',
  lookingFor: [
    { title: 'Creative & Marketing Enquiries', body: 'For branding, social media, content, campaigns and digital marketing.', interest: 'Creative & Marketing', accent: 'terracotta' },
    { title: 'Creator & Brand Collaborations', body: 'For influencer partnerships, creator campaigns and UGC opportunities.', interest: 'Creator Collaborations', accent: 'pink' },
    { title: 'AI & Technology Enquiries', body: 'For AI agents, customer experience, revenue automation and business intelligence.', interest: 'AI & Automation', accent: 'periwinkle' },
    { title: 'General Business Enquiries', body: 'For partnerships, conversations and everything else.', interest: 'Strategic Partnerships', accent: 'green' },
  ],
  // Must match server/lib/routing.js
  interests: ['Creative & Marketing', 'Creator Collaborations', 'AI & Automation', 'Business Intelligence', 'Strategic Partnerships', 'Something Else'],
  button: 'Send an Enquiry',
  closing: 'Good ideas start somewhere. This could be the beginning.',
};

export const faqs = [
  {
    q: 'What is NOT TO BRAG?',
    a: 'NOT TO BRAG is an independent creative and technology-led agency working across brand marketing, content creation, creator collaborations and AI-powered business solutions.',
  },
  {
    q: 'What services do you offer?',
    a: 'We offer creative strategy, branding, social media management, digital marketing, content creation, influencer marketing, creator partnerships, AI customer experience, revenue automation and business intelligence.',
  },
  {
    q: 'Do you work with startups and small businesses?',
    a: 'Yes. We welcome enquiries from startups, growing businesses, established brands and entrepreneurs looking for creative, marketing or technology solutions.',
  },
  { q: 'Do you work with individual creators?', a: 'Yes. We connect with creators across different niches and explore relevant brand collaboration opportunities.' },
  { q: 'Can we hire you for just one service?', a: 'Absolutely. You can engage us for individual projects or combine different services depending on your requirements.' },
  {
    q: 'How do your AI solutions work?',
    a: 'We begin by understanding your existing processes and identifying opportunities for improvement. We then design, implement and test suitable AI agents, automation workflows or data solutions based on your business requirements.',
  },
  { q: 'How do we get started?', a: 'Simply contact us through our enquiry form or email. We’ll understand your requirements and discuss the next steps.' },
];

export const seo = {
  '/': {
    title: 'NOT TO BRAG | Creative, Marketing & AI Solutions Agency',
    description:
      'NOT TO BRAG is a creative and technology-led agency offering branding, digital marketing, content creation, influencer collaborations, AI automation and business intelligence solutions.',
  },
  '/what-we-do': {
    title: 'What We Do | NOT TO BRAG',
    description: 'Creative & marketing, creators & collaborations, and AI & business intelligence services from NOT TO BRAG.',
  },
  '/work': { title: 'Our Work | NOT TO BRAG', description: 'Brand, campaign, creator and AI & automation work by NOT TO BRAG.' },
  '/about': { title: 'About Us | NOT TO BRAG', description: 'Two 23-year-olds making ideas happen. Meet the founders of NOT TO BRAG.' },
  '/approach': { title: 'Our Approach | NOT TO BRAG', description: 'Discover, strategise, create & build, implement, optimise. How NOT TO BRAG works.' },
  '/contact': { title: 'Contact | NOT TO BRAG', description: 'Have an idea, a business challenge or a collaboration in mind? Talk to NOT TO BRAG.' },
};

// ---------------------------------------------------------------------------
// v2 single-page narrative (see CLAUDE.md "Redesign v2"). Short lines only;
// full lists stay in the objects above and are shown inside drawers.
// ---------------------------------------------------------------------------

export const chapters = [
  { id: 'services', label: 'What we do' },
  { id: 'beliefs', label: 'What we believe' },
  { id: 'ai', label: 'AI, shown' },
  { id: 'process', label: 'How we work' },
  { id: 'team', label: 'The founders' },
];

// v3 (jeppesen direction) — copy for the new sections, all taken from docs/website-content.md.
export const v3 = {
  heroLead: 'We build brands, create connections and develop intelligent solutions that help businesses grow.',
  statement:
    'Great businesses need more than good marketing. They need creative thinking, meaningful connections and smarter systems.',
  services: [
    { name: 'Brand Strategy', cap: 'creative', visual: 'brand', accent: 'terracotta', bullets: ['Brand discovery & positioning', 'Identity & creative direction', 'Campaign concepts & storytelling'] },
    { name: 'Content & Social', cap: 'creative', visual: 'reel', accent: 'terracotta', bullets: ['Social media management', 'Reels, photography & video', 'Content calendars & production'] },
    { name: 'Creator Partnerships', cap: 'creators', visual: 'creator', accent: 'pink', bullets: ['Creator discovery & sourcing', 'UGC & influencer campaigns', 'Campaign management & reporting'] },
    { name: 'AI Agents', cap: 'ai', visual: 'chat', accent: 'periwinkle', bullets: ['AI shopping & support assistants', 'Website chat assistants', 'AI voice agents'] },
    { name: 'Revenue Automation', cap: 'ai', visual: 'node', accent: 'periwinkle', bullets: ['Automated lead qualification', 'Follow-up & CRM workflows', 'Customer retention workflows'] },
    { name: 'Business Intelligence', cap: 'ai', visual: 'dash', accent: 'green', bullets: ['Custom business dashboards', 'Data integrations', 'Automated reporting'] },
  ],
  beliefsTitle: 'Because good ideas deserve better execution.',
  aiCaps: ['Lead qualification', 'CRM sync', 'AI voice agents', 'Shopping assistants', 'Website chat', 'Automated reporting', 'Data integrations', 'Operational dashboards'],
  closing: { title: 'Have something in mind?', cta: 'Book a 30-minute call' },
};

export const story = {
  hero: {
    eyebrow: 'Independent creative & technology studio · Mumbai',
    title: ['Creative thinking. Intelligent technology.', 'Meaningful growth.'],
    lead: ['Not to brag,', 'but we'],
    // Rotating chip in the hero. `service` opens that capability's drawer; `visual` is the matching card.
    phrases: [
      { text: 'build brands', accent: 'terracotta', service: 'creative', visual: 'brand', caption: 'Brand strategy, identity & content' },
      { text: 'find creators', accent: 'pink', service: 'creators', visual: 'creator', caption: 'Influencer & UGC collaborations' },
      { text: 'ship AI agents', accent: 'periwinkle', service: 'ai', visual: 'chat', caption: 'Shopping, support & voice assistants' },
      { text: 'make dashboards', accent: 'green', service: 'ai', visual: 'dash', caption: 'Reporting & business intelligence' },
    ],
    cta: 'Let’s Talk',
  },
  capabilities: {
    eyebrow: 'What we do',
    title: 'Three capabilities. One shared vision.',
    tags: { creative: 'Brands', creators: 'People', ai: 'Systems' },
  },
  start: {
    eyebrow: 'Where should we start?',
    items: [
      { label: 'Branding', interest: 'Creative & Marketing', line: 'Strategy, identity, creative direction', accent: 'terracotta', visual: 'brand' },
      { label: 'Content', interest: 'Creative & Marketing', line: 'Social, reels, photography, campaigns', accent: 'olive', visual: 'reel' },
      { label: 'Creators', interest: 'Creator Collaborations', line: 'Influencers, UGC, brand partnerships', accent: 'pink', visual: 'creator' },
      { label: 'AI Agents', interest: 'AI & Automation', line: 'Shopping, support and voice assistants', accent: 'periwinkle', visual: 'chat' },
      { label: 'Dashboards', interest: 'Business Intelligence', line: 'Reporting, data, performance visibility', accent: 'green', visual: 'dash' },
    ],
  },
  why: {
    eyebrow: 'Why NOT TO BRAG?',
    title: 'Because good ideas deserve better execution.',
  },
  ai: {
    eyebrow: 'AI & business intelligence',
    title: 'Technology should solve problems, not create more of them.',
    flowTag: 'Revenue automation',
    flowTitle: 'Every enquiry, qualified and followed up',
    dashTag: 'Business intelligence',
    dashTitle: 'Know where every order is. Right now.',
    howLabel: 'How we build it',
  },
  process: {
    eyebrow: 'How we work',
    title: 'Good work starts with good conversations.',
  },
  team: {
    eyebrow: 'The people behind the brand',
    title: 'Two 23-year-olds making ideas happen.',
    lead: 'A little creativity. A little technology. A lot of ambition.',
    // v2.6 founders sentence: text parts around the two name chips (lines from the copy deck).
    sentence: ['Not to brag, but', 'makes brands impossible to overlook, and', 'builds the systems that make businesses work smarter.'],
  },
  closing: {
    title: 'Have something in mind?',
    body: 'A brand that needs a fresh perspective? A campaign waiting to happen? A business ready to work smarter?',
  },
  status: { eyebrow: 'Now booking', line: 'Talk to the founders directly.', cta: 'Book a call' },
};
