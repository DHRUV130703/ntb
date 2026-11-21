import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seo } from '../content/site.js';

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Scroll handling, per-page title/description and canonical URL on every navigation. */
export default function RouteEffects() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists, then scroll to it.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  useEffect(() => {
    const meta = seo[pathname] ?? { title: 'Page not found | NOT TO BRAG', description: seo['/'].description };
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('link[rel="canonical"]', 'href', `https://nottobrag.app${pathname === '/' ? '/' : pathname}`);
    setMeta('meta[property="og:url"]', 'content', `https://nottobrag.app${pathname}`);
  }, [pathname]);

  return null;
}
