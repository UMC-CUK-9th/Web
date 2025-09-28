import React, { useState } from "react";
import type { TTodo } from "../types/todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";


const Todo: React.FC = () => {
const [todos, setTodos] = useState<TTodo[]>([]);
const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);


const addTodo = (text: string): void => {
const newTodo: TTodo = { id: Date.now(), text };
setTodos((prev) => [...prev, newTodo]);
};


const completeTodo = (todo: TTodo): void => {
setTodos((prev) => prev.filter((t) => t.id !== todo.id));
setDoneTodos((prev) => [...prev, todo]);
};


const deleteTodo = (todo: TTodo): void => {
setDoneTodos((prev) => prev.filter((t) => t.id !== todo.id));
};


return (
<div className="todo-container">
<h1 className="todo-container__header">BEOM TODO 2week</h1>


<TodoForm onAdd={addTodo} />


<div className="render-container">
<TodoList
todos={todos}
doneTodos={doneTodos}
onComplete={completeTodo}
onDelete={deleteTodo}
/>
</div>
</div>
);
};


export default Todo;