import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";

const Todo = () => {
  const { todos, completeTodo, doneTodos, deleteTodo, isDarkMode } = useTodo();

  return (
    <div className="todo-container text-center"> 
      <h1 className="todo-container__header">YONG TODO</h1>
      <TodoForm />
      <div className="render-container flex justify-between gap-8 mt-4">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
          isDarkMode={isDarkMode}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default Todo;
