import Todo from "./components/Todo";
import { TodoProvider } from "./context/TodoContext";
import ContextPage from "./page/ContextPage";

export default function App() {
  return (
    // <TodoProvider>
    //   <Todo />
    // </TodoProvider>
    <>
      <ContextPage />
    </>
  );
}
