import { Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { socials } from "../../content/profile";
import { useLiveAge } from "../../hooks/useLiveAge";
import { ShellLine } from "../text/ShellLine";
import { TerminalOutput } from "../text/TerminalOutput";
import { TypedIntroDescription } from "../text/TypedIntroDescription";
import { TypingText } from "../text/TypingText";

export function IntroSection() {
  const age = useLiveAge();

  return (
    <section className="hero">
      <div className="page">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <ShellLine command="whoami" />
          <TypingText as="h1" text={"Severin\nHilbert"} className="typed-heading" delay={220} />
          <TypedIntroDescription age={age} delay={620} />
          <TerminalOutput delay={1.68}>
            <div className="hero-links">
              <a href="mailto:severin.hilbert@gmail.com">
                <Mail className="size-4" />
                severin.hilbert@gmail.com
              </a>
              <span>
                <MapPin className="size-4" />
                Vienna, Austria
              </span>
            </div>
          </TerminalOutput>
          <TerminalOutput delay={1.82}>
            <div className="social-row">
              {socials.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="size-5" style={{ color: social.color }} />
                  </a>
                );
              })}
            </div>
          </TerminalOutput>
        </motion.div>
      </div>
    </section>
  );
}

