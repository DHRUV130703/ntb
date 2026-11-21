import { approach } from '../content/site.js';
import { Reveal } from '../components/ui.jsx';
import { PageHead, CtaBand } from '../components/blocks.jsx';

export default function Approach() {
  return (
    <>
      <PageHead eyebrow={approach.eyebrow} title={approach.title} lead={`${approach.lead} ${approach.body}`} />

      <section className="section--tight">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Our process</p>
          </Reveal>
          <ol className="process" style={{ marginTop: 0 }}>
            {approach.steps.map((s, i) => (
              <Reveal as="li" key={s.no} delay={i * 90}>
                <span className="process__no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="engage-title">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">{approach.engagements.title}</p>
            <h2 id="engage-title" className="h1">
              Flexible ways to work together.
            </h2>
            <p className="lead muted" style={{ marginTop: 22 }}>
              {approach.engagements.lead}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ol className="steps">
              {approach.engagements.items.map((it) => (
                <li key={it} style={{ fontSize: 'clamp(19px, 1.8vw, 24px)', fontWeight: 500, letterSpacing: '-0.02em' }}>
                  {it}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Good work starts with a good conversation." body="Tell us what you’re trying to achieve. We’ll take it from there." cta="Start the conversation" />
    </>
  );
}
