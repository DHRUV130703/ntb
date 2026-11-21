import { whatWeDo, capabilities, workflows } from '../content/site.js';
import { Button, Reveal } from '../components/ui.jsx';
import { PageHead, CtaBand, WorkflowDiagram, OrderDashboardDemo, Marquee } from '../components/blocks.jsx';

const contactLink = (interest, extra = '') => `/contact?interest=${encodeURIComponent(interest)}${extra}`;

function SectionTop({ data, cap }) {
  return (
    <Reveal className="svc__top">
      <span className="svc__letter" aria-hidden="true">
        {data.letter}
      </span>
      <div>
        <p className="eyebrow">
          {cap.no} · {cap.title}
        </p>
        <h2 className="h1" style={{ maxWidth: '18ch' }}>
          {data.headline}
        </h2>
        <p className="lead muted" style={{ marginTop: 22, maxWidth: '58ch' }}>
          {data.lead}
        </p>
      </div>
    </Reveal>
  );
}

export default function WhatWeDo() {
  const [creativeCap, creatorsCap, aiCap] = capabilities;
  const { creative, creators, ai } = whatWeDo;

  return (
    <>
      <PageHead eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} lead={whatWeDo.lead}>
        <div className="chips">
          {capabilities.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="chip" data-accent={c.accent}>
              {c.no} {c.title}
            </a>
          ))}
        </div>
      </PageHead>

      {/* A. Creative & Marketing */}
      <section id="creative" className="section svc section--paper" data-accent="terracotta">
        <div className="wrap">
          <SectionTop data={creative} cap={creativeCap} />
          <div className="svc__grid" style={{ '--cols': 4 }}>
            {creative.services.map((s, i) => (
              <Reveal key={s.title} className="svc__card" delay={i * 80}>
                <span className="num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="svc__cta">
            <Button to={contactLink('Creative & Marketing')}>{creative.cta}</Button>
          </div>
        </div>
      </section>

      {/* B. Creators & Collaborations */}
      <section id="creators" className="section svc" data-accent="pink">
        <div className="wrap">
          <SectionTop data={creators} cap={creatorsCap} />
          <div className="split" style={{ marginTop: 48 }}>
            <Reveal>
              <h3 className="h3" style={{ marginBottom: 18 }}>
                Services
              </h3>
              <div className="chips" style={{ marginTop: 0 }}>
                {creators.services.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="h3" style={{ marginBottom: 18 }}>
                Our approach
              </h3>
              <ol className="steps">
                {creators.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ol>
            </Reveal>
          </div>
          <div className="svc__cta">
            <Button to={contactLink('Creator Collaborations')}>{creators.cta}</Button>
          </div>

          <Reveal className="creator-band">
            <div>
              <h3 className="h2">{creators.forCreators.title}</h3>
              <p className="lead" style={{ marginTop: 14, maxWidth: '52ch' }}>
                {creators.forCreators.body}
              </p>
            </div>
            <Button to={contactLink('Creator Collaborations', '&creator=1')}>{creators.forCreators.cta}</Button>
          </Reveal>
        </div>
      </section>

      <Marquee
        variant="cream"
        words={['AI shopping assistants', 'Website chat assistants', 'AI voice agents', 'Lead qualification', 'CRM automation', 'Automated reporting', 'Operational dashboards']}
      />

      {/* C. AI & Business Intelligence */}
      <section id="ai" className="section svc section--dark" data-accent="periwinkle">
        <div className="wrap">
          <SectionTop data={ai} cap={aiCap} />

          <div className="svc__grid" style={{ '--cols': 3 }}>
            {ai.services.map((s, i) => (
              <Reveal key={s.title} className="svc__card" delay={i * 90}>
                <span className="num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p className="muted" style={{ fontSize: 15, marginBottom: 14 }}>
                  {s.lead}
                </p>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ marginTop: 'clamp(64px, 9vw, 120px)' }}>
            <p className="eyebrow">Example workflows</p>
            <h3 className="h2" style={{ maxWidth: '20ch' }}>
              Every box is a real step: a trigger, an AI decision, an update in your tools.
            </h3>
            <p className="lead muted" style={{ marginTop: 18, maxWidth: '60ch' }}>
              A few workflows we commonly design. Yours would be shaped around the tools you already use and the way your team works.
            </p>
          </Reveal>
          <div className="flows">
            {workflows.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 100}>
                <WorkflowDiagram flow={f} />
              </Reveal>
            ))}
          </div>

          <div className="split" style={{ marginTop: 'clamp(64px, 9vw, 120px)', alignItems: 'center' }}>
            <Reveal>
              <p className="eyebrow">Business intelligence</p>
              <h3 className="h2">Know where every order is. Right now.</h3>
              <p className="lead muted" style={{ marginTop: 18 }}>
                A live operations dashboard is one example of the focused tools we build. Data streams in from your store or systems, delays are flagged
                automatically, and your team sees one clear picture instead of five tabs.
              </p>
              <h4 className="h3" style={{ margin: '36px 0 14px', fontSize: 20 }}>
                How we implement
              </h4>
              <ol className="steps">
                {ai.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={150}>
              <OrderDashboardDemo />
            </Reveal>
          </div>

          <div className="svc__cta">
            <Button to={contactLink('AI & Automation')} variant="light">
              {ai.cta}
            </Button>
          </div>
        </div>
      </section>

      <CtaBand title="Not sure where to start?" body="Tell us what you’re working on. We’ll suggest the right mix of creative, creators and technology." cta="Let’s Talk" />
    </>
  );
}
