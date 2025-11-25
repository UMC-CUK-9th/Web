import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, interval = 1000): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const lastExecuted = useRef<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const remaining = interval - (now - lastExecuted.current);

    if (remaining <= 0) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
        timer.current = null;
      }, remaining);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [value, interval]);

  return throttledValue;
}
