import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";
import clsx from "clsx";

const TodoForm = () => {
  const [input, setInput] = useState<string>("");
  const { addTodo, isDarkMode } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      addTodo(text);
      setInput("");
    }
  };

  return (
    <form className="todo-container__form flex gap-2" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className={clsx(
          "todo-container__input px-3 py-2 rounded-md border transition-colors duration-300",
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-black placeholder-gray-500"
        )}
        placeholder="할 일 입력"
        required
      />
      <button
        type="submit"
        className={clsx(
          "todo-container__button px-4 py-2 rounded-md font-medium transition-colors duration-300",
          isDarkMode
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-green-600 text-white hover:bg-green-500"
        )}
      >
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
