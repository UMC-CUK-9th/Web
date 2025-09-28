import React, { useState, type FormEvent } from "react";
import type { TTodo } from "../types/todo";

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    const text = input.trim();

    if(text){
      const newTodo : TTodo = {id: Date.now(), text};
      setTodos((prevTodos: TTodo[]) => [...prevTodos, newTodo]);
    }
  };
  const completeTodo = (todo: TTodo) : void => {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
    setDoneTodos((prevDoneTodos: TTodo[]) => [...prevDoneTodos, todo]);
  };
  const deleteTodo = (todo: TTodo) : void => {
    setDoneTodos((prevDoneTodo):TTodo[]=>
      prevDoneTodo.filter((t):boolean => t.id !== todo.id)
    );
  };
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">BEOM TODO</h1>
      <form className="todo-container__form" onSubmit={handleSubmit}>
        <input 
        type="text" 
        className="todo-container__input" 
        placeholder="할 일을 입력!"
        required
        value={input}
        onChange={e => setInput(e.target.value)}
        />  
        <button
         type="submit"
         className="todo-container__button">
          할 일 추가
         </button>
        </form>
        <div className="render-container">
          <div className="render-container__section">
            <h2 className="render-container__title">할일</h2>
            <ul id='todo-list' className="render-container__list">
              {todos.map((todo) => (
                <li className="render-container__item" key={todo.id}>
                 <span className="render-container__item-text">{todo.text}</span>
                <button
                onClick={():void => completeTodo(todo)}
                style={{
                  backgroundColor: '#28a745',
                }} 
                className="render-container__item-button">완료</button>
               </li>
              ))}
            </ul>
            </div>
          <div className="render-container__section">
            <h2 className="render-container__title">완료</h2>
            <ul id='todo-list' className="render-container__list">
              {doneTodos.map((todo) => (
                <li className="render-container__item" key={todo.id}>
                 <span className="render-container__item-text">{todo.text}</span>
                <button
                onClick={():void => deleteTodo(todo)}
                style={{
                  backgroundColor: '#dc3545',
                }} 
                className="render-container__item-button">삭제</button>
               </li>
              ))}
            </ul>
        </div>
     </div>
    </div>
  );
};

export default Todo;