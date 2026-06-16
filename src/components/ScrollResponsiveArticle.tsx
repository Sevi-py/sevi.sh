import { type ReactNode, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export function ScrollResponsiveArticle({
  children,
  className,
}: {
  children: ReactNode | ((isVisible: boolean) => ReactNode);
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 94%", "start 54%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.86], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [26, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0) {
      setHasEntered(true);
    }

    if (latest >= 1) {
      setHasSettled(true);
    }
  });

  const renderedChildren =
    typeof children === "function" ? children(shouldReduceMotion || hasEntered) : children;

  if (shouldReduceMotion) {
    return <article className={className}>{renderedChildren}</article>;
  }

  return (
    <motion.article
      ref={ref}
      layout="position"
      className={className}
      style={hasSettled ? undefined : { opacity, y }}
      animate={hasSettled ? { opacity: 1, y: 0 } : undefined}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      {renderedChildren}
    </motion.article>
  );
}

