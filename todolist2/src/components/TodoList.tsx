interface todoListProps{
    list: string[],
    title: '할 일'|'완료',
    handleAddDone: (id:number) => void;
    handleDeleteDone: (id:number) => void;
}

const TodoList=({list,title,handleAddDone,handleDeleteDone}:todoListProps) => {

    return (
        <>
            <div className="render-container__section">
                <h2 className="render-container__title">{title}</h2>
                <ul id="todo-list" className="render-container__list">
                {list.map((todo:string, id:number)=>(
                <>
                    <li className="render-container__item">
                    <span className="render-container__item-text">{todo}</span>
                    {title=='할 일' && (
                        <button style={{backgroundColor:'#28a745'}} className="render-container__item-button" onClick={()=>handleAddDone(id)} key={id} >완료</button>
                    )}
                    {title=='완료' && (
                        <button style={{backgroundColor:'#dc3545'}}className="render-container__item-button" onClick={()=>handleDeleteDone(id)} key={id} >삭제</button>
                    )}
                    </li>
                </>
                ))}
                </ul>
            </div>
        </>
    )

}

export default TodoList;