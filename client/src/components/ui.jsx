import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal.js';

export function ReturnIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15.5 4.5v5.5a2 2 0 0 1-2 2H5M8 8.5 4.5 12 8 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Split button (label cell + return-arrow cell), as on vs-goods.store. */
export function Button({ to, href, children, variant = 'dark', className = '', ...rest }) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__arrow">
        <ReturnIcon />
      </span>
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
    <button type="button" className={cls} {...rest}>
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
