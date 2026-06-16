import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { ShellLine } from "../components/text/ShellLine";

export function Privacy() {
  return (
    <main className="imprint-page">
      <PageMeta
        title="Privacy - Severin Hilbert"
        description="Privacy information for sevi.sh, including hosting, analytics, cookies, contact, and data rights."
        path="/privacy"
      />
      <section className="page">
        <ShellLine command="cat privacy.txt" />
        <h1>Privacy</h1>
        <div className="imprint-grid privacy-grid">
          <div>
            <h2>Controller</h2>
            <p>Severin Hilbert</p>
            <p>Herbert Rauch-Gasse 16</p>
            <p>2361 Laxenburg</p>
            <p>Austria</p>
            <p>severin.hilbert@gmail.com</p>
          </div>
          <div>
            <h2>Hosting and delivery</h2>
            <p>
              This website is delivered through Cloudflare. When you visit it,
              technical request data such as your IP address, requested pages,
              browser information, timestamps, and security events may be
              processed to serve, protect, cache, and route the site.
            </p>
          </div>
          <div>
            <h2>Analytics</h2>
            <p>
              I use Cloudflare's built-in, privacy-minded analytics to understand
              basic traffic patterns. The analytics setup is intended for
              aggregate page-view and performance insight, not for identifying
              individual visitors or tracking them across websites.
            </p>
          </div>
          <div>
            <h2>Cookies</h2>
            <p>
              This site does not use advertising or marketing cookies. Cloudflare
              Web Analytics does not rely on client-side state such as cookies or
              local storage for usage metrics.
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              If you contact me by email, I use the information you send only to
              read and reply to your message. I do not sell personal data.
            </p>
          </div>
          <div>
            <h2>Your rights</h2>
            <p>
              You can ask for access, correction, deletion, restriction, or
              portability of personal data, or object to processing where the law
              gives you that right. You may also contact the Austrian data
              protection authority.
            </p>
          </div>
        </div>
        <p className="legal-updated">Last updated: June 2026</p>
        <Link to="/" className="back-link">
          <ChevronRight className="size-4 rotate-180" />
          back home
        </Link>
      </section>
    </main>
  );
}

