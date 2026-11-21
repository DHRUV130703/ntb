import { about, founders } from '../content/site.js';
import { Reveal } from '../components/ui.jsx';
import { PageHead, CtaBand } from '../components/blocks.jsx';

export default function About() {
  return (
    <>
      <PageHead eyebrow={about.eyebrow} title={about.title} lead={about.lead} />

      <section className="section--tight">
        <div className="wrap split">
          <Reveal className="stack lead muted">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal className="stack" delay={120}>
            {about.together.map((p) => (
              <p key={p} className="h3">
                {p}
              </p>
            ))}
            <div className="stack lead muted" style={{ marginTop: 28 }}>
              {about.closing.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="people-title">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">The people behind the brand</p>
            <h2 id="people-title" className="h1">
              Two founders. Two perspectives.
            </h2>
          </Reveal>
          <div className="founders">
            {founders.map((f, i) => (
              <Reveal key={f.id} className="founder" data-accent={f.accent} delay={i * 120}>
                <div className="founder__photo">
                  <img src={f.photo} alt={`${f.name}, ${f.role}`} loading="lazy" width="900" height="1125" />
                  <span className="tag">{f.role.replace('Founder — ', '')}</span>
                </div>
                <div className="founder__body">
                  <h3 className="founder__name">{f.name}</h3>
                  <p style={{ fontWeight: 500 }}>{f.role}</p>
                  <p className="muted">{f.bio}</p>
                  <p className="muted" style={{ fontSize: 15 }}>
                    <b style={{ color: 'var(--ink)', fontWeight: 500 }}>Leads:</b> {f.owns}
                  </p>
                  <div className="founder__contact">
                    <a href={`mailto:${f.email}`}>{f.email}</a>
                    <a href={`tel:${f.tel}`}>{f.phone}</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--olive" aria-labelledby="believe-title">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">What we believe</p>
            <h2 id="believe-title" className="h1">
              Six things we hold ourselves to.
            </h2>
          </Reveal>
          <div className="scatter">
            {about.beliefs.map((b, i) => (
              <Reveal
                key={b}
                className="scard"
                delay={i * 70}
                style={{
                  '--rot': `${[-2, 1.5, -1, 2, -1.5, 1][i]}deg`,
                  '--card-bg': ['var(--cream)', 'var(--terracotta)', 'var(--paper)', 'var(--pink)', 'var(--lime)', 'var(--periwinkle)'][i],
                }}
              >
                <span className="scard__no">0{i + 1}</span>
                <p>{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="We’re only getting started." body="Come build something with us." cta="Let’s Talk" />
    </>
  );
}
