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

export function MailIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.5 6 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6.2 3.5h-1.7a1.5 1.5 0 0 0-1.5 1.6C3.4 11.3 8.7 16.6 14.9 17a1.5 1.5 0 0 0 1.6-1.5v-1.7a1 1 0 0 0-.8-1l-2.6-.6a1 1 0 0 0-1 .3l-1 1.1a10 10 0 0 1-4.7-4.7l1.1-1a1 1 0 0 0 .3-1l-.6-2.6a1 1 0 0 0-1-.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
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
