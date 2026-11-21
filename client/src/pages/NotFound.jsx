import { Button } from '../components/ui.jsx';

export default function NotFound() {
  return (
    <section className="page-head grid-bg" style={{ minHeight: '80svh' }}>
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="display">Not to brag, but this page doesn’t exist.</h1>
        <div style={{ marginTop: 36 }}>
          <Button to="/" icon="arrow">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
