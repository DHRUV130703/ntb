import { brand, founders } from '../content/site.js';
import { useUi } from '../state/ui.jsx';

/**
 * v3.1 footer: one clear contact line (opens the Contact drawer), founders' emails small and
 * labelled, giant wordmark with the NTB mark set into it.
 */
export default function Footer() {
  const { setCookieOpen, openContact } = useUi();
  return (
    <footer className="footer3">
      <div className="wrap footer3__mid">
        <div className="footer3__lead">
          <p className="label footer3__label">Start a conversation</p>
          <button className="footer3__talk" onClick={() => openContact()}>
            Tell us what you’re building <span aria-hidden="true">→</span>
          </button>
        </div>

        <ul className="footer3__people">
          {founders.map((f) => (
            <li key={f.id}>
              <span className="footer3__who">
                <b>{f.name}</b>
                <small>{f.title}</small>
              </span>
              <a href={`mailto:${f.email}`}>{f.email}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer3__word" aria-label="NOT TO BRAG">
        <span aria-hidden="true">NOT TO</span>
        <img src="/brand/ntb-mark-cream.png" alt="" aria-hidden="true" />
        <span aria-hidden="true">BRAG</span>
      </div>

      <div className="wrap footer3__base">
        <span>© {new Date().getFullYear()} NOT TO BRAG®</span>
        <span className="footer3__place">
          {brand.location} · {brand.reach}
        </span>
        <nav className="footer3__links" aria-label="Elsewhere">
          <a href={brand.instagram.url} target="_blank" rel="noreferrer">
            Instagram
          </a>
          {brand.linkedin && (
            <a href={brand.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          <button onClick={() => setCookieOpen(true)}>Manage cookies</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
        </nav>
      </div>
    </footer>
  );
}
