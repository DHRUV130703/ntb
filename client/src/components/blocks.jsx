import { useEffect, useState } from 'react';
import { Button, PlusIcon, Reveal, Tiles } from './ui.jsx';
import { faqs, marqueeWords } from '../content/site.js';

export function Marquee({ words = marqueeWords, variant }) {
  const loop = [...words, ...words];
  return (
    <div className={`marquee ${variant ? `marquee--${variant}` : ''}`} aria-label={words.join(', ')}>
      <div className="marquee__track" aria-hidden="true">
        {loop.map((w, i) => (
          <span className="marquee__item" key={i}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PageHead({ eyebrow, title, lead, children }) {
  return (
    <header className="page-head grid-bg">
      <div className="wrap">
        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="display">{title}</h1>
          {lead && <p className="lead page-head__lead">{lead}</p>}
          {children}
        </Reveal>
      </div>
    </header>
  );
}

export function CtaBand({ title, body, kicker, cta = 'Let’s Build Something Together', to = '/contact' }) {
  return (
    <section className="section--tight">
      <div className="wrap">
        <Reveal className="cta-band">
          <img className="cta-band__mark" src="/brand/ntb-mark-cream.png" alt="" />
          <h2 className="h1">{title}</h2>
          {body && (
            <p className="lead" style={{ marginTop: 24 }}>
              {body}
            </p>
          )}
          {kicker && (
            <p className="lead" style={{ marginTop: 10, fontWeight: 500 }}>
              {kicker}
            </p>
          )}
          <div style={{ marginTop: 36 }}>
            <Button to={to} variant="cream">
              {cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FaqList() {
  return (
    <div className="faq">
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <span className="pm">
              <PlusIcon />
            </span>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function WorkflowDiagram({ flow }) {
  return (
    <div className="flow">
      <h3>{flow.title}</h3>
      <p className="muted">{flow.body}</p>
      <div className="flow__nodes" role="list" aria-label={`${flow.title} workflow steps`}>
        {flow.nodes.map((n, i) => (
          <div key={n.label} style={{ display: 'contents' }}>
            {i > 0 && <span className="flow__wire" aria-hidden="true" />}
            <div className="flow__node" data-kind={n.kind} role="listitem">
              <b>{n.label}</b>
              <span>{n.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Demo data only — clearly labelled in the UI (brand rule: no invented statistics).
const DEMO_ITEMS = ['Recliner', 'Ortho mattress', 'Bedsheet set', 'Smart cushion', 'Lamp', 'Side table'];
const DEMO_CITIES = ['Mumbai', 'Pune', 'Delhi', 'Bengaluru', 'Jaipur'];
const DEMO_STATUS = ['Packed', 'Packed', 'Out for delivery', 'Delivered', 'Delayed'];
const inr = (n) => '₹' + n.toLocaleString('en-IN');

function demoOrder(id) {
  const r = (n) => Math.floor(Math.random() * n);
  return {
    id,
    item: DEMO_ITEMS[r(DEMO_ITEMS.length)],
    city: DEMO_CITIES[r(DEMO_CITIES.length)],
    amount: 2000 + r(16000),
    status: DEMO_STATUS[r(DEMO_STATUS.length)],
  };
}

export function OrderDashboardDemo() {
  const [orders, setOrders] = useState(() => Array.from({ length: 5 }, (_, i) => demoOrder(4825 - i)));
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setOrders((o) => [demoOrder(o[0].id + 1), ...o.slice(0, 4)]), 3200);
    return () => clearInterval(t);
  }, []);
  const delayed = orders.filter((o) => o.status === 'Delayed').length;
  const revenue = orders.reduce((s, o) => s + o.amount, 0);

  return (
    <div className="dash" aria-label="Example live order dashboard with demo data">
      <div className="dash__bar">
        <span className="dash__dots">
          <i />
          <i />
          <i />
        </span>
        orders.yourbusiness.com
        <span className="dash__live">LIVE</span>
      </div>
      <div className="dash__stats">
        <div className="dash__stat">
          <small>Orders shown</small>
          <b>{orders.length}</b>
        </div>
        <div className="dash__stat">
          <small>Value</small>
          <b>{inr(revenue)}</b>
        </div>
        <div className="dash__stat">
          <small>Delayed</small>
          <b>{delayed}</b>
        </div>
      </div>
      <ul className="dash__rows">
        {orders.map((o) => (
          <li className="dash__row" key={o.id}>
            <span>#{o.id}</span>
            <span>
              {o.item} <em>· {o.city}</em>
            </span>
            <span>{inr(o.amount)}</span>
            <span className="dash__status" data-s={o.status}>
              {o.status}
            </span>
          </li>
        ))}
      </ul>
      <p className="dash__note">Demonstration with randomly generated demo data. Not a client dashboard.</p>
    </div>
  );
}

export function CategoryVisual({ accent, seed }) {
  return <Tiles accent={accent} cols={6} rows={4} seed={seed} />;
}
