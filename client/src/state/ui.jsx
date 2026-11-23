import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// One place for everything that opens over the page: the contact drawer, a capability's
// service sheet, a founder sheet and the cookie card. Keeps the site single-page.

const UiContext = createContext(null);
const CONSENT_KEY = 'ntb-consent'; // 'all' | 'essential'

function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

async function loadAnalytics() {
  try {
    const { inject } = await import('@vercel/analytics');
    inject();
  } catch {
    /* analytics is optional */
  }
}

export function UiProvider({ children }) {
  // sheet: null | { type: 'contact', interest?, creator? } | { type: 'service', id } | { type: 'founder', id }
  const [sheet, setSheet] = useState(null);
  const [consent, setConsentState] = useState(readConsent);
  const [cookieOpen, setCookieOpen] = useState(() => !readConsent());

  const openContact = useCallback((opts = {}) => setSheet({ type: 'contact', ...opts }), []);
  const openService = useCallback((id) => setSheet({ type: 'service', id }), []);
  const openFounder = useCallback((id) => setSheet({ type: 'founder', id }), []);
  const close = useCallback(() => setSheet(null), []);

  const setConsent = useCallback((value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* private mode: choice lasts for this visit */
    }
    setConsentState(value);
    setCookieOpen(false);
  }, []);

  useEffect(() => {
    if (consent === 'all' && import.meta.env.PROD) loadAnalytics();
  }, [consent]);

  // Lock page scroll while a sheet is open.
  useEffect(() => {
    if (!sheet) return;
    // Safari (iOS) only honours the lock when both <html> and <body> are clipped.
    const els = [document.documentElement, document.body];
    const prev = els.map((el) => el.style.overflow);
    els.forEach((el) => (el.style.overflow = 'hidden'));
    return () => {
      els.forEach((el, i) => (el.style.overflow = prev[i]));
    };
  }, [sheet]);

  const value = useMemo(
    () => ({ sheet, openContact, openService, openFounder, close, consent, setConsent, cookieOpen, setCookieOpen }),
    [sheet, openContact, openService, openFounder, close, consent, setConsent, cookieOpen],
  );
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  return useContext(UiContext);
}
