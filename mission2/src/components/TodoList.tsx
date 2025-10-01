import type { TTodo } from "../types/todo";
import clsx from "clsx";

interface TodoListProps {
  title: string;
  todos: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
  isDarkMode: boolean;   
}

const TodoList = ({
  title,
  todos,
  buttonLabel,
  buttonColor,
  onClick,
  isDarkMode,
}: TodoListProps) => {
  return (
    <div
      className={clsx(
        "render-container__section p-4 rounded-lg transition-colors duration-300",
        isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
      )}
    >
      <h2 className="render-container__title mb-2">{title}</h2>
      <ul id="todo-list" className="render-container__list space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={clsx(
              "render-container__item flex justify-between items-center p-2 rounded-md transition-colors duration-300",
              isDarkMode ? "bg-gray-600" : "bg-white"
            )}
          >
            <span className="render-container__item-text">{todo.text}</span>
            <button
              style={{ backgroundColor: buttonColor }}
              className="render-container__item-button px-3 py-1 rounded text-white"
              onClick={() => onClick(todo)}
            >
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
