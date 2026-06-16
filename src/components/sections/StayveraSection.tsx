import { motion } from "motion/react";
import { useStartOnView } from "../../hooks/useStartOnView";
import { ShellLine } from "../text/ShellLine";
import { TerminalOutput } from "../text/TerminalOutput";
import { TypingText } from "../text/TypingText";

export function StayveraSection() {
  const [sectionRef, sectionStarted] = useStartOnView<HTMLElement>("0px 0px 4% 0px");

  return (
    <section className="section" ref={sectionRef}>
      <div className="page section-stack">
        <div>
          <ShellLine command="curl stayvera.com/about" />
          <h2 className="stayvera-heading">
            <TypingText text="Currently building " delay={180} />
            <motion.a
              href="https://stayvera.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Stayvera"
              className="stayvera-brand"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.5 }}
            >
              <img src="/brand/stayvera-symbol.webp" alt="" loading="lazy" decoding="async" />
              <span>Stayvera</span>
            </motion.a>
          </h2>
        </div>
        <TerminalOutput className="prose-block">
          <TypingText
            as="p"
            text="Stayvera is a premium rental and group-travel platform focused on fair fees, trust, host support, instant listing import, and an AI copilot for guest communication and operations."
            delay={140}
            speed={14}
            start={sectionStarted}
          />
          <div className="inline-list">
            <TypingText
              as="span"
              text="fair host economics"
              delay={1320}
              speed={22}
              start={sectionStarted}
            />
            <TypingText
              as="span"
              text="group travel"
              delay={1480}
              speed={22}
              start={sectionStarted}
            />
            <TypingText
              as="span"
              text="AI guest ops"
              delay={1600}
              speed={22}
              start={sectionStarted}
            />
            <TypingText
              as="span"
              text="transparent fees"
              delay={1720}
              speed={22}
              start={sectionStarted}
            />
          </div>
        </TerminalOutput>
      </div>
    </section>
  );
}

