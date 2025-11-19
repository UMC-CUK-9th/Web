import { useState, useEffect } from "react";

/**
 * @param value 디바운싱할 대상 값
 * @param delay 디바운싱 지연 시간 (ms)
 * @returns 디바운싱이 적용된 값
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  // 디바운싱된 값을 저장할 state
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // [체크리스트] value가 변경되면, delay 이후에 debouncedValue를 업데이트합니다.
    const handler = setTimeout(() => {
      console.log("===============================");
      console.log("⏰⏰ DEBOUNCE 실행! ⏰⏰");
      setDebouncedValue(value);
      console.log("===============================");
    }, delay);

    // [체크리스트] (clearTimeout)
    // value가 delay가 지나기 전에 또 변경되면(사용자가 타이핑을 계속하면),
    // 이전에 설정된 타이머를 취소(clear)하고 새 타이머를 설정합니다.
    return () => {
      // ⬇️ 영상처럼 로그가 찍히도록 콘솔 추가
      console.log(" debounce [clearTimeout]... (기존 타이머 취소)");
      clearTimeout(handler);
    };
  }, [value, delay]); // [체크리스트] value나 delay가 변경될 때마다 이 effect를 재실행합니다.

  return debouncedValue;
};