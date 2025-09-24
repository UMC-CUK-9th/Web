import { createContext } from "react";

interface TodoContextType {
  todos: string[],
  done: string[],
  handleAddDone: (id:number) => void;
  handleDeleteDone: (id:number) => void;
  setTodos: React.Dispatch<React.SetStateAction<string[]>>,
  setDone: React.Dispatch<React.SetStateAction<string[]>>,
  isDarkMode: boolean,
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>,

}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);