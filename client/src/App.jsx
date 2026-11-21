import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UiProvider, useUi } from './state/ui.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import FloatingStack from './components/FloatingStack.jsx';
import Sheets from './components/Sheets.jsx';
import RouteEffects from './components/RouteEffects.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

// v1 had separate pages. They now point into chapters of the single page.
const LEGACY = {
  '/what-we-do': '/#capabilities',
  '/work': '/#capabilities',
  '/about': '/#team',
  '/approach': '/#process',
};

function ContactRoute() {
  const navigate = useNavigate();
  const { openContact } = useUi();
  // Read the query once at render: by the time a re-run effect fires the URL is already "/".
  const [params] = useState(() => new URLSearchParams(window.location.search));
  useEffect(() => {
    navigate('/', { replace: true });
    openContact({ interest: params.get('interest') || undefined, creator: params.get('creator') === '1' });
  }, [navigate, openContact, params]);
  return null;
}

export default function App() {
  return (
    <UiProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <RouteEffects />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {Object.entries(LEGACY).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="/contact" element={<ContactRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingStack />
      <Sheets />
    </UiProvider>
  );
}
