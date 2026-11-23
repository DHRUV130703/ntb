import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { chapters } from '../content/site.js';
import { useUi } from '../state/ui.jsx';

/** v3 (jeppesen-style): mark + wordmark left; "Talk to the founders" + Menu right. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const { openContact } = useUi();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const wrap = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onClick = (e) => !wrap.current?.contains(e.target) && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onClick);
    };
  }, [open]);

  const goTo = (id) => {
    setOpen(false);
    if (pathname !== '/') navigate(`/#${id}`);
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="nav">
      <Link to="/" className="nav__logo" aria-label="NOT TO BRAG, home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src="/brand/ntb-mark-ink.png" alt="" width="52" height="28" />
        <span className="nav__word">
          NOT TO BRAG<sup>®</sup>
        </span>
      </Link>

      <div className="nav__right" ref={wrap}>
        <button className="nav__talk" onClick={() => openContact()}>
          <span className="nav__dot" aria-hidden="true" />
          Talk to the founders
        </button>
        <button className="nav__menu" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>

        <div id="nav-menu" className={`dropdown ${open ? 'is-open' : ''}`} inert={open ? undefined : ''}>
          {chapters.map((c, i) => (
            <button key={c.id} className="dropdown__row" style={{ '--i': i }} onClick={() => goTo(c.id)}>
              {c.label}
              <span className="dropdown__no">0{i + 1}</span>
            </button>
          ))}
          <button
            className="dropdown__row dropdown__row--cta"
            style={{ '--i': chapters.length }}
            onClick={() => {
              setOpen(false);
              openContact();
            }}
          >
            Let’s Talk
            <span className="dropdown__pill">Now booking</span>
          </button>
        </div>
      </div>
    </header>
  );
}
