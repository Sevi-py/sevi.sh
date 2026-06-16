import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useStartOnView } from "../../hooks/useStartOnView";

export function TypedIntroDescription({ age, delay = 0 }: { age: string; delay?: number }) {
  const prefix = "Developer in Vienna, Austria. Currently ";
  const suffix =
    " years old. I build AI-native products, privacy-minded tools, and calm software.";
  const shouldReduceMotion = useReducedMotion();
  const [ref, hasStarted] = useStartOnView<HTMLParagraphElement>();
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const totalCharacters = prefix.length + suffix.length;
  const visiblePrefix = prefix.slice(0, Math.min(visibleCharacters, prefix.length));
  const visibleSuffix = suffix.slice(0, Math.max(0, visibleCharacters - prefix.length));
  const showAge = visibleCharacters > prefix.length || shouldReduceMotion;

  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    if (shouldReduceMotion) {
      setVisibleCharacters(totalCharacters);
      return undefined;
    }

    setVisibleCharacters(0);
    let typeTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      let nextCharacter = 0;
      typeTimer = window.setInterval(() => {
        nextCharacter += 1;
        setVisibleCharacters(nextCharacter);

        if (nextCharacter >= totalCharacters) {
          window.clearInterval(typeTimer);
        }
      }, 8);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (typeTimer) {
        window.clearInterval(typeTimer);
      }
    };
  }, [delay, hasStarted, shouldReduceMotion, totalCharacters]);

  return (
    <p
      ref={ref}
      className={`intro typing-text${visibleCharacters < totalCharacters ? " is-typing" : ""}`}
    >
      <span className="sr-only">{`${prefix}${age}${suffix}`}</span>
      <span aria-hidden="true">
        {visiblePrefix}
        {showAge ? <span className="age">{age}</span> : null}
        {visibleSuffix}
      </span>
    </p>
  );
}

