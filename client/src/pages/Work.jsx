import { work } from '../content/site.js';
import { Reveal, Tiles } from '../components/ui.jsx';
import { PageHead, CtaBand } from '../components/blocks.jsx';

function ProjectCard({ p, i }) {
  const cat = work.categories.find((c) => c.title === p.category) ?? work.categories[0];
  return (
    <Reveal className="wcard" data-accent={cat.accent} delay={(i % 2) * 100}>
      <div className="wcard__visual">
        {p.image ? <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Tiles accent={cat.accent} cols={6} rows={4} seed={i + 11} />}
        {p.concept && (
          <span className="tag" style={{ position: 'absolute', top: 14, left: 14 }}>
            Concept project
          </span>
        )}
      </div>
      <div className="wcard__body" style={{ display: 'block' }}>
        <span className="wcard__no">
          {p.category} · {p.client}
        </span>
        <h3 className="wcard__title">{p.title}</h3>
        <p className="muted" style={{ marginTop: 8 }}>
          {p.overview}
        </p>
      </div>
    </Reveal>
  );
}

export default function Work() {
  const hasProjects = work.projects.length > 0;
  return (
    <>
      <PageHead eyebrow={work.eyebrow} title={work.title} lead={`${work.lead} ${work.body}`} />

      <section className="section--tight">
        <div className="wrap">
          <div className="work-grid" style={{ marginTop: 0 }}>
            {work.categories.map((c, i) => (
              <Reveal key={c.no} className="wcard" data-accent={c.accent} delay={(i % 2) * 100}>
                <div className="wcard__visual">
                  <Tiles accent={c.accent} cols={6} rows={4} seed={i + 3} />
                </div>
                <div className="wcard__body" style={{ display: 'block' }}>
                  <span className="wcard__no">{c.no}</span>
                  <h2 className="wcard__title">{c.title}</h2>
                  <p className="muted" style={{ marginTop: 8 }}>
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 56 }}>
            {hasProjects ? (
              <div className="work-grid">
                {work.projects.map((p, i) => (
                  <ProjectCard key={p.title} p={p} i={i} />
                ))}
              </div>
            ) : (
              <Reveal className="notice">
                <span className="tag" data-accent="lime">
                  In progress
                </span>
                <p>
                  <b>Case studies are on their way.</b> We’re documenting our first projects properly: the objective, the challenge, our approach and only
                  results we can verify. Independent concept work will be clearly labelled as a concept project.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <CtaBand title="Have a project in mind?" body="Let’s talk about what you’re building." cta="Let’s Talk" />
    </>
  );
}
