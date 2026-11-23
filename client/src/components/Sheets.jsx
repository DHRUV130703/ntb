import { useEffect, useMemo, useRef, useState } from 'react';
import { capabilities, contact, founders, whatWeDo, faqs } from '../content/site.js';
import { useUi } from '../state/ui.jsx';
import { Button, PlusIcon } from './ui.jsx';
import { Visual } from './Visuals.jsx';

/* Shared drawer shell: right-side panel on desktop, bottom sheet on mobile. */
function Drawer({ open, onClose, label, children, wide, resetKey }) {
  const panel = useRef(null);
  const lastFocus = useRef(null);

  // Moving between sheets (e.g. "Next capability") starts the new one at the top.
  useEffect(() => {
    if (panel.current) panel.current.scrollTop = 0;
  }, [resetKey]);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    const t = setTimeout(() => {
      const p = panel.current;
      (p?.querySelector('[data-autofocus]') ?? p?.querySelector('.drawer__close'))?.focus();
    }, 60);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const f = [...panel.current.querySelectorAll('button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.disabled && el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={open ? undefined : ''}>
      <div className="drawer__scrim" onClick={onClose} />
      <div ref={panel} className={`drawer__panel ${wide ? 'drawer__panel--wide' : ''}`} role="dialog" aria-modal="true" aria-label={label}>
        <button className="drawer__close" onClick={onClose} aria-label="Close">
          Close <span aria-hidden="true">[–]</span>
        </button>
        {children}
      </div>
    </div>
  );
}

/* Contact ---------------------------------------------------------------- */

const ROUTE = {
  'Creative & Marketing': ['Riddhi'],
  'Creator Collaborations': ['Riddhi'],
  'AI & Automation': ['Dhruv'],
  'Business Intelligence': ['Dhruv'],
  'Strategic Partnerships': ['Riddhi', 'Dhruv'],
  'Something Else': ['Riddhi', 'Dhruv'],
};
const EMPTY = { name: '', business: '', email: '', phone: '', message: '', website: '' };

function ContactBody({ preset }) {
  const [interests, setInterests] = useState(preset.interest ? [preset.interest] : []);
  const [step, setStep] = useState(preset.interest ? 2 : 1);
  const [values, setValues] = useState({
    ...EMPTY,
    message: preset.creator ? 'I’m a content creator and I’d like to join the NOT TO BRAG creator network. My handle / niche: ' : '',
  });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: 'idle', message: '' });

  const readers = useMemo(() => {
    const names = new Set(interests.flatMap((i) => ROUTE[i] ?? []));
    return names.size ? [...names].join(' & ') : 'Riddhi & Dhruv';
  }, [interests]);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };
  const toggle = (i) => setInterests((l) => (l.includes(i) ? l.filter((x) => x !== i) : [...l, i]));

  async function submit(e) {
    e.preventDefault();
    setState({ status: 'sending', message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, interests }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState({ status: 'sent', message: (data.sentTo ?? ['us']).join(' & ') });
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        setState({ status: 'idle', message: '' });
        document.getElementById(`c-${Object.keys(data.errors)[0]}`)?.focus();
        return;
      }
      setState({ status: 'error', message: data.error || 'Something went wrong. Please email us directly.' });
    } catch {
      setState({ status: 'error', message: 'We couldn’t reach the server. Please check your connection or email us directly.' });
    }
  }

  if (state.status === 'sent') {
    return (
      <div className="sheet sheet--done">
        <span className="sheet__badge" data-accent="green">
          Sent
        </span>
        <h2 className="h-lg">Thanks{values.name ? `, ${values.name.split(' ')[0]}` : ''}.</h2>
        <p className="sheet__lead">
          Your enquiry is with {state.message}. We’ll reply to {values.email} soon.
        </p>
        <p className="sheet__muted">{contact.closing}</p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="sheet">
        <p className="label">Let’s talk</p>
        <h2 className="h-lg">What are you looking for?</h2>
        <div className="choices">
          {contact.lookingFor.map((l, i) => (
            <button
              key={l.title}
              className="choice"
              data-accent={l.accent}
              data-autofocus={i === 0 ? '' : undefined}
              onClick={() => {
                setInterests([l.interest]);
                setStep(2);
              }}
            >
              <i />
              <b>{l.title.replace(' Enquiries', '')}</b>
              <span>{l.body}</span>
            </button>
          ))}
        </div>
        <p className="sheet__muted">
          Prefer email?{' '}
          {founders.map((f, i) => (
            <span key={f.id}>
              {i > 0 && ' · '}
              <a href={`mailto:${f.email}`}>{f.email}</a>
            </span>
          ))}
        </p>
        <div className="sheet__faq">
          <p className="label">Questions first?</p>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="faq__pm" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const field = (k, label, props = {}) => (
    <div className="field">
      <label htmlFor={`c-${k}`}>{label}</label>
      <input id={`c-${k}`} value={values[k]} onChange={set(k)} aria-invalid={errors[k] ? 'true' : undefined} aria-describedby={errors[k] ? `ce-${k}` : undefined} {...props} />
      {errors[k] && (
        <span id={`ce-${k}`} className="field__error">
          {errors[k]}
        </span>
      )}
    </div>
  );

  return (
    <form className="sheet" onSubmit={submit} noValidate>
      <button type="button" className="sheet__back" onClick={() => setStep(1)}>
        ← Change topic
      </button>
      <h2 className="h-lg">Tell us a little about it.</h2>

      <div className="checks" role="group" aria-label="I’m interested in">
        {contact.interests.map((i) => (
          <label key={i} className="check">
            <input type="checkbox" checked={interests.includes(i)} onChange={() => toggle(i)} />
            <span>{i}</span>
          </label>
        ))}
      </div>

      <div className="form-grid">
        {field('name', 'Full name', { autoComplete: 'name', 'data-autofocus': '' })}
        {field('business', 'Business / brand (optional)', { autoComplete: 'organization' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
        {field('phone', 'Phone (optional)', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
      </div>
      <div className="field">
        <label htmlFor="c-message">Your project</label>
        <textarea
          id="c-message"
          value={values.message}
          onChange={set('message')}
          placeholder="What are you working on, and where could we help?"
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'ce-message' : undefined}
        />
        {errors.message && (
          <span id="ce-message" className="field__error">
            {errors.message}
          </span>
        )}
      </div>
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </label>
      </div>

      {state.status === 'error' && (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      )}

      <div className="sheet__submit">
        <span className="sheet__muted" aria-live="polite">
          Goes straight to <b>{readers}</b>
        </span>
        <Button type="submit" variant="dark" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending…' : contact.button}
        </Button>
      </div>
    </form>
  );
}

/* Service sheet ------------------------------------------------------------ */

const DETAIL = { creative: whatWeDo.creative, creators: whatWeDo.creators, ai: whatWeDo.ai };
const CAP_VISUAL = { creative: 'brand', creators: 'creator', ai: 'chat' };

/** Service groups for a capability: one collapsed row each, so the sheet opens calm. */
function groupsFor(id, d) {
  if (id === 'creators')
    return [
      { title: 'What we handle', items: d.services },
      { title: 'How a collaboration runs', items: d.approach, ordered: true },
    ];
  if (id === 'ai') return [...d.services, { title: 'How we implement', items: d.approach, ordered: true }];
  return d.services;
}

/**
 * Capability sheet. Visual header (no giant numbers), one-line pitch, then a short accordion:
 * each service group is a single row until opened. The enquiry button is docked at the bottom
 * so it is always one tap away, and "Next" moves between capabilities without closing.
 */
function ServiceBody({ id }) {
  const { openContact, openService } = useUi();
  const idx = capabilities.findIndex((c) => c.id === id);
  const cap = capabilities[idx];
  const d = DETAIL[id];
  const [tab, setTab] = useState(0);
  if (!cap) return null;
  const groups = groupsFor(id, d);
  const next = capabilities[(idx + 1) % capabilities.length];

  return (
    <div className="sv" data-accent={cap.accent}>
      <div className="sv__media">
        <span className="sv__no">
          {cap.no} / 0{capabilities.length}
        </span>
        <Visual name={CAP_VISUAL[id]} />
      </div>

      <div className="sv__body">
        <span className="tag">{cap.title}</span>
        <h2 className="sv__title">{d.headline}</h2>
        <p className="sv__lead">{d.lead}</p>

        <div className="sv__tabs" role="tablist" aria-label={`${cap.title} services`}>
          {groups.map((g, n) => (
            <button
              key={g.title}
              role="tab"
              id={`svt-${id}-${n}`}
              aria-selected={tab === n}
              aria-controls={`svp-${id}`}
              className={`sv__tab ${tab === n ? 'is-active' : ''}`}
              onClick={(e) => {
                setTab(n);
                e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }}
            >
              {g.title}
            </button>
          ))}
        </div>
        <ol key={tab} className="sv__items" id={`svp-${id}`} role="tabpanel" aria-labelledby={`svt-${id}-${tab}`}>
          {groups[tab].items.map((it, n) => (
            <li key={it} style={{ '--n': n }}>
              <span className="sv__item-no">{String(n + 1).padStart(2, '0')}</span>
              {it}
            </li>
          ))}
        </ol>

        {id === 'creators' && (
          <button className="sv__aside" onClick={() => openContact({ interest: 'Creator Collaborations', creator: true })}>
            <span>
              <b>Are you a creator?</b> Join our creator network
            </span>
            <span aria-hidden="true">→</span>
          </button>
        )}

        <button className="sv__next" onClick={() => openService(next.id)}>
          <span className="sv__next-label">Next</span>
          <span className="sv__next-title">
            {next.no} {next.title}
          </span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="sv__dock">
        <Button variant="dark" className="btn--block" data-autofocus="" onClick={() => openContact({ interest: cap.interest })}>
          {d.cta}
        </Button>
      </div>
    </div>
  );
}

/* Founder sheet ----------------------------------------------------------- */

function FounderBody({ id }) {
  const { openContact } = useUi();
  const f = founders.find((x) => x.id === id);
  if (!f) return null;
  return (
    <div className="sheet">
      <div className="founder-photo" data-accent={f.accent}>
        <img src={f.photo} alt={`${f.name}, ${f.role}`} />
      </div>
      <p className="label">{f.role}</p>
      <h2 className="h-lg">{f.name}</h2>
      <p className="sheet__lead">{f.bio}</p>
      <p className="sheet__muted">
        <b>Leads:</b> {f.owns}
      </p>
      <div className="founder-links">
        <a href={`mailto:${f.email}`}>{f.email}</a>
        <a href={`tel:${f.tel}`}>{f.phone}</a>
      </div>
      <div className="sheet__submit">
        <span />
        <Button variant="dark" data-autofocus="" onClick={() => openContact({ interest: f.id === 'dhruv' ? 'AI & Automation' : 'Creative & Marketing' })}>
          Talk to {f.name}
        </Button>
      </div>
    </div>
  );
}

export default function Sheets() {
  const { sheet, close } = useUi();
  const type = sheet?.type;
  // Re-mount content per open so forms start fresh.
  const key = sheet ? JSON.stringify(sheet) : 'none';
  return (
    <>
      <Drawer open={type === 'contact'} onClose={close} label="Contact NOT TO BRAG" wide>
        {type === 'contact' && <ContactBody key={key} preset={sheet} />}
      </Drawer>
      <Drawer open={type === 'service'} onClose={close} label="Service details" resetKey={key}>
        {type === 'service' && <ServiceBody key={key} id={sheet.id} />}
      </Drawer>
      <Drawer open={type === 'founder'} onClose={close} label="Founder">
        {type === 'founder' && <FounderBody key={key} id={sheet.id} />}
      </Drawer>
    </>
  );
}
