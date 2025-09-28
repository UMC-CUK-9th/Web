import React from "react";
import type { TTodo } from "../types/todo";


type Props = {
todos: TTodo[];
doneTodos: TTodo[];
onComplete: (todo: TTodo) => void;
onDelete: (todo: TTodo) => void;
};


const TodoList: React.FC<Props> = ({ todos, doneTodos, onComplete, onDelete }) => {
return (
<>
<div className="render-container__section">
<h2 className="render-container__title">할일</h2>
<ul id="todo-list" className="render-container__list">
{todos.map((todo) => (
<li className="render-container__item" key={todo.id}>
<span className="render-container__item-text">{todo.text}</span>
<button
onClick={() => onComplete(todo)}
style={{ backgroundColor: "#28a745" }}
className="render-container__item-button"
>
완료
</button>
</li>
))}
</ul>
</div>


<div className="render-container__section">
<h2 className="render-container__title">완료</h2>
<ul id="done-list" className="render-container__list">
{doneTodos.map((todo) => (
<li className="render-container__item" key={todo.id}>
<span className="render-container__item-text">{todo.text}</span>
<button
onClick={() => onDelete(todo)}
style={{ backgroundColor: "#dc3545" }}
className="render-container__item-button"
>
삭제
</button>
</li>
))}
</ul>
</div>
</>
);
};


export default TodoList;