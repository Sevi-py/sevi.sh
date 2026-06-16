import { Link } from "@tanstack/react-router";

export function BottomLegalLinks() {
  return (
    <div className="bottom-legal">
      <Link to="/imprint">imprint</Link>
      <Link to="/privacy">privacy</Link>
    </div>
  );
}

