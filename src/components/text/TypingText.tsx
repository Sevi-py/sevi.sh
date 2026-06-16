import { createElement, useEffect, useState, type ElementType } from "react";
import { useReducedMotion } from "motion/react";
import { useStartOnView } from "../../hooks/useStartOnView";

export function TypingText({
  text,
  as: Component = "span",
  className,
  delay = 0,
  speed = 22,
  start,
  adaptive = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  speed?: number;
  start?: boolean;
  adaptive?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [ownRef, ownStart] = useStartOnView<HTMLElement>();
  const isStarted = start ?? ownStart;
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (!isStarted) {
      return undefined;
    }

    if (shouldReduceMotion) {
      setVisibleCharacters(text.length);
      return undefined;
    }

    setVisibleCharacters(0);

    if (adaptive) {
      let frame: number;
      let previousTime = performance.now();
      let previousScrollY = window.scrollY;
      let scrollVelocity = 0;
      let typedCharacters = 0;

      const tick = (time: number) => {
        const delta = Math.max(1, time - previousTime);
        const scrollY = window.scrollY;
        const instantVelocity = Math.abs(scrollY - previousScrollY) / delta;
        const element = ownRef.current;
        const rect = element?.getBoundingClientRect();
        const behindViewportLine = rect
          ? Math.max(0, window.innerHeight * 0.55 - rect.top)
          : 0;

        scrollVelocity = scrollVelocity * 0.72 + instantVelocity * 0.28;
        typedCharacters +=
          (delta / speed) *
          Math.min(3.2, 1 + scrollVelocity * 0.55 + behindViewportLine / 320);

        const nextCharacter = Math.min(text.length, Math.floor(typedCharacters));
        setVisibleCharacters(nextCharacter);

        previousTime = time;
        previousScrollY = scrollY;

        if (nextCharacter < text.length) {
          frame = window.requestAnimationFrame(tick);
        }
      };

      frame = window.requestAnimationFrame(tick);

      return () => window.cancelAnimationFrame(frame);
    }

    let typeTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      let nextCharacter = 0;
      typeTimer = window.setInterval(() => {
        nextCharacter += 1;
        setVisibleCharacters(nextCharacter);

        if (nextCharacter >= text.length) {
          window.clearInterval(typeTimer);
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (typeTimer) {
        window.clearInterval(typeTimer);
      }
    };
  }, [adaptive, delay, isStarted, ownRef, shouldReduceMotion, speed, text]);

  return createElement(
    Component,
    {
      ref: ownRef,
      className: `typing-text${visibleCharacters < text.length ? " is-typing" : ""}${
        className ? ` ${className}` : ""
      }`,
    },
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, visibleCharacters)}</span>
    </>,
  );
}

