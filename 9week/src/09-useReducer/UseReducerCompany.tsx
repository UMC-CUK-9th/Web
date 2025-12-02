import { useReducer, useState, type ChangeEvent } from "react";

interface IState {
    department: string;
    error: string | null;
}

interface ChangeDepartmentAction {
    type: 'CHANGE_DEPARTMENT';
    payload: string;
}

interface ResetAction {
    type: 'RESET';
}

type IAction = ChangeDepartmentAction | ResetAction;

function reducer(state: IState, action: IAction): IState {
    const { type } = action;

    switch (type) {
        case 'CHANGE_DEPARTMENT':
            const newDepartment = (action as ChangeDepartmentAction).payload.trim();

            // '카드메이커' 단어와 정확히 일치하는지 확인합니다.
            if (newDepartment === '카드메이커') {
                // '카드메이커'인 경우, department를 변경하고 error를 초기화합니다.
                return {
                    department: newDepartment,
                    error: null,
                };
            } else {
                // '카드메이커'가 아닌 경우, 거부 메시지를 error에 설정합니다.
                return {
                    ...state,
                    error: "카드메이커만 가능합니다!!",
                };
            }
            
        case 'RESET':
            return {
                department: 'Software Developer',
                error: null,
            };

        default:
            return state;
    }
}

export default function UseReducerCompany() {
    const [state, dispatch] = useReducer(reducer, {
        department: 'Software Developer',
        error: null,
    });
    
    const [departmentInput, setDepartmentInput] = useState('');
    
    const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
        setDepartmentInput(e.target.value);
    };
    
    const handleDispatchChange = () => {
        dispatch({
            type: 'CHANGE_DEPARTMENT',
            payload: departmentInput,
        });
        setDepartmentInput('');
    };

    return (
        <div style={{ padding: '20px', border: '2px solid #ddd', maxWidth: '400px', margin: '50px auto' }}>
            <h1>현재 직무: {state.department}</h1>
            {state.error && <p style={{ color: 'red', fontSize: '1.2rem', marginTop: '10px' }}>{state.error}</p>}

            <input 
                placeholder="변경하시고 싶은 직무를 입력해주세요. ('카드메이커'만 가능)"
                value={departmentInput}
                onChange={handleChangeDepartment}
                style={{
                    padding: '10px',
                    margin: '10px 0',
                    width: '100%',
                    boxSizing: 'border-box',
                    border: '1px solid #ccc'
                }}
            />
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                    onClick={handleDispatchChange}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        flexGrow: 1
                    }}
                    disabled={!departmentInput.trim()}
                >
                    직무 변경 요청
                </button>
                
                <button 
                    onClick={() => dispatch({ type: 'RESET' })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: 'gray',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    초기화
                </button>
            </div>
        </div>
    );
}