import { useReducer, useState } from 'react'
import './App.css'

interface IState {
  counter: number;
}
interface IAction {
  type: 'INCREASE' | 'DECREASE' |'RESET_TO_ZERO';
}

function reducer(state: IState, action: IAction) {
  const {type} = action;

  switch (type) {
    case 'INCREASE': {
      return {
        ...state,
        counter: state.counter + 1,
      }
    }
    case 'DECREASE':{
      return {
        ...state,
        counter: state.counter - 1,
      }
    }

    case 'RESET_TO_ZERO': {
      return {
        ...state,
        counter: 0,
      }
    }
      
    default:
      return state;
  }
}
function App() {
  //useState
  const [count, setCount] = useState(0)

  const handleIncrease =()=> {
    setCount(count+1);
  };


  //useReducer
  const[state, dispatch] = useReducer(reducer, {
    counter: 0,
  });

  return (
    <>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className='text-3xl'>useState</h2>
          <h2>{count}</h2>
          <button onClick={handleIncrease}>Increase</button>
        </div>

        <div>
          <h2 className='text-3xl'>useReducer</h2>
          <h2>{state.counter}</h2>
          <button onClick={() => dispatch({
            type: 'INCREASE',
            })}
            >
            Increase
          </button>
          <button onClick={() => dispatch({
            type: 'DECREASE'
            })}
            >
            Decrease
          </button>
          <button onClick={() => dispatch({
            type: 'RESET_TO_ZERO'
            })}
            >
            Reset to Zero
          </button>
        </div>
      </div>
    </>
  )
}

export default App
