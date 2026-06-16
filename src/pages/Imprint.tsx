import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { ShellLine } from "../components/text/ShellLine";

export function Imprint() {
  return (
    <main className="imprint-page">
      <PageMeta
        title="Imprint - Severin Hilbert"
        description="Site operator and contact information for Severin Hilbert."
        path="/imprint"
      />
      <section className="page">
        <ShellLine command="cat imprint.txt" />
        <h1>Imprint</h1>
        <div className="imprint-grid">
          <div>
            <h2>Site operator</h2>
            <p>Severin Hilbert</p>
            <p>Herbert Rauch-Gasse 16</p>
            <p>2361 Laxenburg</p>
            <p>Austria</p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>severin.hilbert@gmail.com</p>
          </div>
        </div>
        <Link to="/" className="back-link">
          <ChevronRight className="size-4 rotate-180" />
          back home
        </Link>
      </section>
    </main>
  );
}

