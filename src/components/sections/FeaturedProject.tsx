import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { DecryptedText } from "../text/DecryptedText";
import { ShellLine } from "../text/ShellLine";
import { TerminalOutput } from "../text/TerminalOutput";

export function FeaturedProject() {
  return (
    <section id="projects" className="section">
      <div className="page section-stack">
        <div>
          <ShellLine command="open featured-project" />
          <div className="project-title-row">
            <a
              href="https://tnyr.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit tnyr.me"
            >
              <img src="/brand/tnyr.webp" alt="tnyr.me logo" loading="lazy" decoding="async" />
            </a>
            <h2>
              <a href="https://tnyr.me" target="_blank" rel="noopener noreferrer">
                <DecryptedText text="tnyr.me" delay={180} interval={82} />
              </a>
            </h2>
          </div>
        </div>
        <TerminalOutput className="prose-block">
          <DecryptedText
            as="p"
            className="project-summary"
            text="Privacy-focused, open-source URL shortener with passwordless zero-trust encryption for links and metadata."
            delay={140}
            interval={30}
            revealStep={2}
          />
          <DecryptedText
            as="p"
            text="The browser does the sensitive work. The server stores only a storage key and encrypted destination data, so the original link stays private by design."
            delay={360}
            interval={28}
            revealStep={2}
          />
          <div className="inline-list">
            <span>
              <DecryptedText text="AES-256" delay={760} interval={40} revealStep={1} />
            </span>
            <span>
              <DecryptedText text="no tracking" delay={840} interval={38} revealStep={1} />
            </span>
            <span>
              <DecryptedText text="self-hostable" delay={920} interval={38} revealStep={1} />
            </span>
            <span>
              <DecryptedText text="150+ GitHub stars" delay={1000} interval={36} revealStep={1} />
            </span>
          </div>
          <div className="link-row">
            <a href="https://tnyr.me" target="_blank" rel="noopener noreferrer">
              visit <ArrowUpRight className="size-4" />
            </a>
            <a
              href="https://github.com/Sevi-py/tnyr.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              source <SiGithub className="size-4" />
            </a>
          </div>
        </TerminalOutput>
      </div>
    </section>
  );
}

