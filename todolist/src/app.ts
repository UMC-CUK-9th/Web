
const addButton = document.getElementById("addTodo") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement; 
const doneList = document.getElementById("doneList") as HTMLUListElement;
const inputTodo = document.getElementById("inputTodo") as HTMLInputElement;

//할 일 목록
let todos: string[] = [];
//완료 목록
let dones: string[] = [];

//todoList에 항목 추가하기
const addTodo = (): void => {
    todos.push(inputTodo.value);
    inputTodo.value='';
    createTodoLi();
};

//할 일 추가 버튼을 눌렀을 때
addButton.addEventListener('click', (): void => {
    addTodo();
});

//완료 목록 html 만들기  
const createDoneLi = ():void => {
    doneList.innerHTML = "";
    dones.map((todo: string, id: number): void=>{
        const li = document.createElement('li');
        li.textContent = todo;
        const button = document.createElement('button');
        button.id=id.toString(); // HTMLElement의 id는 string 타입임
        button.textContent='삭제';
        button.classList.add("li__button--delete");

        button.addEventListener("click", () => {
            dones.splice(id,1);
            createDoneLi();
        }) 

        li.appendChild(button);
        doneList.appendChild(li);
    })
}

//할 일 목록 html 만들기 
const createTodoLi = (): void => {
    todoList.innerHTML = "";
    todos.map((todo: string, id: number)=>{
        const li = document.createElement('li') as HTMLLIElement;
        li.textContent = todo;
        const button = document.createElement('button') as HTMLButtonElement;
        button.id=id.toString(); // HTMLElement의 id는 string 타입임
        button.textContent='완료';

        button.addEventListener("click", (): void => {
            if (todos[id]){
                dones.push(todos[id]);
                todos.splice(id,1);
                createTodoLi();
                createDoneLi();
            }
        }) 

        li.appendChild(button);
        todoList.appendChild(li);
    })
} 


