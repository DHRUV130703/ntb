import { brand, founders } from '../content/site.js';
import { useUi } from '../state/ui.jsx';

/** v3 footer (jeppesen-style): dark band, big emails, giant wordmark with the NTB mark set into it. */
export default function Footer() {
  const { setCookieOpen } = useUi();
  return (
    <footer className="footer3">
      <div className="wrap footer3__top">
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
        </nav>
        <button className="footer3__up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          ↑
        </button>
      </div>

      <div className="wrap footer3__mid">
        <p className="footer3__note">
          {brand.tagline}
          <br />
          {brand.location} · {brand.reach}
        </p>
        <div className="footer3__emails">
          {founders.map((f) => (
            <a key={f.id} href={`mailto:${f.email}`}>
              {f.email}
            </a>
          ))}
        </div>
      </div>

      <div className="footer3__word" aria-label="NOT TO BRAG">
        <span aria-hidden="true">NOT TO</span>
        <img src="/brand/ntb-mark-cream.png" alt="" aria-hidden="true" />
        <span aria-hidden="true">BRAG</span>
      </div>

      <div className="wrap footer3__base">
        <span>© {new Date().getFullYear()} NOT TO BRAG®</span>
        <span>Creative & Marketing · Creators & Collaborations · AI & Business Intelligence</span>
      </div>
    </footer>
  );
}
