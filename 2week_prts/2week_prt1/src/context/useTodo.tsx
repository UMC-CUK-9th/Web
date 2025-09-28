import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      'useTodo는 반드시 CountProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};