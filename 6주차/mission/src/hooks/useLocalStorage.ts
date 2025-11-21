export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      // value가 string이라면 JSON.stringify 안 하고 그대로 저장
      if (typeof value === "string") {
        window.localStorage.setItem(key, value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("LocalStorage setItem error:", error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      // JSON이 아닌 순수 문자열(JWT 등)은 그대로 반환
      try {
        return JSON.parse(item);
      } catch {
        return item; // 문자열 그대로 리턴
      }
    } catch (error) {
      console.error("LocalStorage getItem error:", error);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("LocalStorage removeItem error:", error);
    }
  };

  return { setItem, getItem, removeItem };
};
