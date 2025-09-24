import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useTodo } from "./context/useTodo";


function App() {
  const todo=useTodo();

  return (
    <>
      <div className="todo-container">
        <h1 className="todo-container__header">YONG TODO</h1>
        <TodoInput setTodos={todo.setTodos} />
        <div className="render-container">
          <TodoList list={todo.todos} title='할 일' handleAddDone={todo.handleAddDone} handleDeleteDone={todo.handleDeleteDone}/>
          <TodoList list={todo.done} title='완료' handleAddDone={todo.handleAddDone} handleDeleteDone={todo.handleDeleteDone}/>
        </div>
      </div>
    </>
  )
}

export default App
