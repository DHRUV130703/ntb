import { useEffect, useMemo, useRef, useState } from 'react';
import { capabilities, contact, founders, whatWeDo } from '../content/site.js';
import { useUi } from '../state/ui.jsx';
import { Button } from './ui.jsx';

/* Shared drawer shell: right-side panel on desktop, bottom sheet on mobile. */
function Drawer({ open, onClose, label, children, wide }) {
  const panel = useRef(null);
  const lastFocus = useRef(null);

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

function ServiceBody({ id }) {
  const { openContact } = useUi();
  const cap = capabilities.find((c) => c.id === id);
  const d = DETAIL[id];
  if (!cap) return null;
  const groups = id === 'creative' ? d.services : id === 'ai' ? d.services : [{ title: 'Services', items: d.services }];
  return (
    <div className="sheet" data-accent={cap.accent}>
      <div className="sheet__hero">
        <span className="sheet__no">{cap.no}</span>
        <span className="tag">{cap.title}</span>
      </div>
      <h2 className="h-lg">{d.headline}</h2>
      <p className="sheet__lead">{d.lead}</p>
      <div className="svc-groups">
        {groups.map((g) => (
          <div key={g.title} className="svc-group">
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {id === 'creators' && (
        <div className="sheet__note">
          <b>{d.forCreators.title}</b> {d.forCreators.body}{' '}
          <button className="link" onClick={() => openContact({ interest: 'Creator Collaborations', creator: true })}>
            {d.forCreators.cta} →
          </button>
        </div>
      )}
      <div className="sheet__submit">
        <span />
        <Button variant="dark" data-autofocus="" onClick={() => openContact({ interest: cap.interest })}>
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
      <Drawer open={type === 'service'} onClose={close} label="Service details">
        {type === 'service' && <ServiceBody key={key} id={sheet.id} />}
      </Drawer>
      <Drawer open={type === 'founder'} onClose={close} label="Founder">
        {type === 'founder' && <FounderBody key={key} id={sheet.id} />}
      </Drawer>
    </>
  );
}
