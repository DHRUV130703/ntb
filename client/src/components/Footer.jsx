import { brand, founders, story } from '../content/site.js';
import { useUi } from '../state/ui.jsx';
import { Button } from './ui.jsx';

export default function Footer() {
  const { openContact, setCookieOpen } = useUi();
  return (
    <footer className="footer">
      <div className="wrap footer__closing">
        <h2 className="h-lg">{story.closing.title}</h2>
        <p className="footer__body">{story.closing.body}</p>
        <Button variant="light" onClick={() => openContact()}>
          Let’s Build Something Together
        </Button>
      </div>

      <div className="footer__word" aria-label="NOT TO BRAG">
        <span>
          NOT TO BRAG<sup>®</sup>
        </span>
      </div>

      <div className="wrap footer__bar">
        <div className="footer__col">
          <span className="footer__h">Contact</span>
          {founders.map((f) => (
            <a key={f.id} href={`mailto:${f.email}`}>
              {f.email}
            </a>
          ))}
        </div>
        <div className="footer__col footer__col--center">
          <span>{brand.tagline}</span>
          <span>
            {brand.location} · {brand.reach}
          </span>
        </div>
        <div className="footer__col footer__col--right">
          <a href={brand.instagram.url} target="_blank" rel="noreferrer">
            Instagram
          </a>
          {brand.linkedin && (
            <a href={brand.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          <button onClick={() => setCookieOpen(true)}>Manage cookies</button>
          <span>© {new Date().getFullYear()} NOT TO BRAG</span>
        </div>
      </div>
    </footer>
  );
}
