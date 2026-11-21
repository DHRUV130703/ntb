import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { home, capabilities, work, about } from '../content/site.js';
import { Button, Reveal, Tiles, ArrowIcon } from '../components/ui.jsx';
import { Marquee, CtaBand } from '../components/blocks.jsx';

const POINT_ACCENTS = ['terracotta', 'pink', 'periwinkle', 'lime'];
const POINT_ICONS = [
  // creative · connected · intelligent · execution
  <path key="a" d="M5 15c2-6 8-10 10-10-1 3-4 9-10 10Zm0 0 3-3" />,
  <path key="b" d="M7 7a3 3 0 1 1 0 .01M13 13a3 3 0 1 1 0 .01M9 9l2 2" />,
  <path key="c" d="M10 3v3m0 8v3M3 10h3m8 0h3M5.5 5.5l2 2m5 5 2 2m0-9-2 2m-5 5-2 2" />,
  <path key="d" d="M4 10.5 8 14.5 16 5.5" />,
];

const BIG_LIST = [
  { label: 'Branding', to: '/what-we-do#creative', no: '01' },
  { label: 'Content', to: '/what-we-do#creative', no: '01' },
  { label: 'Creators', to: '/what-we-do#creators', no: '02' },
  { label: 'AI Agents', to: '/what-we-do#ai', no: '03' },
  { label: 'Dashboards', to: '/what-we-do#ai', no: '03' },
];

