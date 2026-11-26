import { useCallback, useEffect, useRef, useState } from 'react';
import { founders, story, approach, about, whatWeDo, v3 } from '../content/site.js';
import { useUi } from '../state/ui.jsx';
import { Button, Reveal, PlusIcon, MailIcon, PhoneIcon } from '../components/ui.jsx';
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

/* 3 — Services: a calm list with one preview card -------------------------- */

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Services() {
  const { openService, openContact } = useUi();
  const [i, setI] = useState(0);
  const services = v3.services;
  const canHover = () => window.matchMedia('(hover: hover)').matches;

  // The same card is used beside the list (laptops) and inside the active row (phones).
  const card = (x) => (
    <>
      <div className="svlist__media">
        <Visual name={x.visual} />
      </div>
      <div className="svlist__body">
        <ul>
          {x.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <Button variant="dark" onClick={() => openService(x.cap)}>
          Explore {x.name}
        </Button>
      </div>
    </>
  );

  return (
    <section id="services" className="svlist">
      <div className="wrap">
        <header className="svlist__head">
          <p className="label">What we do</p>
          <h2>Pick one to see everything we do there.</h2>
        </header>

        <div className="svlist__layout">
          <ol className="svlist__rows">
            {services.map((x, n) => (
              <li key={x.name} className={`svlist__item ${n === i ? 'is-active' : ''}`} data-accent={x.accent}>
                <button
                  className="svlist__row"
                  aria-current={n === i ? 'true' : undefined}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setI(n)}
                  onFocus={() => setI(n)}
                  onClick={() => (canHover() ? openService(x.cap) : setI(n))}
                >
                  <span className="svlist__no">{String(n + 1).padStart(2, '0')}</span>
                  <span className="svlist__name">{x.name}</span>
                  <span className="svlist__go">
                    <ArrowIcon />
                  </span>
                </button>
                <div className="svlist__inline" inert={n === i ? undefined : ''}>
                  <div className="svlist__inner">
                    <div className="svlist__sheet">{card(x)}</div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <aside className="svlist__card" data-accent={services[i].accent} aria-label={`${services[i].name} preview`}>
            <div key={i} className="svlist__cardin">
              {card(services[i])}
            </div>
          </aside>
        </div>

        <div className="svlist__foot">
          <Button variant="dark" onClick={() => openContact()}>
            Not sure where to start? Let’s talk
          </Button>
        </div>
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

/* 7 — Founders: two simple cards ------------------------------------------ */

function Founders() {
  const { openContact } = useUi();
  return (
    <section id="team" className="chapter founders">
      <div className="wrap">
        <Reveal>
          <p className="label founders__eyebrow">{story.team.eyebrow}</p>
          <h2 className="founders__title">{story.team.title}</h2>
          <p className="founders__lead">{story.team.lead}</p>
        </Reveal>

        <div className="founders__cards">
          {founders.map((f, n) => (
            <Reveal as="article" key={f.id} delay={n * 90} className="fcard" data-accent={f.accent}>
              <header className="fcard__head">
                <img src={f.avatar} alt="" width="64" height="64" />
                <div>
                  <h3>{f.name}</h3>
                  <p className="fcard__role">{f.title}</p>
                </div>
              </header>
              <p className="fcard__line">{f.short}</p>
              <div className="fcard__actions">
                <Button variant="dark" onClick={() => openContact({ interest: f.id === 'dhruv' ? 'AI & Automation' : 'Creative & Marketing' })}>
                  Talk to {f.name}
                </Button>
                <a className="fcard__icon" href={`mailto:${f.email}`} aria-label={`Email ${f.name}`} title={f.email}>
                  <MailIcon />
                </a>
                <a className="fcard__icon" href={`tel:${f.tel}`} aria-label={`Call ${f.name}`} title={f.phone}>
                  <PhoneIcon />
                </a>
              </div>
            </Reveal>
          ))}
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
