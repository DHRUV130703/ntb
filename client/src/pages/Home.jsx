import { useEffect, useRef, useState } from 'react';
import { capabilities, story, home, approach, whatWeDo, founders, faqs } from '../content/site.js';
import { useUi } from '../state/ui.jsx';
import { Button, Reveal, PlusIcon } from '../components/ui.jsx';
import { Visual, BrandBoard, Reel, CreatorChip, ChatAgent, MiniDash, FlowNode } from '../components/Visuals.jsx';
import { OrderDashboardDemo, FlowDemo } from '../components/Demos.jsx';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CAP_VISUAL = { creative: 'brand', creators: 'creator', ai: 'chat' };

/* 1 — Hero ---------------------------------------------------------------- */

const HERO_TILES = [
  { C: BrandBoard, x: '44%', y: '9%', r: -7, d: 0, w: 300 },
  { C: Reel, x: '74%', y: '6%', r: 6, d: 1.2, w: 170 },
  { C: ChatAgent, x: '60%', y: '38%', r: -3, d: 0.6, w: 270 },
  { C: CreatorChip, x: '30%', y: '40%', r: 5, d: 1.8, w: 240 },
  { C: MiniDash, x: '86%', y: '42%', r: 8, d: 0.9, w: 200 },
  { C: FlowNode, x: '14%', y: '14%', r: -10, d: 2.4, w: 190 },
];

