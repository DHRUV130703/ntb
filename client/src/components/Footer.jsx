import { Link } from 'react-router-dom';
import { brand, nav, capabilities, founders } from '../content/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/brand/ntb-mark-cream.png" alt="NTB" width="120" height="65" style={{ marginBottom: 20 }} />
            <p className="lead" style={{ maxWidth: '30ch' }}>
              {brand.tagline}
            </p>
            <p style={{ marginTop: 16, opacity: 0.7 }}>
              {brand.location} · {brand.reach}
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Capabilities</h4>
            <ul>
              {capabilities.map((c) => (
                <li key={c.id}>
                  <Link to={c.cta.to}>{c.title}</Link>
                </li>
              ))}
            </ul>
            <h4 style={{ marginTop: 28 }}>Say hello</h4>
            <ul>
              {founders.map((f) => (
                <li key={f.id}>
                  <a href={`mailto:${f.email}`}>{f.email}</a>
                </li>
              ))}
              <li>
                <a href={brand.instagram.url} target="_blank" rel="noreferrer">
                  Instagram {brand.instagram.handle}
                </a>
              </li>
              {brand.linkedin && (
                <li>
                  <a href={brand.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer__word" aria-hidden="true">
          NOT TO BRAG<span className="mark">®</span>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} NOT TO BRAG. All rights reserved.</span>
          <span>Creative & Marketing | Creators & Collaborations | AI & Business Intelligence</span>
        </div>
      </div>
    </footer>
  );
}
