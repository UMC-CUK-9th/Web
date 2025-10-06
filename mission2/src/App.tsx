import "./App.css";
import Todo from "./components/Todo";
import { TodoProvider, useTodo } from "./context/TodoContext";
import clsx from "clsx";

function InnerApp() {
  const { isDarkMode, setIsDarkMode } = useTodo();

  return (
    <div
      className={clsx(
        "min-h-screen flex items-center justify-center", 
        isDarkMode ? "bg-[#1c1c1cff] text-white" : "bg-[#eef2f3] text-black"
      )}
    >
      <div
        className={clsx(
          "p-8 rounded-2xl shadow-lg",
          isDarkMode ? "bg-[#2c2c2c]" : "bg-white"
        )}
      >
        <button
          className={`mb-5 w-40 h-10 rounded-full cursor-pointer 
          ${isDarkMode ? "bg-black text-white" : "bg-white text-black border border-gray-400"}`}
          onClick={() => setIsDarkMode((prev) => !prev)}
        >
          다크모드 {isDarkMode ? "OFF" : "ON"}
        </button>

        <Todo />
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <InnerApp />
    </TodoProvider>
  );
}

export default App;
