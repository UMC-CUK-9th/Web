import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useTodo } from "./context/useTodo";
import clsx from "clsx";

function App() {
  const todo=useTodo();
  const {isDarkMode,setIsDarkMode} = useTodo();

  return (
    <div className={clsx("body", isDarkMode ? 'text-white bg-[#7e7e7eff]' : 'text-black bg-[#eef2f3]')}>
      <div className={clsx("todo-container", isDarkMode ? 'bg-[#1c1c1cff]' : 'bg-white' )}>
        <button 
          className={`mb-5 w-40 h-10 rounded-full cursor-pointer 
          ${isDarkMode? 'bg-black text-white':'bg-white text-black border border-gray-400'}`}
          onClick={()=>setIsDarkMode(prev => !prev)} >다크모드 on/off</button>
        <h1 className="todo-container__header">YONG TODO</h1>
        <TodoInput setTodos={todo.setTodos} />
        <div className="render-container">
          <TodoList list={todo.todos} title='할 일' handleAddDone={todo.handleAddDone} handleDeleteDone={todo.handleDeleteDone} isDarkMode={isDarkMode}/>
          <TodoList list={todo.done} title='완료' handleAddDone={todo.handleAddDone} handleDeleteDone={todo.handleDeleteDone} isDarkMode={isDarkMode}/>
        </div>
      </div>
    </div>
  )
}

export default App
