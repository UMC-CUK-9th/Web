import React, {  useState } from "react";
import clsx from "clsx";

interface InputProps {
    setTodos: React.Dispatch<React.SetStateAction<string[]>>;
    isDarkMode: boolean;
}

const Input=({setTodos, isDarkMode}:InputProps) => {
    const [todo,setTodo]=useState('');
    const handleAddTodos = (event:React.FormEvent) =>{
        event.preventDefault()
        setTodos((prev)=>[...prev,todo]);
        setTodo('');
    }

    return (
        <>
            <form id="todo-form" className="todo-container__form" onSubmit={handleAddTodos}>
                <input
                    type="text"
                    id="todo-input"
                    className={clsx("todo-container__input", { "dark-mode": isDarkMode })}
                    placeholder="할 일 입력"
                    value={todo}
                    onChange={(e)=>setTodo(e.target.value)}
                    required
                    />
                <button type="submit" className="todo-container__button">할 일 추가</button>
            </form>
        </>
    )

}

export default Input;