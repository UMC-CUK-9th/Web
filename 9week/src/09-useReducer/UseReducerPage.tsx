import { useReducer } from "react"

interface IState {
    counter: number;
}
// payload를 포함할 수 있도록 IAction 인터페이스를 수정합니다.
// INCREASE와 DECREASE 액션만 payload가 필요하며, RESET_TO_ZERO는 payload가 없습니다.
type IAction = 
    | { type: 'INCREASE' | 'DECREASE'; payload: number }
    | { type: 'RESET_TO_ZERO' };

function reducer(state: IState, action: IAction): IState {
    const {type} = action;

    switch (type){
        case 'INCREASE':
            // type이 'INCREASE'일 때 action은 { type: 'INCREASE', payload: number } 타입임을 보장합니다.
            return {
                ...state, 
                counter: state.counter + action.payload,
            };
        case 'DECREASE':
            // type이 'DECREASE'일 때 action은 { type: 'DECREASE', payload: number } 타입임을 보장합니다.
            return {
                ...state,
                counter: state.counter - action.payload,
            };
        case 'RESET_TO_ZERO':
            return {
                ...state,
                counter: 0,
            };
        default:
            return state;
    }
}

export default function UseReducerPage(){
    const [state, dispatch] = useReducer(reducer, {
        counter: 0,
    });;
    
    // 증가/감소 값을 상수로 정의
    const INCREMENT_VALUE = 1;
    const DECREMENT_VALUE = 1;

    return (
        // 1. 가운데 정렬을 위해 div의 style을 수정합니다.
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', // 가로(수평) 중앙 정렬
            justifyContent: 'center', // 세로(수직) 중앙 정렬 (화면 전체에 적용하려면 부모 요소 높이 지정 필요)
            minHeight: '100vh', // 화면 전체 높이를 사용하여 세로 중앙 정렬 효과를 냅니다.
            padding: '20px', 
        }}>
            <div style={{ 
                border: '1px solid #ccc', 
                padding: '20px', 
                textAlign: 'center' // 텍스트와 인라인 요소들을 중앙 정렬
            }}>
                <h2 className="text-3xl">useReducer 훅 예제</h2>
                <h2>현재 카운터: {state.counter}</h2>
                
                {/* 2. INCREASE 액션에 payload를 추가합니다. */}
                <button 
                    onClick={() => dispatch({ type: 'INCREASE', payload: INCREMENT_VALUE })}
                    style={{ 
                        padding: '10px 20px', 
                        marginRight: '10px', 
                        backgroundColor: 'blue', 
                        color: 'white', 
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Increase (+{INCREMENT_VALUE})
                </button>
                
                {/* 2. DECREASE 액션에도 payload를 추가합니다. */}
                <button 
                    onClick={() => dispatch({ type: 'DECREASE', payload: DECREMENT_VALUE })}
                    style={{ 
                        padding: '10px 20px', 
                        marginRight: '10px', 
                        backgroundColor: 'red', 
                        color: 'white', 
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Decrease (-{DECREMENT_VALUE})
                </button>
                
                <button 
                    onClick={() => dispatch({ type: 'RESET_TO_ZERO' })}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: 'gray', 
                        color: 'white', 
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}