import { useEffect, useRef, useState } from "react";

export function useStartOnView<T extends HTMLElement>(rootMargin = "0px 0px 18% 0px") {
  const ref = useRef<T | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) {
      return undefined;
    }

    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasStarted, rootMargin]);

  return [ref, hasStarted] as const;
}

