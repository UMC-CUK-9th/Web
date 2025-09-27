import React, { createContext, useState, useContext } from "react";
import type { PropsWithChildren } from "react";
import type { TTodo } from "../types/todo";
import type { JSX } from "react/jsx-dev-runtime";


interface ITodoContext {
todos: TTodo[];
doneTodos: TTodo[];
addTodo: (text: string) => void;
completeTodo: (todo: TTodo) => void;
deleteTodo: (todo: TTodo) => void;
}


const TodoContext = createContext<ITodoContext | undefined>(undefined);


export const TodoProvider = ({ children }: PropsWithChildren): JSX.Element => {

const [todos, setTodos] = useState<TTodo[]>([]);
const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);


const addTodo = (text: string): void => {
const newTodo: TTodo = { id: Date.now(), text };
setTodos((prevTodos) => [...prevTodos, newTodo]);
};


const completeTodo = (todo: TTodo): void => {
setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
};


const deleteTodo = (todo: TTodo): void => {
setDoneTodos((prevDoneTodos) => prevDoneTodos.filter((t) => t.id !== todo.id));
};


return (
<TodoContext.Provider value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
{children}
</TodoContext.Provider>
);
};


export const useTodo = (): ITodoContext => {
const context = useContext(TodoContext);
if (!context) {
throw new Error("useTodo 훅을 사용하려면, 반드시 TodoProvider로 감싸야 합니다.");
}
return context;
};