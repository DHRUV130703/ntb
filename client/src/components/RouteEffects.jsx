import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seo } from '../content/site.js';

/** Scroll to the hash target (or top) on navigation and keep the document title in sync. */
export default function RouteEffects() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const go = () => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      requestAnimationFrame(() => requestAnimationFrame(go));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  useEffect(() => {
    document.title = pathname === '/' ? seo['/'].title : 'Page not found | NOT TO BRAG';
  }, [pathname]);

  return null;
}
