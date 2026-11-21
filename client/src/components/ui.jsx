import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal.js';

export function ArrowIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ReturnIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15.5 4.5v5.5a2 2 0 0 1-2 2H5M8 8.5 4.5 12 8 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Split button (label + arrow cell), as on vs-goods.store. Renders a Link, <a> or <button>. */
export function Button({ to, href, children, variant, icon = 'return', className = '', ...rest }) {
  const cls = `btn ${variant ? `btn--${variant}` : ''} ${className}`.trim();
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__arrow">{icon === 'arrow' ? <ArrowIcon /> : <ReturnIcon />}</span>
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

export function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { ...style, '--delay': `${delay}ms` } : style} {...rest}>
      {children}
    </Tag>
  );
}

export function Brand({ withMark = true }) {
  return (
    <>
      NOT TO BRAG{withMark && <span className="mark">®</span>}
    </>
  );
}

/** Deterministic colour-tile pattern used instead of stock imagery (we never fake project visuals). */
const PALETTES = {
  terracotta: ['#e8734a', '#f19a76', '#d65e35', '#f1e6d8', '#222423', '#f6c2a9'],
  pink: ['#eba6d9', '#f4c9e8', '#d985c4', '#f1e6d8', '#222423', '#fbe3f3'],
  periwinkle: ['#7c83eb', '#a6abf3', '#5a62d6', '#c6e36b', '#222423', '#dfe1fb'],
  lime: ['#c6e36b', '#dcef9d', '#a9c94a', '#6c6847', '#222423', '#eef6cf'],
  olive: ['#6c6847', '#8a8661', '#4f4d34', '#f1e6d8', '#c6e36b', '#a7a37c'],
};
export function Tiles({ accent = 'olive', cols = 4, rows = 3, seed = 1 }) {
  const pal = PALETTES[accent] ?? PALETTES.olive;
  let s = seed * 9301 + 49297;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const cells = Array.from({ length: cols * rows }, () => pal[Math.floor(rand() * rand() * pal.length)]);
  return (
    <div className="tiles" style={{ '--cols': cols }} aria-hidden="true">
      {cells.map((c, i) => (
        <span key={i} style={{ '--c': c }} />
      ))}
    </div>
  );
}
