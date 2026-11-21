import { Button } from '../components/ui.jsx';

export default function NotFound() {
  return (
    <section className="notfound">
      <p className="label">404</p>
      <h1 className="h-lg">Not to brag, but this page doesn’t exist.</h1>
      <Button to="/" variant="dark">
        Back to home
      </Button>
    </section>
  );
}