function Hero() {
  const { openContact } = useUi();
  const stage = useRef(null);

  // Gentle parallax with the pointer.
  useEffect(() => {
    if (reduced()) return;
    const el = stage.current;
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty('--px', x.toFixed(3));
      el.style.setProperty('--py', y.toFixed(3));
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__stage" ref={stage} aria-hidden="true">
        {HERO_TILES.map(({ C, x, y, r, d, w }, i) => (
          <div key={i} className="hero__tile" style={{ left: x, top: y, '--r': `${r}deg`, '--d': `${d}s`, '--w': `${w}px`, '--depth': (i % 3) + 1 }}>
            <C />
          </div>
        ))}
      </div>
      <div className="hero__copy">
        <p className="hero__eyebrow">{story.hero.eyebrow}</p>
        <h1 id="hero-title" className="hero__title">
          {story.hero.title[0]}
          <br />
          {story.hero.title[1]}
        </h1>
        <Button variant="glass" onClick={() => openContact()}>
          {story.hero.cta}
        </Button>
      </div>
    </section>
  );
}

/* 2 — Capabilities ---------------------------------------------------------- */

function Capabilities() {
  const { openService } = useUi();
  return (
    <section id="capabilities" className="chapter">
      <div className="wrap">
        <Reveal className="chapter__head">
          <h2 className="h-lg">{story.capabilities.title}</h2>
        </Reveal>
      </div>
      <div className="rail" role="list">
        {capabilities.map((c, i) => (
          <Reveal key={c.id} role="listitem" delay={i * 90}>
            <button className="pcard" data-accent={c.accent} onClick={() => openService(c.id)} aria-label={`${c.title}: see services`}>
              <span className="pcard__media">
                <span className="pcard__no">{c.no}</span>
                <Visual name={CAP_VISUAL[c.id]} />
              </span>
              <span className="pcard__info">
                <span>
                  <span className="pcard__title">{c.title}</span>
                  <span className="pcard__line">{c.line}</span>
                </span>
                <span className="tag">{story.capabilities.tags[c.id]}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* 3 — Where to start (uppercase list + cursor preview) ------------------------ */

function StartList() {
  const { openContact } = useUi();
  const [active, setActive] = useState(null);
  const preview = useRef(null);
  const list = useRef(null);

  useEffect(() => {
    const el = list.current;
    if (!el || reduced() || !window.matchMedia('(hover: hover)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      preview.current?.style.setProperty('transform', `translate(${e.clientX - r.left + 24}px, ${e.clientY - r.top - 60}px)`);
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  const item = active != null ? story.start.items[active] : null;
  return (
    <section id="start" className="chapter chapter--grid">
      <p className="label label--center">{story.start.eyebrow}</p>
      <div className="biglist" ref={list} onPointerLeave={() => setActive(null)}>
        {story.start.items.map((s, i) => (
          <button
            key={s.label}
            className={`biglist__item ${active === i ? 'is-active' : ''}`}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onClick={() => openContact({ interest: s.interest })}
          >
            {s.label}
          </button>
        ))}
        <div ref={preview} className={`biglist__preview ${item ? 'is-on' : ''}`} data-accent={item?.accent} aria-hidden="true">
          {item && (
            <>
              <div className="biglist__visual">
                <Visual name={item.visual} />
              </div>
              <span className="biglist__line">{item.line}</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* 4 — Why (tilted cards on charcoal) --------------------------------------- */

const WHY_STYLE = [
  { bg: 'var(--paper)', r: -9, x: '4%', y: '6%' },
  { bg: 'var(--green)', r: 6, x: '27%', y: '40%' },
  { bg: 'var(--terracotta)', r: -5, x: '50%', y: '4%' },
  { bg: 'var(--periwinkle)', r: 9, x: '74%', y: '30%' },
];

function Why() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section id="why" className={`why ${inView ? 'is-in' : ''}`} ref={ref}>
      <div className="why__cards">
        {home.why.points.map((p, i) => (
          <article key={p.title} className="why__card" style={{ '--bg': WHY_STYLE[i].bg, '--r': `${WHY_STYLE[i].r}deg`, left: WHY_STYLE[i].x, top: WHY_STYLE[i].y, '--i': i }}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
      <div className="wrap why__foot">
        <h2 className="h-lg">{story.why.title}</h2>
        <p className="label">{story.why.eyebrow}</p>
      </div>
    </section>
  );
}

/* 5 — AI, shown not told ------------------------------------------------- */

function AiShowcase() {
  const { openContact } = useUi();
  const [how, setHow] = useState(false);
  return (
    <section id="ai" className="chapter">
      <div className="wrap">
        <Reveal className="chapter__head chapter__head--split">
          <h2 className="h-lg">{story.ai.title}</h2>
          <Button variant="dark" onClick={() => openContact({ interest: 'AI & Automation' })}>
            {whatWeDo.ai.cta}
          </Button>
        </Reveal>
        <div className="duo">
          <Reveal className="hcard hcard--sand">
            <div className="hcard__media">
              <FlowDemo />
            </div>
            <div className="hcard__foot">
              <span className="tag tag--outline">{story.ai.flowTag}</span>
              <h3 className="h-md">{story.ai.flowTitle}</h3>
            </div>
          </Reveal>
          <Reveal className="hcard hcard--paper" delay={120}>
            <div className="hcard__media">
              <OrderDashboardDemo />
            </div>
            <div className="hcard__foot">
              <span className="tag tag--outline">{story.ai.dashTag}</span>
              <span className="tag" data-accent="pink">
                Demo data
              </span>
              <h3 className="h-md">{story.ai.dashTitle}</h3>
            </div>
          </Reveal>
        </div>
        <div className="how">
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
        </div>
      </div>
    </section>
  );
}

/* 6 — Process ------------------------------------------------------------ */

function Process() {
  const [open, setOpen] = useState(0);
  return (
    <section id="process" className="chapter chapter--paper">
      <div className="wrap">
        <Reveal className="chapter__head">
          <h2 className="h-lg">{story.process.title}</h2>
        </Reveal>
        <ol className="steps">
          {approach.steps.map((s, i) => (
            <li key={s.no} className={`step ${open === i ? 'is-open' : ''}`}>
              <button className="step__btn" aria-expanded={open === i} onPointerEnter={() => setOpen(i)} onFocus={() => setOpen(i)} onClick={() => setOpen(i)}>
                <span className="step__no">{s.no}</span>
                <span className="step__title">{s.title}</span>
              </button>
              <p className="step__body">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="chips">
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

/* 7 — Team -------------------------------------------------------------- */

function Team() {
  const { openFounder } = useUi();
  return (
    <section id="team" className="chapter team">
      <div className="wrap">
        <Reveal>
          <p className="label label--center">{story.team.eyebrow}</p>
          <h2 className="team__title">The Founders</h2>
          <p className="team__lead">
            {story.team.title}
            <br />
            {story.team.lead}
          </p>
        </Reveal>
        <div className="team__pills">
          {founders.map((f, i) => (
            <Reveal key={f.id} delay={i * 120}>
              <button className="fpill" data-accent={f.accent} onClick={() => openFounder(f.id)}>
                <img src={f.photo} alt="" />
                <span>
                  <b>{f.name}</b>
                  <small>{f.role.replace('Founder — ', '')}</small>
                </span>
                <span className="fpill__more" aria-hidden="true">
                  <PlusIcon />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8 — FAQ + closing -------------------------------------------------------- */

function Faq() {
  return (
    <section id="faq" className="chapter chapter--tight">
      <div className="wrap faq-wrap">
        <h2 className="h-md">Questions</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span className="faq__pm">
                  <PlusIcon />
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <StartList />
      <Why />
      <AiShowcase />
      <Process />
      <Team />
      <Faq />
    </>
  );
}
