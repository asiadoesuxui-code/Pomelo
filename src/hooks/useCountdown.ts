import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
}

function getRemaining(weddingDate: Date): Countdown {
  const target = weddingDate.getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

export function useCountdown(weddingDate: Date): Countdown {
  const [countdown, setCountdown] = useState(() => getRemaining(weddingDate));

  useEffect(() => {
    setCountdown(getRemaining(weddingDate));
    const interval = setInterval(() => {
      setCountdown(getRemaining(weddingDate));
    }, 60_000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  return countdown;
}
