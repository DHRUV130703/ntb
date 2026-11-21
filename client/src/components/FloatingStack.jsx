import { useEffect, useState } from 'react';
import { founders, story } from '../content/site.js';
import { useUi } from '../state/ui.jsx';
import { Button } from './ui.jsx';

/** Bottom-right stack: cookie card (first visit) above a closable "now taking on projects" card. */
export default function FloatingStack() {
  const { cookieOpen, setConsent, openContact, sheet } = useUi();
  const [statusOpen, setStatusOpen] = useState(true);
  const [shown, setShown] = useState(false);

  const [pastHero, setPastHero] = useState(false);

  // Let the hero breathe for a moment before the cards arrive.
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Phones: the status card would cover the hero button, so it appears after the hero.
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const isPhone = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

  if (sheet) return null;

  return (
    <div className={`stack ${shown ? 'is-shown' : ''}`} aria-live="polite">
      {cookieOpen && (
        <section className="cookie" aria-label="Cookie preferences">
          <h2 className="cookie__title">
            We use <span className="cookie__chip">Cookies</span>
          </h2>
          <div className="cookie__actions">
            <Button variant="dark-pink" onClick={() => setConsent('all')}>
              Accept All
            </Button>
            <Button variant="outline" onClick={() => setConsent('essential')}>
              Reject non-essential
            </Button>
          </div>
          <p className="cookie__note">
            Essential ones keep the site working. Analytics only run if you accept. Change it anytime under{' '}
            <em>Manage cookies</em>.
          </p>
        </section>
      )}

      {statusOpen && (
        <section className={`status ${isPhone && !pastHero ? 'status--later' : ''}`} aria-label="Availability">
          <button className="status__close" aria-label="Dismiss" onClick={() => setStatusOpen(false)}>
            ×
          </button>
          <div className="status__faces">
            {founders.map((f) => (
              <img key={f.id} src={f.photo} alt="" />
            ))}
          </div>
          <div className="status__text">
            <span className="status__eyebrow">
              <i /> {story.status.eyebrow}
            </span>
            <span className="status__line">{story.status.line}</span>
          </div>
          <Button variant="glass-dark" onClick={() => openContact()}>
            {story.status.cta}
          </Button>
        </section>
      )}
    </div>
  );
}
