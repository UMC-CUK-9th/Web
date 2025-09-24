import { useState, type PropsWithChildren } from 'react';
import { TodoContext } from './TodoContext';

export const TodoProvider = ({ children }:PropsWithChildren) => {
  const [todos,setTodos]=useState<string[]>([]);
  const [done,setDone]=useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleAddDone = (id:number) => {
        setDone((prev)=>[...prev,todos[id]]);
        const newTodos = todos.filter((_, idx) => idx !== id);
        setTodos(newTodos); 
    }

    const handleDeleteDone = (id:number) => {
        const newDone = done.filter((_, idx) => idx !== id);
        setDone(newDone);
    }

  return (
    <TodoContext.Provider
      value={{ todos, done, handleAddDone, handleDeleteDone, setTodos, setDone, isDarkMode, setIsDarkMode }}
    >
      {children}
    </TodoContext.Provider>
  );
};