import { createElement, useEffect, useState, type ElementType } from "react";
import { useReducedMotion } from "motion/react";
import { useStartOnView } from "../../hooks/useStartOnView";

const decryptCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+-<>";

function randomDecryptCharacter() {
  return decryptCharacters[Math.floor(Math.random() * decryptCharacters.length)] ?? "#";
}

export function DecryptedText({
  text,
  as: Component = "span",
  className,
  delay = 0,
  revealStep = 1,
  interval = 28,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  revealStep?: number;
  interval?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [ref, hasStarted] = useStartOnView<HTMLElement>();
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [scrambledText, setScrambledText] = useState(text);

  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    if (shouldReduceMotion) {
      setVisibleCharacters(text.length);
      setScrambledText(text);
      return undefined;
    }

    setVisibleCharacters(0);
    setScrambledText(
      text
        .split("")
        .map((character) => (character.trim() ? randomDecryptCharacter() : character))
        .join(""),
    );

    let revealTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      revealTimer = window.setInterval(() => {
        setVisibleCharacters((current) => {
          const next = Math.min(text.length, current + revealStep);

          setScrambledText(
            text
              .split("")
              .map((character, index) => {
                if (index < next || !character.trim()) {
                  return character;
                }

                return randomDecryptCharacter();
              })
              .join(""),
          );

          if (next >= text.length && revealTimer) {
            window.clearInterval(revealTimer);
          }

          return next;
        });
      }, interval);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (revealTimer) {
        window.clearInterval(revealTimer);
      }
    };
  }, [delay, hasStarted, interval, revealStep, shouldReduceMotion, text]);

  return createElement(
    Component,
    {
      ref,
      className: `decrypted-text${visibleCharacters < text.length ? " is-decrypting" : ""}${
        className ? ` ${className}` : ""
      }`,
    },
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{scrambledText}</span>
    </>,
  );
}

