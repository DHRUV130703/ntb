import { useEffect, useRef, useState } from "react";
import {
  capabilities,
  story,
  home,
  approach,
  whatWeDo,
  founders,
  faqs,
} from "../content/site.js";
import { useUi } from "../state/ui.jsx";
import { Button, Reveal, PlusIcon } from "../components/ui.jsx";
import { Visual } from "../components/Visuals.jsx";
import { OrderDashboardDemo, FlowDemo } from "../components/Demos.jsx";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const CAP_VISUAL = { creative: "brand", creators: "creator", ai: "chat" };

/* 1 — Hero ---------------------------------------------------------------- */

const PHRASE_MS = 2600;

/** "Not to brag, but we [chip]" — the chip flips through what we do; a matching card follows. */
function Hero() {
  const { openContact, openService } = useUi();
  const phrases = story.hero.phrases;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still] = useState(reduced);

  useEffect(() => {
    if (still || paused) return;
    const t = setTimeout(
      () => setI((n) => (n + 1) % phrases.length),
      PHRASE_MS,
    );
    return () => clearTimeout(t);
  }, [i, paused, still, phrases.length]);

  const p = phrases[i];
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">{story.hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="sr-only">
              {story.hero.lead.join(" ")}{" "}
              {phrases.map((x) => x.text).join(", ")}.
            </span>
            <span aria-hidden="true">
              {story.hero.lead[0]}
              <br />
              {story.hero.lead[1]}{" "}
              <span className="hero__chipwrap">
                <span
                  key={i}
                  className="hero__chip"
                  data-accent={p.accent}
                  style={{ "--tilt": i % 2 ? "2.5deg" : "-2.5deg" }}
                >
                  {p.text}
                </span>
              </span>
            </span>
          </h1>

          <div
            className="hero__segs"
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
                className={`hero__seg ${n === i ? "is-active" : ""} ${n < i ? "is-done" : ""} ${paused || still ? "is-paused" : ""}`}
                style={{ "--ms": `${PHRASE_MS}ms` }}
                onClick={() => setI(n)}
              >
                <i />
                <span>{x.text}</span>
              </button>
            ))}
          </div>

          <div className="hero__foot">
            <Button variant="dark" onClick={() => openContact()}>
              {story.hero.cta}
            </Button>
            <p className="hero__tagline">
              {story.hero.title[0]} {story.hero.title[1]}
            </p>
          </div>
        </div>

        <button
          key={i}
          className="hero__card"
          data-accent={p.accent}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onClick={() => openService(p.service)}
          aria-label={`${p.text}: see services`}
        >
          <span className="hero__card-media">
            <Visual name={p.visual} />
          </span>
          <span className="hero__card-info">
            <span>
              <b>{p.text.replace(/^\w/, (c) => c.toUpperCase())}</b>
              <small>{p.caption}</small>
            </span>
            <span className="hero__card-go" aria-hidden="true">
              <PlusIcon />
            </span>
          </span>
        </button>
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
            <button
              className="pcard"
              data-accent={c.accent}
              onClick={() => openService(c.id)}
              aria-label={`${c.title}: see services`}
            >
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
    if (!el || reduced() || !window.matchMedia("(hover: hover)").matches)
      return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      preview.current?.style.setProperty(
        "transform",
        `translate(${e.clientX - r.left + 24}px, ${e.clientY - r.top - 60}px)`,
      );
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  const item = active != null ? story.start.items[active] : null;
  return (
    <section id="start" className="chapter chapter--grid">
      <p className="label label--center">{story.start.eyebrow}</p>
      <div
        className="biglist"
        ref={list}
        onPointerLeave={() => setActive(null)}
      >
        {story.start.items.map((s, i) => (
          <button
            key={s.label}
            className={`biglist__item ${active === i ? "is-active" : ""}`}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onClick={() => openContact({ interest: s.interest })}
          >
            {s.label}
          </button>
        ))}
        <div
          ref={preview}
          className={`biglist__preview ${item ? "is-on" : ""}`}
          data-accent={item?.accent}
          aria-hidden="true"
        >
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
  { bg: "var(--paper)", r: -9, x: "4%", y: "6%" },
  { bg: "var(--green)", r: 6, x: "27%", y: "40%" },
  { bg: "var(--terracotta)", r: -5, x: "50%", y: "4%" },
  { bg: "var(--periwinkle)", r: 9, x: "74%", y: "30%" },
];

