import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useStartOnView } from "../../hooks/useStartOnView";

export function TerminalOutput({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, hasStarted] = useStartOnView<HTMLDivElement>();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`terminal-output${className ? ` ${className}` : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.26, delay: shouldReduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

