import { useCallback, useEffect, useRef, useState } from 'react';
import { founders, story, approach, about, whatWeDo, v3 } from '../content/site.js';
import { useUi } from '../state/ui.jsx';
import { Button, Reveal, PlusIcon } from '../components/ui.jsx';
import { Visual } from '../components/Visuals.jsx';
import { OrderDashboardDemo, FlowDemo } from '../components/Demos.jsx';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll progress of an element through the viewport, 0 → 1.
 * 0 when its top reaches `start` (fraction of viewport height), 1 when its bottom reaches `end`.
 */
function useScrollProgress(ref, { start = 0.85, end = 0.35 } = {}) {
  const [p, setP] = useState(() => (reduced() ? 1 : 0));
  useEffect(() => {
    if (reduced()) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end - r.height;
      const v = (from - r.top) / Math.max(1, from - to);
      setP(Math.min(1, Math.max(0, v)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, start, end]);
  return p;
}

/* 1 — Hero ------------------------------------------------------------- */

const PHRASE_MS = 2600;
const INTRO_KEY = 'ntb-intro-seen';

/** Brief preloader: the NTB mark's three slices lock together, then the page is revealed. */
function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1500);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__mark">
        <span className="intro__piece intro__piece--n" />
        <span className="intro__piece intro__piece--t" />
        <span className="intro__piece intro__piece--b" />
        <span className="intro__piece intro__piece--whole" />
      </div>
    </div>
  );
}

// Sticker tags floating in the hero's top area. `k` = phrase index they belong to.
const STICKERS = [
  { t: 'Brand strategy', k: 0, x: 46, y: 18, r: -6 },
  { t: 'Visual identity', k: 0, x: 74, y: 30, r: 5 },
  { t: 'Reels & content', k: 0, x: 58, y: 42, r: -3 },
  { t: 'UGC campaigns', k: 1, x: 84, y: 14, r: 7 },
  { t: 'Creator shortlist', k: 1, x: 36, y: 34, r: 4 },
  { t: 'AI shopping assistant', k: 2, x: 63, y: 24, r: -5 },
  { t: 'Voice agents', k: 2, x: 88, y: 40, r: -4 },
  { t: 'Live dashboard', k: 3, x: 50, y: 6, r: 3 },
  { t: 'Weekly reports', k: 3, x: 76, y: 50, r: -7 },
];
const PHRASE_ACCENT = ['terracotta', 'pink', 'periwinkle', 'green'];

