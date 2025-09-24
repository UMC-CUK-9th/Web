import { createContext } from "react";

interface TodoContextType {
  todos: string[],
  done: string[],
  handleAddDone: (id:number) => void;
  handleDeleteDone: (id:number) => void;
  setTodos: React.Dispatch<React.SetStateAction<string[]>>,
  setDone: React.Dispatch<React.SetStateAction<string[]>>
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);