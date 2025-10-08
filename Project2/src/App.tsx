import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = (): void => {
    // setCount(count + 1);
    setCount((prev) => prev + 1); // prev: 이전 상태값 -> 이렇게 하는게 좋음 
    console.log(count);
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleIncrease}>증가</button>
    </>
  );
}

export default App;