function Hero() {
  const { openContact } = useUi();
  const phrases = story.hero.phrases;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still] = useState(reduced);
  const [intro, setIntro] = useState(() => {
    if (reduced()) return false;
    try {
      return !sessionStorage.getItem(INTRO_KEY);
    } catch {
      return true;
    }
  });
  const endIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* ignore */
    }
    setIntro(false);
  }, []);

  useEffect(() => {
    if (still || paused || intro) return;
    const t = setTimeout(() => setI((n) => (n + 1) % phrases.length), PHRASE_MS);
    return () => clearTimeout(t);
  }, [i, paused, still, intro, phrases.length]);

  const p = phrases[i];
  return (
    <>
      {intro && <Intro onDone={endIntro} />}
      <section className={`hero3 ${intro ? 'is-waiting' : 'is-ready'}`} aria-labelledby="hero-title">
        <div className="stickers" aria-hidden="true">
          {STICKERS.map((st, n) => (
            <span
              key={st.t}
              className={`sticker ${st.k === i ? 'is-on' : ''}`}
              data-accent={PHRASE_ACCENT[st.k]}
              style={{ left: `${st.x}%`, top: `${st.y}%`, '--x': st.x, '--r': `${st.r}deg`, '--d': `${(n % 5) * 0.7}s` }}
            >
              <i />
              {st.t}
            </span>
          ))}
        </div>

        <h1 id="hero-title" className="hero3__title">
          <span className="sr-only">
            {story.hero.lead.join(' ')} {phrases.map((x) => x.text).join(', ')}.
          </span>
          <span aria-hidden="true">
            <span className="hero3__line">
              <span className="hero3__strong">{story.hero.lead[0]}</span> <span className="hero3__soft">{story.hero.lead[1]}</span>
            </span>
            <span className="hero3__line">
              <span key={i} className="hero3__chip" data-accent={p.accent} style={{ '--tilt': i % 2 ? '1.5deg' : '-1.5deg' }}>
                {p.text}
              </span>
            </span>
          </span>
        </h1>

        <div className="hero3__bar">
          <p className="hero3__lead">{v3.heroLead}</p>
          <div
            className="hero3__segs"
            role="tablist"
            aria-label="What we do"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            {phrases.map((x, n) => (
              <button
                key={x.text}
                role="tab"
                aria-selected={n === i}
                className={`hero3__seg ${n === i ? 'is-active' : ''} ${n < i ? 'is-done' : ''} ${paused || still || intro ? 'is-paused' : ''}`}
                style={{ '--ms': `${PHRASE_MS}ms` }}
                onClick={() => setI(n)}
              >
                <i />
                <span>{x.text}</span>
              </button>
            ))}
          </div>
          <div className="hero3__cta">
            <Button variant="dark" onClick={() => openContact()}>
              {story.hero.cta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * vs-goods "MOCKUP LIBRARY" list: giant uppercase lines, the active one in ink, with a preview
 * card (mockup + caption bar) hanging off it. Auto-cycles while on screen; hover takes over and
 * the card follows the cursor. items: [{ label, accent, visual, caption, onClick }]
 */
function HangingList({ items, interval = PHRASE_MS }) {
  const [i, setI] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [still] = useState(reduced);
  const list = useRef(null);
  const els = useRef([]);
  const preview = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(list.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (still || hovering || !inView) return;
    const t = setTimeout(() => setI((n) => (n + 1) % items.length), interval);
    return () => clearTimeout(t);
  }, [i, hovering, inView, still, items.length, interval]);

  useEffect(() => {
    if (hovering) return;
    const place = () => {
      const el = els.current[i];
      const box = list.current;
      if (!el || !box) return;
      const r = el.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      const ph = preview.current?.offsetHeight || 0;
      const y = Math.min(r.top - b.top + r.height * 0.55, b.height - ph + 12);
      setPos({ x: r.left - b.left + r.width * 0.42, y });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [i, hovering]);

  const onMove = (e) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const b = list.current.getBoundingClientRect();
    const ph = preview.current?.offsetHeight || 0;
    setPos({ x: e.clientX - b.left + 24, y: Math.min(e.clientY - b.top + 18, b.height - ph + 12) });
  };

  const cur = items[i];
  return (
    <div className={`hlist ${hovering ? 'is-hovering' : ''}`} ref={list} onPointerMove={onMove} onPointerLeave={() => setHovering(false)}>
      {items.map((x, n) => (
        <button
          key={x.label}
          ref={(el) => (els.current[n] = el)}
          className={`hlist__item ${n === i ? 'is-active' : ''}`}
          onPointerEnter={() => {
            setHovering(true);
            setI(n);
          }}
          onFocus={() => setI(n)}
          onClick={x.onClick}
        >
          {x.label}
        </button>
      ))}
      <div className="hpreview" ref={preview} style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }} aria-hidden="true">
        <div key={i} className="hpreview__inner" data-accent={cur.accent}>
          <div className="hpreview__media">
            <Visual name={cur.visual} />
          </div>
          <div className="hpreview__caption">{cur.caption}</div>
        </div>
      </div>
    </div>
  );
}

/* 2 — Statement: words fill from grey to ink as you scroll -------------------- */

