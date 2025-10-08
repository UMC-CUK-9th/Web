import "../App.css";
import { useState } from "react";
import { type TTodo } from "../types/todo";

const TodoBefore = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      const newTodo: TTodo = {
        id: Date.now(),
        text,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);

      setInput("");
    }
  };

  const handleComplete = (todo: TTodo): void => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (id: number): void => {
    setDoneTodos((prevDoneTodos) => prevDoneTodos.filter((t) => t.id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">E-hyeon TODO</h1>
      <form onSubmit={handleSubmit} className="todo-container__form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          id="todo-input"
          className="todo-container__input"
          placeholder="할 일을 입력해주세요."
          required
        />
        <button type="submit" className="todo-container__button">
          할일 추가
        </button>
      </form>
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => handleComplete(todo)}
                  className="render-container__item-button"
                  style={{ backgroundColor: "#28a745" }}
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
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="render-container__item-button"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoBefore;
