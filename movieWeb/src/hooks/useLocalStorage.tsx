import { useState } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // JSON 파싱 시도, 실패 시 원본 값 반환
      if (!item) return initialValue;
      try {
        return JSON.parse(item) as T;
      } catch {
        // 파싱 실패 시 원본 문자열 반환 (순수 문자열 값인 경우)
        return item as unknown as T;
      }
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);

      // 문자열은 그대로 저장 (따옴표 없음)
      if (typeof value === "string") {
        window.localStorage.setItem(key, value);
      } else {
        // 객체/배열 등은 JSON으로 저장
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {
      console.error("localStorage 저장 실패");
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {
      console.error("localStorage 삭제 실패");
    }
  };

  return { storedValue, setValue, removeValue };
};