function Why() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section id="why" className={`why ${inView ? "is-in" : ""}`} ref={ref}>
      <div className="why__cards">
        {home.why.points.map((p, i) => (
          <article
            key={p.title}
            className="why__card"
            style={{
              "--bg": WHY_STYLE[i].bg,
              "--r": `${WHY_STYLE[i].r}deg`,
              left: WHY_STYLE[i].x,
              top: WHY_STYLE[i].y,
              "--i": i,
            }}
          >
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
          <Button
            variant="dark"
            onClick={() => openContact({ interest: "AI & Automation" })}
          >
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
          <button
            className="how__toggle"
            aria-expanded={how}
            onClick={() => setHow((h) => !h)}
          >
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
            <li key={s.no} className={`step ${open === i ? "is-open" : ""}`}>
              <button
                className="step__btn"
                aria-expanded={open === i}
                onPointerEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
              >
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

/* 7 — Founders: a group chat ------------------------------------------- */

const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10 16V4M5 9l5-5 5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** The founders introduce themselves as messages that arrive one by one, ending in a reply bar. */
function Founders() {
  const { openContact } = useUi();
  const thread = story.team.chat;
  const byId = Object.fromEntries(founders.map((f) => [f.id, f]));
  const ref = useRef(null);
  const [shown, setShown] = useState(() => (reduced() ? thread.length : 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (shown >= thread.length) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStarted(true),
      { threshold: 0.35 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown, thread.length]);

  // Reveal the next bubble after a short "typing" pause, longer for longer messages.
  useEffect(() => {
    if (!started || shown >= thread.length) return;
    const delay =
      shown === 0 ? 350 : Math.min(1400, 450 + thread[shown].text.length * 9);
    const t = setTimeout(() => setShown((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [started, shown, thread]);

  const typing =
    started && shown < thread.length ? byId[thread[shown].from] : null;
  const talkTo = (id) =>
    openContact({
      interest:
        id === "dhruv"
          ? "AI & Automation"
          : id === "riddhi"
            ? "Creative & Marketing"
            : undefined,
    });

  return (
    <section id="team" className="chapter founders">
      <div className="wrap founders__grid">
        <Reveal className="founders__intro">
          <p className="label">{story.team.eyebrow}</p>
          <h2 className="h-lg">{story.team.title}</h2>
          <p className="founders__lead">{story.team.lead}</p>
          <ul className="founders__people">
            {founders.map((f) => (
              <li key={f.id} data-accent={f.accent}>
                <img src={f.photo} alt="" />
                <span>
                  <b>{f.name}</b>
                  <small>{f.title}</small>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="chat-wrap" delay={120}>
          <div className="chat" ref={ref}>
            <header className="chat__head">
              <span className="chat__faces">
                {founders.map((f) => (
                  <img key={f.id} src={f.photo} alt="" />
                ))}
              </span>
              <span className="chat__who">
                <b>NOT TO BRAG · Founders</b>
                <small>
                  {typing
                    ? `${typing.name} is typing…`
                    : `${founders.map((f) => f.name).join(", ")}`}
                </small>
              </span>
              <span className="chat__online" aria-label="Online" />
            </header>

            <ol
              className="chat__body"
              aria-live="polite"
              aria-label="Messages from the founders"
            >
              {thread.slice(0, shown).map((m, i) => {
                const f = byId[m.from];
                const first = i === 0 || thread[i - 1].from !== m.from;
                const last =
                  i === thread.length - 1 || thread[i + 1]?.from !== m.from;
                return (
                  <li
                    key={i}
                    className={`msg ${first ? "msg--first" : ""} ${last ? "msg--last" : ""}`}
                    data-accent={f.accent}
                  >
                    <span className="msg__avatar">
                      {last && <img src={f.photo} alt="" />}
                    </span>
                    <span className="msg__bubble">
                      {first && <b className="msg__name">{f.name}</b>}
                      <span className="msg__text">{m.text}</span>
                      <time className="msg__time">{m.time}</time>
                    </span>
                  </li>
                );
              })}
              {typing && (
                <li
                  className="msg msg--first msg--last msg--typing"
                  data-accent={typing.accent}
                >
                  <span className="msg__avatar">
                    <img src={typing.photo} alt="" />
                  </span>
                  <span className="msg__bubble">
                    <i />
                    <i />
                    <i />
                  </span>
                </li>
              )}
            </ol>

            <div
              className={`chat__reply ${shown >= thread.length ? "is-ready" : ""}`}
            >
              <div className="chat__quick">
                {founders.map((f) => (
                  <button
                    key={f.id}
                    data-accent={f.accent}
                    onClick={() => talkTo(f.id)}
                  >
                    Talk to {f.name}
                  </button>
                ))}
              </div>
              <button className="chat__input" onClick={() => talkTo()}>
                <span>{story.team.replyPlaceholder}</span>
                <span className="chat__send">
                  <SendIcon />
                </span>
              </button>
              <p className="chat__note">{story.team.note}</p>
            </div>
          </div>
        </Reveal>
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
      <Founders />
      <Faq />
    </>
  );
}
