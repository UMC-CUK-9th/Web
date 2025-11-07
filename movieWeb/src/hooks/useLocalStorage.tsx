import { useState } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // 🔹 JSON이 아니면 그대로 반환
      return item ? (item as unknown as T) : initialValue;
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
