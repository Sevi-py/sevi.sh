import { motion } from "motion/react";
import { tools } from "../../content/profile";
import { ShellLine } from "../text/ShellLine";
import { TypingText } from "../text/TypingText";

export function StackSection() {
  return (
    <section id="stack" className="section">
      <div className="page section-stack">
        <ShellLine command="ls things-i-like" />
        <TypingText as="h2" text="Things I like" delay={160} />
        <div className="tool-list">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 18% 0px" }}
                transition={{ duration: 0.22, delay: 0.44 + Math.min(index, 6) * 0.018 }}
                className="tool-item"
              >
                {tool.logo ? (
                  <img src={tool.logo} alt={`${tool.name} logo`} loading="lazy" decoding="async" />
                ) : IconComponent ? (
                  <IconComponent className="size-6" style={{ color: tool.color }} />
                ) : null}
                <span>{tool.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