function Statement() {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { start: 0.9, end: 0.55 });
  const words = v3.statement.split(' ');
  const lit = Math.round(p * words.length);
  return (
    <section className="statement" aria-label="What we believe in">
      <p className="statement__text" ref={ref}>
        {words.map((w, n) => (
          <span key={n} className={n < lit ? 'is-lit' : ''}>
            {w}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}

/* 3 — Services: the vs-goods list (moved here from the hero) -------------- */

function Services() {
  const { openService, openContact } = useUi();
  const items = v3.services.map((x) => ({
    label: x.name,
    accent: x.accent,
    visual: x.visual,
    caption: x.bullets.join(' · '),
    onClick: () => openService(x.cap),
  }));
  return (
    <section id="services" className="services4">
      <div className="wrap services4__head">
        <p className="label">What we do</p>
        <p className="services4__hint">Pick one to see everything we do there.</p>
      </div>
      <HangingList items={items} />
      <div className="wrap services4__foot">
        <Button variant="dark" onClick={() => openContact()}>
          Not sure where to start? Let’s talk
        </Button>
      </div>
    </section>
  );
}

/* 4 — Beliefs: a deck of cards that land on a pile as you scroll ------------ */

const BELIEF_LOOK = [
  { accent: 'cream', r: -4 },
  { accent: 'terracotta', r: 3 },
  { accent: 'pink', r: -2 },
  { accent: 'periwinkle', r: 4 },
  { accent: 'green', r: -3 },
  { accent: 'olive', r: 2 },
];

function Beliefs() {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { start: 0, end: 1 });
  const beliefs = about.beliefs;
  const n = beliefs.length;
  // Card 0 is on the pile from the start; the last card lands at the end of the section.
  const pos = p * (n - 1);
  const idx = Math.min(n - 1, Math.round(pos));
  return (
    <section id="beliefs" className="beliefs" ref={ref} style={{ '--n': n }}>
      <div className="beliefs__pin">
        <div className="wrap beliefs__layout">
          <div className="beliefs__intro">
            <p className="label">What we believe</p>
            <h2 className="h-lg">{v3.beliefsTitle}</h2>
            <p className="beliefs__count" aria-hidden="true">
              <b>{String(idx + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}
            </p>
          </div>
          <ol className="deck" aria-label="Our beliefs">
            {beliefs.map((b, k) => {
              const t = Math.min(1, Math.max(0, pos - (k - 1)));
              const depth = Math.max(0, pos - k);
              const look = BELIEF_LOOK[k % BELIEF_LOOK.length];
              return (
                <li
                  key={b}
                  className="deck__card"
                  data-accent={look.accent}
                  style={{
                    zIndex: k,
                    transform: `translateY(${(1 - t) * 100}vh) rotate(${look.r * t}deg) scale(${1 - Math.min(depth, 3) * 0.035})`,
                    visibility: t > 0 ? 'visible' : 'hidden',
                  }}
                >
                  <span className="deck__no">{String(k + 1).padStart(2, '0')}</span>
                  <p className="deck__text">{b}</p>
                  <span className="deck__sign">NOT TO BRAG® believes</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* 5 — AI, shown: one featured card + capability marquee ---------------------- */

function AiFeature() {
  const { openContact } = useUi();
  const [how, setHow] = useState(false);
  return (
    <section id="ai" className="chapter ai3">
      <div className="wrap">
        <p className="label ai3__eyebrow">AI, shown not told</p>
        <Reveal className="feature">
          <div className="feature__media">
            <OrderDashboardDemo />
            <div className="feature__flow">
              <FlowDemo />
            </div>
          </div>
          <div className="feature__body">
            <div className="feature__tags">
              <span className="tag tag--outline">AI &amp; Business Intelligence</span>
              <span className="tag" data-accent="pink">
                Demo data
              </span>
            </div>
            <h2 className="h-lg">{story.ai.title}</h2>
            <p className="feature__lead">{whatWeDo.ai.lead}</p>
            <button className="how__toggle" aria-expanded={how} onClick={() => setHow((h) => !h)}>
              <PlusIcon /> {story.ai.howLabel}
            </button>
            {how && (
              <ol className="how__list">
                {whatWeDo.ai.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ol>
            )}
            <div>
              <Button variant="dark" onClick={() => openContact({ interest: 'AI & Automation' })}>
                {whatWeDo.ai.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="capmarquee" aria-label={v3.aiCaps.join(', ')}>
        <div className="capmarquee__track" aria-hidden="true">
          {[...v3.aiCaps, ...v3.aiCaps].map((c, n) => (
            <span key={n}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6 — How we work: a numbered line that fills as you scroll ------------------- */

function ProcessLine() {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { start: 0.8, end: 0.5 });
  const steps = approach.steps;
  return (
    <section id="process" className="chapter process3">
      <div className="wrap">
        <p className="label process3__eyebrow">How we work</p>
        <h2 className="h-lg process3__title">{story.process.title}</h2>
        <ol className="pline" ref={ref} style={{ '--p': p }}>
          {steps.map((s, n) => (
            <li key={s.no} className={p >= n / (steps.length - 1) - 0.001 ? 'is-on' : ''}>
              <span className="pline__dot" />
              <span className="pline__no">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="chips process3__chips">
          {approach.engagements.items.map((e) => (
            <span key={e} className="chip">
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 7 — Founders: one sentence with name chips -------------------------------- */

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="m3.5 6 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M6.2 3.5h-1.7a1.5 1.5 0 0 0-1.5 1.6C3.4 11.3 8.7 16.6 14.9 17a1.5 1.5 0 0 0 1.6-1.5v-1.7a1 1 0 0 0-.8-1l-2.6-.6a1 1 0 0 0-1 .3l-1 1.1a10 10 0 0 1-4.7-4.7l1.1-1a1 1 0 0 0 .3-1l-.6-2.6a1 1 0 0 0-1-.8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

function FounderChip({ f, open, setOpen, tilt }) {
  const { openContact } = useUi();
  const leave = useRef(null);
  const hoverable = () => window.matchMedia('(hover: hover)').matches;
  const isOpen = open === f.id;
  return (
    <span
      className={`fname ${isOpen ? 'is-open' : ''}`}
      data-accent={f.accent}
      onPointerEnter={() => {
        if (!hoverable()) return;
        clearTimeout(leave.current);
        setOpen(f.id);
      }}
      onPointerLeave={() => {
        if (!hoverable()) return;
        leave.current = setTimeout(() => setOpen((o) => (o === f.id ? null : o)), 180);
      }}
    >
      <button
        className="fname__chip"
        style={{ '--tilt': tilt }}
        aria-expanded={isOpen}
        aria-controls={`fpop-${f.id}`}
        onClick={() => setOpen((o) => (o === f.id ? null : f.id))}
      >
        <img src={f.photo} alt="" />
        {f.name}
      </button>
      <span className="fpop" id={`fpop-${f.id}`} role="group" aria-label={`${f.name}, ${f.title}`}>
        <span className="fpop__head">
          <img src={f.photo} alt="" />
          <span>
            <b>{f.name}</b>
            <small>{f.title}</small>
          </span>
          <button className="fpop__x" aria-label="Close" onClick={() => setOpen(null)}>
            ×
          </button>
        </span>
        <span className="fpop__line">{f.short}</span>
        <span className="fpop__actions">
          <Button variant="dark" onClick={() => openContact({ interest: f.id === 'dhruv' ? 'AI & Automation' : 'Creative & Marketing' })}>
            Talk to {f.name}
          </Button>
          <a className="fpop__icon" href={`mailto:${f.email}`} aria-label={`Email ${f.name}`} title={f.email}>
            <MailIcon />
          </a>
          <a className="fpop__icon" href={`tel:${f.tel}`} aria-label={`Call ${f.name}`} title={f.phone}>
            <PhoneIcon />
          </a>
        </span>
      </span>
    </span>
  );
}

function Founders() {
  const [open, setOpen] = useState(null);
  const [riddhi, dhruv] = founders;
  const [s1, s2, s3] = story.team.sentence;
  const wrap = useRef(null);

  // Close on Escape or a tap outside the chips.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    const onDown = (e) => !e.target.closest?.('.fname') && setOpen(null);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <section id="team" className="chapter founders" ref={wrap}>
      <div className="wrap founders__layout">
        <Reveal>
          <h2 className="label founders__eyebrow">{story.team.eyebrow}</h2>
          <p className="founders__sentence">
            {s1} <FounderChip f={riddhi} open={open} setOpen={setOpen} tilt="-2deg" /> {s2}{' '}
            <FounderChip f={dhruv} open={open} setOpen={setOpen} tilt="2deg" /> {s3}
          </p>
          <p className="founders__foot">
            {story.team.title} {story.team.lead}
          </p>
          <p className="founders__hint">
            <span className="founders__hint--hover">Hover a name to reach them directly.</span>
            <span className="founders__hint--tap">Tap a name to reach them directly.</span>
          </p>
        </Reveal>
        {/* The NTB mark splits into two halves, one per founder; the half for the open name lights up. */}
        <div className={`fmark ${open ? `is-${open}` : ''}`} aria-hidden="true">
          <span className="fmark__half fmark__half--a" />
          <span className="fmark__half fmark__half--b" />
        </div>
      </div>
    </section>
  );
}


/* 8 — Closing ------------------------------------------------------------ */

function Closing() {
  const { openContact } = useUi();
  return (
    <section className="closing3">
      <Reveal className="wrap closing3__inner">
        <h2 className="closing3__title">{v3.closing.title}</h2>
        <p className="closing3__body">{story.closing.body}</p>
        <Button variant="dark" onClick={() => openContact()}>
          {v3.closing.cta}
        </Button>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Services />
      <Beliefs />
      <AiFeature />
      <ProcessLine />
      <Founders />
      <Closing />
    </>
  );
}
