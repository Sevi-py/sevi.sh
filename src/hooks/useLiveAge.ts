import { useEffect, useState } from "react";

export function useLiveAge() {
  const [age, setAge] = useState("18.000000000");

  useEffect(() => {
    const birth = new Date("2008-01-11T09:00:00+01:00").getTime();
    const tropicalYearMs = 365.2425 * 24 * 60 * 60 * 1000;

    const tick = () => {
      setAge(((Date.now() - birth) / tropicalYearMs).toFixed(9));
    };

    tick();
    const interval = window.setInterval(tick, 75);
    return () => window.clearInterval(interval);
  }, []);

  return age;
}

