import { useState, useEffect, useRef } from 'react';


export const useThrottle = <T>(value: T, interval: number = 300): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const timeElapsed = Date.now() - lastRan.current;

    const delay = interval - timeElapsed;

    const handler = setTimeout(() => {
      setThrottledValue(value);
      lastRan.current = Date.now(); 
    }, delay > 0 ? delay : 0);

    return () => {
      clearTimeout(handler);
    };
  }, [value, interval]); 

  return throttledValue;
};