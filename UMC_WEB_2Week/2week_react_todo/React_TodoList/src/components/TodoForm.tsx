import React, { useState, type FormEvent } from "react";


type Props = {
onAdd: (text: string) => void;
};


const TodoForm: React.FC<Props> = ({ onAdd }) => {
const [input, setInput] = useState<string>("");


const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
e.preventDefault();
const text = input.trim();
if (!text) return;
onAdd(text);
setInput("");
};


return (
<form className="todo-container__form" onSubmit={handleSubmit}>
<input
type="text"
className="todo-container__input"
placeholder="할 일을 입력!"
required
value={input}
onChange={(e) => setInput(e.target.value)}
/>
<button type="submit" className="todo-container__button">
할 일 추가
</button>
</form>
);
};


export default TodoForm;