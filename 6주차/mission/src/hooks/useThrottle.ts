import { useEffect, useRef, useState } from "react";

/**
 * useThrottle 훅
 * @param value 스로틀링할 값 (제네릭)
 * @param interval 스로틀 간격(ms)
 * @returns 스로틀링된 값
 */
// value 타입 스로틀링
export function useThrottle<T>(value: T, interval: number): T;
// 콜백(함수) 타입 스로틀링
export function useThrottle<T extends (...args: any[]) => any>(fn: T, interval: number): T;
export function useThrottle<T>(input: T, interval: number): any {
  // 콜백이면 함수 스로틀링, 아니면 값 스로틀링
  if (typeof input === "function") {
    const fn = input as (...args: any[]) => any;
    const lastExecuted = useRef<number>(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const savedArgs = useRef<any[]>([]);

    // 반환할 스로틀링된 함수
    const throttledFn = (...args: any[]) => {
      const now = Date.now();
      const remaining = interval - (now - lastExecuted.current);
      savedArgs.current = args;
      if (remaining <= 0) {
        fn(...args);
        lastExecuted.current = now;
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          fn(...savedArgs.current);
          lastExecuted.current = Date.now();
        }, remaining);
      }
    };

    // cleanup
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [interval, fn]);

    return throttledFn as T;
  } else {
    // 값 스로틀링 (기존 로직)
    const [throttledValue, setThrottledValue] = useState<T>(input);
    const lastExecuted = useRef<number>(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      const now = Date.now();
      const remaining = interval - (now - lastExecuted.current);

      if (remaining <= 0) {
        setThrottledValue(input);
        lastExecuted.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setThrottledValue(input);
          lastExecuted.current = Date.now();
        }, remaining);
      }

      // cleanup: 언마운트/의존성 변경 시 타이머 해제
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, [input, interval]);

    return throttledValue;
  }
}