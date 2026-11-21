import { useEffect, useState } from 'react';

// Demo data only, visibly labelled (brand rule 8).
const ITEMS = ['Recliner', 'Ortho mattress', 'Bedsheet set', 'Smart cushion', 'Side table'];
const CITIES = ['Mumbai', 'Pune', 'Delhi', 'Bengaluru', 'Jaipur'];
const STATUS = ['Packed', 'Packed', 'Out for delivery', 'Delivered', 'Delayed'];
const inr = (n) => '₹' + n.toLocaleString('en-IN');
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function order(id) {
  const r = (n) => Math.floor(Math.random() * n);
  return { id, item: ITEMS[r(ITEMS.length)], city: CITIES[r(CITIES.length)], amount: 2000 + r(16000), status: STATUS[r(STATUS.length)] };
}

export function OrderDashboardDemo() {
  const [orders, setOrders] = useState(() => Array.from({ length: 4 }, (_, i) => order(4824 - i)));
  useEffect(() => {
    if (reduced()) return;
    const t = setInterval(() => setOrders((o) => [order(o[0].id + 1), ...o.slice(0, 3)]), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="dash" role="img" aria-label="Example live order dashboard using demo data">
      <div className="dash__bar">
        <span>orders.yourbusiness.com</span>
        <span className="dash__live">LIVE</span>
      </div>
      <ul className="dash__rows">
        {orders.map((o) => (
          <li key={o.id} className="dash__row">
            <span className="dash__id">#{o.id}</span>
            <span className="dash__item">
              {o.item} <em>{o.city}</em>
            </span>
            <span className="dash__amt">{inr(o.amount)}</span>
            <span className="dash__status" data-s={o.status}>
              {o.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const FLOW = [
  { kind: 'trigger', label: 'Website form', sub: 'new enquiry' },
  { kind: 'ai', label: 'AI qualify', sub: 'score + summary' },
  { kind: 'app', label: 'Add to CRM', sub: 'deal created' },
  { kind: 'app', label: 'Notify sales', sub: 'WhatsApp · email' },
];

/** Workflow whose active step advances on a loop, like a run in progress. */
export function FlowDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const t = setInterval(() => setStep((s) => (s + 1) % (FLOW.length + 1)), 1100);
    return () => clearInterval(t);
  }, []);
  return (
    <ol className="flow" aria-label="Example workflow: website form, AI qualify, add to CRM, notify sales">
      {FLOW.map((n, i) => (
        <li key={n.label} className={`flow__node ${i < step ? 'is-done' : ''} ${i === step ? 'is-active' : ''}`} data-kind={n.kind}>
          <span className="flow__dot" />
          <span>
            <b>{n.label}</b>
            <small>{n.sub}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}
