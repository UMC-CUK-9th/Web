import { useState, useEffect } from "react";
import clsx from "clsx";
import Input from "./components/Input";
import List from "./components/list";
import ThemeToggle from "./components/ThemeToggle";
import { useTodo } from "./context/useTodo";

function App() {
  const todo = useTodo();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.getElementById('root')?.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      const root = document.getElementById('root');
      if (newMode) {
        root?.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        root?.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

   return (
    <>
      <div className={clsx("todo-container", { "dark-mode": isDarkMode })}>
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <h1 className="todo-container__header">YONG TODO</h1>
        <Input setTodos={todo.setTodos} isDarkMode={isDarkMode} />
        <div className="render-container">
          <List list={todo.todos} title='할 일' handleAddDone={todo.handleAddDone} handleDeleteDone={todo.handleDeleteDone} isDarkMode={isDarkMode}/>
          <List list={todo.done} title='완료' handleAddDone={todo.handleAddDone} handleDeleteDone={todo.handleDeleteDone} isDarkMode={isDarkMode}/>
        </div>
      </div>
    </>
  )

}

export default App