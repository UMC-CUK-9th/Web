import ButtonGroup from "../components/ButtonGroup";
import { useCount } from "../context/CounterProvider";

function Counter() {
  const { count } = useCount();

  return (
    <>
      <h1>{count}</h1>
      <ButtonGroup />
    </>
  );
}

export default Counter;
