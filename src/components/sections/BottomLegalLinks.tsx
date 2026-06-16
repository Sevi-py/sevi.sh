import { Link } from "@tanstack/react-router";

export function BottomLegalLinks() {
  return (
    <div className="bottom-legal">
      <Link to="/imprint">imprint</Link>
      <Link to="/privacy">privacy</Link>
      <a href="https://github.com/Sevi-py/sevi.sh" target="_blank" rel="noopener noreferrer">
        source
      </a>
    </div>
  );
}
