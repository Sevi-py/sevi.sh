import { ArrowUpRight, Mail } from "lucide-react";
import { ShellLine } from "../text/ShellLine";
import { TerminalOutput } from "../text/TerminalOutput";
import { TypingText } from "../text/TypingText";

export function ContactSection() {
  return (
    <section className="section final-section">
      <div className="page">
        <ShellLine command="ssh severin@sevi.sh" />
        <TypingText as="h2" text="Want to build something?" delay={180} />
        <TerminalOutput delay={0.62}>
          <div className="link-row">
            <a href="mailto:severin.hilbert@gmail.com">
              send mail <Mail className="size-4" />
            </a>
            <a href="https://github.com/Sevi-py" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight className="size-4" />
            </a>
          </div>
        </TerminalOutput>
      </div>
    </section>
  );
}

