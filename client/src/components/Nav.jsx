import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav, brand, founders } from '../content/site.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname, hash } = useLocation();
  const lastY = useRef(0);
  const menuBtn = useRef(null);
  const firstLink = useRef(null);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname, hash]);

  // Hide the nav pill while scrolling down, show it when scrolling up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 240) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll, close on Escape, move focus while the menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => firstLink.current?.focus(), 250);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      menuBtn.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${hidden && !open ? 'nav--hidden' : ''}`}>
        <div className="nav__left">
          <button
            ref={menuBtn}
            className="nav__menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
            <span className="plus" aria-hidden="true">
              {open ? '[–]' : '[+]'}
            </span>
          </button>
          <Link className="nav__quick" to="/what-we-do">
            What we do
          </Link>
          <Link className="nav__quick" to="/work">
            Work
          </Link>
        </div>

        <Link to="/" className="nav__logo" aria-label="NOT TO BRAG home">
          <img src="/brand/ntb-mark-ink.png" alt="" width="56" height="30" />
          <span className="nav__logo-text">
            NOT TO BRAG<span className="mark">®</span>
          </span>
        </Link>

        <div className="nav__right">
          <Link className="nav__cta" to="/contact">
            Let’s Talk
          </Link>
        </div>
      </header>

      <div id="site-menu" className={`menu ${open ? 'menu--open' : ''}`} aria-hidden={!open} inert={open ? undefined : ''}>
        <ul className="menu__list">
          {nav.map((item, i) => (
            <li key={item.to}>
              <NavLink
                ref={i === 0 ? firstLink : undefined}
                to={item.to}
                end
                style={{ transitionDelay: open ? `${80 + i * 55}ms` : '0ms' }}
              >
                {item.label}
                <small>0{i + 1}</small>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <span>{brand.tagline}</span>
          <span style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {founders.map((f) => (
              <a key={f.id} href={`mailto:${f.email}`}>
                {f.email}
              </a>
            ))}
            <a href={brand.instagram.url} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
