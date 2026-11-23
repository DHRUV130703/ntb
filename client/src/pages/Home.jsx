import { useEffect, useRef, useState } from 'react';
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

/* 1 — Hero: the NTB mark assembles, then "Not to brag, but we [chip]" ------- */

const PHRASE_MS = 2600;

function Hero() {
  const { openContact } = useUi();
  const phrases = story.hero.phrases;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still] = useState(reduced);

  useEffect(() => {
    if (still || paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % phrases.length), i === 0 ? PHRASE_MS + 900 : PHRASE_MS);
    return () => clearTimeout(t);
  }, [i, paused, still, phrases.length]);

  const p = phrases[i];
  return (
    <section className={`hero3 ${still ? 'is-still' : ''}`} aria-labelledby="hero-title">
      <div className="hero3__mark" aria-hidden="true">
        <span className="hero3__piece hero3__piece--n" />
        <span className="hero3__piece hero3__piece--t" />
        <span className="hero3__piece hero3__piece--b" />
        <span className="hero3__piece hero3__piece--whole" />
      </div>

      <div className="hero3__copy">
        <p className="hero3__eyebrow">{story.hero.eyebrow}</p>
        <h1 id="hero-title" className="hero3__title">
          <span className="sr-only">
            {story.hero.lead.join(' ')} {phrases.map((x) => x.text).join(', ')}.
          </span>
          <span aria-hidden="true">
            <span className="hero3__strong">{story.hero.lead[0]}</span>
            <span className="hero3__soft">
              {story.hero.lead[1]}{' '}
              <span key={i} className="hero3__chip" data-accent={p.accent} style={{ '--tilt': i % 2 ? '2deg' : '-2deg' }}>
                {p.text}
              </span>
            </span>
          </span>
        </h1>

        <div className="hero3__row">
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
                className={`hero3__seg ${n === i ? 'is-active' : ''} ${n < i ? 'is-done' : ''} ${paused || still ? 'is-paused' : ''}`}
                style={{ '--ms': `${n === 0 && i === 0 ? PHRASE_MS + 900 : PHRASE_MS}ms` }}
                onClick={() => setI(n)}
              >
                <i />
                <span>{x.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hero3__foot">
          <p className="hero3__lead">{v3.heroLead}</p>
          <Button variant="dark" onClick={() => openContact()}>
            {story.hero.cta}
          </Button>
        </div>
      </div>

      <p className="hero3__scroll" aria-hidden="true">
        Scroll
      </p>
    </section>
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

/* 3 — Services: giant list, the one in the middle of the screen is active ---- */

function Services() {
  const { openService } = useUi();
  const [active, setActive] = useState(0);
  const items = useRef([]);
  const list = v3.services;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.dataset.n));
      },
      { rootMargin: '-46% 0px -46% 0px' },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const s = list[active];
  return (
    <section id="services" className="services3">
      <div className="wrap">
        <p className="label services3__eyebrow">What we do</p>
        <div className="services3__grid">
          <ol className="services3__list">
            {list.map((x, n) => (
              <li key={x.name} ref={(el) => (items.current[n] = el)} data-n={n}>
                <button
                  className={`services3__item ${n === active ? 'is-active' : ''}`}
                  onPointerEnter={() => setActive(n)}
                  onFocus={() => setActive(n)}
                  onClick={() => openService(x.cap)}
                >
                  {x.name}
                </button>
                <ul className="services3__inline" aria-hidden={n !== active}>
                  {x.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <aside className="services3__preview" aria-live="polite">
            <div key={active} className="spreview" data-accent={s.accent}>
              <div className="spreview__media">
                <span className="spreview__no">
                  {String(active + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
                </span>
                <Visual name={s.visual} />
              </div>
              <div className="spreview__body">
                <h3>{s.name}</h3>
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <button className="spreview__more" onClick={() => openService(s.cap)}>
                  See everything we do here <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* 4 — Beliefs: dark band, pinned while the big line cycles -------------------- */

function Beliefs() {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { start: 0, end: 1 });
  const beliefs = about.beliefs;
  const idx = Math.min(beliefs.length - 1, Math.floor(p * beliefs.length));
  return (
    <section id="beliefs" className="beliefs" ref={ref} style={{ '--n': beliefs.length }}>
      <div className="beliefs__pin">
        <div className="wrap beliefs__grid">
          <div>
            <p className="label beliefs__eyebrow">What we believe</p>
            <h2 className="h-lg beliefs__title">{v3.beliefsTitle}</h2>
            <ol className="beliefs__cells">
              {beliefs.map((b, n) => (
                <li key={b} className={n === idx ? 'is-on' : n < idx ? 'is-done' : ''}>
                  <span>{String(n + 1).padStart(2, '0')}</span>
                  {b}
                </li>
              ))}
            </ol>
          </div>
          <p key={idx} className="beliefs__big" aria-live="polite">
            {beliefs[idx]}
          </p>
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
