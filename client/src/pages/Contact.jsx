import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { contact, founders, brand } from '../content/site.js';
import { Button, Reveal } from '../components/ui.jsx';
import { PageHead, FaqList } from '../components/blocks.jsx';

// Mirrors server/lib/routing.js, only used to tell the visitor who will read their message.
const ROUTE = {
  'Creative & Marketing': ['Riddhi'],
  'Creator Collaborations': ['Riddhi'],
  'AI & Automation': ['Dhruv'],
  'Business Intelligence': ['Dhruv'],
  'Strategic Partnerships': ['Riddhi', 'Dhruv'],
  'Something Else': ['Riddhi', 'Dhruv'],
};

const EMPTY = { name: '', business: '', email: '', phone: '', message: '', website: '' };

function ContactForm({ initialInterests, initialMessage }) {
  const [values, setValues] = useState({ ...EMPTY, message: initialMessage });
  const [interests, setInterests] = useState(initialInterests);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: 'idle', message: '' });

  const readers = useMemo(() => {
    const names = new Set(interests.flatMap((i) => ROUTE[i] ?? []));
    if (!names.size) return 'Riddhi & Dhruv';
    return [...names].join(' & ');
  }, [interests]);

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };
  const toggle = (interest) =>
    setInterests((list) => (list.includes(interest) ? list.filter((i) => i !== interest) : [...list, interest]));

  async function onSubmit(e) {
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
        setState({
          status: 'sent',
          message: `Thanks${values.name ? `, ${values.name.split(' ')[0]}` : ''}. Your enquiry is with ${(data.sentTo ?? ['us']).join(' & ')}. We’ll reply to ${values.email} soon.`,
        });
        setValues(EMPTY);
        setInterests([]);
        setErrors({});
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        setState({ status: 'error', message: 'Please check the highlighted fields.' });
        const first = Object.keys(data.errors)[0];
        document.getElementById(`f-${first}`)?.focus();
        return;
      }
      setState({ status: 'error', message: data.error || 'Something went wrong. Please email us directly.' });
    } catch {
      setState({ status: 'error', message: 'We couldn’t reach the server. Please check your connection or email us directly.' });
    }
  }

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={`f-${name}`}>{label}</label>
      <input
        id={`f-${name}`}
        name={name}
        value={values[name]}
        onChange={set(name)}
        aria-invalid={errors[name] ? 'true' : undefined}
        aria-describedby={errors[name] ? `e-${name}` : undefined}
        {...props}
      />
      {errors[name] && (
        <span id={`e-${name}`} className="field__error">
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <h2 id="form-title" className="h3">
        Tell us about it
      </h2>
      <div className="form__row">
        {field('name', 'Full Name', { autoComplete: 'name', required: true })}
        {field('business', <>Business / Brand Name <small>(optional)</small></>, { autoComplete: 'organization' })}
      </div>
      <div className="form__row">
        {field('email', 'Email Address', { type: 'email', autoComplete: 'email', required: true, inputMode: 'email' })}
        {field('phone', <>Contact Number <small>(optional)</small></>, { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
      </div>

      <fieldset className="field">
        <legend>I’m Interested In</legend>
        <div className="checks">
          {contact.interests.map((i) => (
            <label key={i} className="check">
              <input type="checkbox" checked={interests.includes(i)} onChange={() => toggle(i)} />
              <span>{i}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="f-message">Tell Us About Your Project</label>
        <textarea
          id="f-message"
          name="message"
          value={values.message}
          onChange={set('message')}
          required
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'e-message' : undefined}
          placeholder="What are you working on, and where could we help?"
        />
        {errors.message && (
          <span id="e-message" className="field__error">
            {errors.message}
          </span>
        )}
      </div>

      {/* Honeypot for bots */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </label>
      </div>

      {state.status === 'sent' && (
        <p className="form__status form__status--ok" role="status">
          {state.message}
        </p>
      )}
      {state.status === 'error' && (
        <p className="form__status form__status--err" role="alert">
          {state.message}
        </p>
      )}

      <div className="form__foot">
        <p className="form__route" aria-live="polite">
          This goes straight to <b style={{ color: 'var(--ink)' }}>{readers}</b>.
        </p>
        <Button type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending…' : contact.button}
        </Button>
      </div>
    </form>
  );
}

export default function Contact() {
  const [params] = useSearchParams();
  const preset = params.get('interest');
  const isCreator = params.get('creator') === '1';
  const [formKey, setFormKey] = useState(0);
  const [picked, setPicked] = useState(preset && contact.interests.includes(preset) ? [preset] : []);

  const initialMessage = isCreator ? 'I’m a content creator and I’d like to join the NOT TO BRAG creator network. My handle / niche: ' : '';

  const pick = (interest) => {
    setPicked([interest]);
    setFormKey((k) => k + 1);
    requestAnimationFrame(() => document.getElementById('f-name')?.focus({ preventScroll: true }));
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHead title={contact.title} lead={`${contact.lead} ${contact.body}`} />

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">What are you looking for?</p>
            <div className="looking">
              {contact.lookingFor.map((l) => (
                <button key={l.title} type="button" data-accent={l.accent} aria-pressed={picked.length === 1 && picked[0] === l.interest} onClick={() => pick(l.interest)}>
                  <i aria-hidden="true" />
                  <b>{l.title}</b>
                  <span>{l.body}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div id="enquiry" className="contact-layout">
            <Reveal>
              <ContactForm key={formKey} initialInterests={picked} initialMessage={initialMessage} />
            </Reveal>
            <Reveal className="aside-card" delay={120}>
              <h3>Talk to a founder</h3>
              {founders.map((f) => (
                <div key={f.id} className="aside-person">
                  <img src={f.photo} alt="" loading="lazy" />
                  <div>
                    <b>{f.name}</b>
                    <small>{f.role.replace('Founder — ', '')}</small>
                    <a href={`mailto:${f.email}`}>{f.email}</a>
                    <a href={`tel:${f.tel}`}>{f.phone}</a>
                  </div>
                </div>
              ))}
              <hr />
              <div style={{ display: 'grid', gap: 6, fontSize: 15 }}>
                <a href={brand.instagram.url} target="_blank" rel="noreferrer">
                  Instagram {brand.instagram.handle}
                </a>
                <span>
                  {brand.location} | {brand.reach}
                </span>
              </div>
              <hr />
              <p className="lead" style={{ fontWeight: 500 }}>
                {contact.closing}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h1">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <FaqList />
          </Reveal>
        </div>
      </section>
    </>
  );
}
