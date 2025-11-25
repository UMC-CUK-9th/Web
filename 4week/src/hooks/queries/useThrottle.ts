import { useRef, useCallback, useEffect } from "react";

/**
 * @param callback 쓰로틀을 적용할 함수
 * @param delay 쓰로틀 지연 시간 (ms)
 * @returns 쓰로틀이 적용된 함수
 */
export const useThrottle = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  // '쿨타임' 상태를 저장할 ref
  const isThrottled = useRef(false);
  // 마지막 타이머를 저장할 ref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 컴포넌트 언마운트 시 타이머 제거
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 쓰로틀이 적용된 콜백 함수 (useCallback으로 캐싱)
  const throttledCallback = useCallback(
    (...args: any[]) => {
      // 1. '쿨타임' 중이면 아무것도 하지 않고 리턴
      if (isThrottled.current) {
        // (콘솔) 쿨타임 중이라 무시됨
        // console.log("--- 쿨타임 ---"); 
        return;
      }

      // 2. '쿨타임'이 아니라면,
      //    (콘솔) 영상처럼 로그 실행
      console.log("🔥 THROTTLE: 이벤트 실행! (쿨타임 300ms 시작)");
      
      // 3. 원본 콜백 함수 실행
      callback(...args);
      
      // 4. '쿨타임' 상태로 변경
      isThrottled.current = true;

      // 5. 'delay' 시간 후에 '쿨타임' 해제
      timeoutRef.current = setTimeout(() => {
        isThrottled.current = false;
      }, delay);
    },
    [callback, delay]
  );

  return throttledCallback;
};