function Hero() {
  const mark = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (mark.current) mark.current.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0) rotate(${window.scrollY * -0.01}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [l1, l2, l3] = home.hero.title.split('. ');
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__grid" />
      <img ref={mark} className="hero__mark" src="/brand/ntb-mark-cream.png" alt="" />
      <span className="hero__coord" style={{ left: '56%', top: '16%', '--r': '18deg' }}>
        19.07°N
      </span>
      <span className="hero__coord" style={{ left: '80%', top: '24%', '--r': '150deg' }}>
        72.87°E
      </span>

      <div className="wrap hero__inner">
        <div>
          <p className="hero__intro">{home.hero.intro}</p>
          <h1 id="hero-title" className="hero__title">
            <span>{l1}.</span>
            <span>{l2}.</span>
            <span>{l3}</span>
          </h1>
          <p className="hero__lead">{home.hero.lead}</p>
          <div className="hero__ctas">
            <Button to="/contact" variant="cream">
              Let’s Talk
            </Button>
            <Button to="/what-we-do" variant="glass" icon="arrow">
              Explore What We Do
            </Button>
          </div>
        </div>

        <div className="hero__cards">
          {capabilities.map((c, i) => (
            <Reveal key={c.id} delay={150 + i * 120}>
              <Link to={c.cta.to} className="pcard" data-accent={c.accent}>
                <span className="pcard__thumb">{c.no}</span>
                <span>
                  <span className="pcard__title">{c.title}</span>
                  <span className="pcard__sub" style={{ display: 'block' }}>
                    {c.line}
                  </span>
                </span>
                <span className="tag">{['Brands', 'People', 'Systems'][i]}</span>
              </Link>
            </Reveal>
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
      <Marquee />

      {/* Introduction */}
      <section className="section">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <h2 className="h2">{home.introduction.title}</h2>
          </Reveal>
          <Reveal className="stack lead muted" delay={120}>
            {home.introduction.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>{home.hero.body}</p>
            <p style={{ color: 'var(--ink)', fontWeight: 500 }}>
              We don’t just create ideas. We help turn them into something meaningful for businesses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="section section--paper" aria-labelledby="wwd-title">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">{home.whatWeDo.eyebrow}</p>
            <h2 id="wwd-title" className="h1" style={{ maxWidth: '14ch' }}>
              {home.whatWeDo.title}
            </h2>
          </Reveal>
          <div className="caps">
            {capabilities.map((c, i) => (
              <Reveal key={c.id} className="cap" data-accent={c.accent} delay={i * 110}>
                <div className="cap__head">
                  <span className="tag" style={{ background: 'rgba(255,255,255,.55)', color: 'inherit', width: 'fit-content' }}>
                    {c.title}
                  </span>
                  <span className="cap__no">{c.no}</span>
                </div>
                <div className="cap__body">
                  <h3 className="cap__title">{c.title}</h3>
                  <p className="cap__line">{c.line}</p>
                  <p className="muted" style={{ fontSize: 15.5 }}>
                    {c.body}
                  </p>
                  <ul className="cap__list">
                    {(c.items ?? c.groups.flatMap((g) => g.items).slice(0, 8)).map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <div className="cap__foot">
                    <Button to={c.cta.to} icon="arrow">
                      {c.cta.label}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Big hover list */}
      <section className="section grid-bg" aria-label="Services">
        <div className="wrap">
          <p className="eyebrow" style={{ display: 'flex', justifyContent: 'center' }}>
            Pick a starting point
          </p>
          <ul className="biglist">
            {BIG_LIST.map((b) => (
              <li key={b.label}>
                <Link to={b.to}>
                  {b.label}
                  <sup>{b.no}</sup>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why */}
      <section className="section section--dark" aria-labelledby="why-title">
        <div className="wrap">
          <Reveal className="split" style={{ alignItems: 'end' }}>
            <div>
              <p className="eyebrow">{home.why.eyebrow}</p>
              <h2 id="why-title" className="h1">
                {home.why.title}
              </h2>
            </div>
            <p className="lead muted">{home.why.lead}</p>
          </Reveal>
          <div className="points">
            {home.why.points.map((p, i) => (
              <Reveal key={p.title} className="point" data-accent={POINT_ACCENTS[i]} delay={i * 90}>
                <span className="point__icon">
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {POINT_ICONS[i]}
                  </svg>
                </span>
                <h3>{p.title}</h3>
                <p className="muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section" aria-labelledby="work-title">
        <div className="wrap">
          <Reveal className="split" style={{ alignItems: 'end' }}>
            <div>
              <p className="eyebrow">{home.featured.eyebrow}</p>
              <h2 id="work-title" className="h1">
                {home.featured.title}
              </h2>
            </div>
            <div className="stack">
              <p className="lead muted">{home.featured.body}</p>
              <Button to="/work" icon="arrow">
                Explore Our Work
              </Button>
            </div>
          </Reveal>
          <div className="work-grid">
            {work.categories.map((c, i) => (
              <Reveal key={c.no} delay={(i % 2) * 100}>
                <Link to="/work" className="wcard" data-accent={c.accent}>
                  <div className="wcard__visual">
                    <Tiles accent={c.accent} cols={6} rows={4} seed={i + 3} />
                  </div>
                  <div className="wcard__body">
                    <div>
                      <span className="wcard__no">{c.no}</span>
                      <h3 className="wcard__title">{c.title}</h3>
                    </div>
                    <ArrowIcon size={22} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs teaser */}
      <section className="section section--olive" aria-labelledby="beliefs-title">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">What we believe</p>
            <h2 id="beliefs-title" className="h1" style={{ maxWidth: '16ch' }}>
              {about.lead}
            </h2>
          </Reveal>
          <div className="scatter">
            {about.beliefs.map((b, i) => (
              <Reveal
                key={b}
                className="scard"
                delay={i * 70}
                style={{
                  '--rot': `${[-3, 2, -1.5, 2.5, -2, 1.5][i]}deg`,
                  '--dy': `${[0, 18, -6, 10, -10, 14][i]}px`,
                  '--card-bg': ['var(--cream)', 'var(--terracotta)', 'var(--paper)', 'var(--pink)', 'var(--lime)', 'var(--periwinkle)'][i],
                  '--card-fg': 'var(--ink)',
                }}
              >
                <span className="scard__no">0{i + 1}</span>
                <p>{b}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 56 }}>
            <Button to="/about" variant="cream" icon="arrow">
              Meet the founders
            </Button>
          </div>
        </div>
      </section>

      <CtaBand title={home.closing.title} body={home.closing.body} kicker={home.closing.kicker} />
    </>
  );
}
