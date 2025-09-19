
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;


type Task = {
  id: number;
  text: string;
};

let todos: Task[] = [];
let doneTasks: Task[] = [];


const getTodoText = (): string => {
  return todoInput.value.trim();
};


const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  console.log(todos);
  todoInput.value = '';
  renderTasks();
};


const completeTask = (task: Task): void => {
  todos = todos.filter((t) => t.id !== task.id);
  doneTasks.push(task);
  renderTasks();
};


const deleteTask = (task: Task): void => {
  doneTasks = doneTasks.filter((t) => t.id !== task.id);
  renderTasks();
};

const createTaskElement = (task: Task, isDone: boolean): HTMLLIElement => {
  const li = document.createElement('li');
  li.classList.add('render-container__item');
  li.textContent = task.text;

  const button = document.createElement('button');
  button.classList.add('render-container__item-button');


  if (isDone) {
    button.textContent = '삭제';
    button.style.backgroundColor = '#dc3545'; 
  } else {
    button.textContent = '완료';
    button.style.backgroundColor = '#28a745'; 
  }

  button.addEventListener('click', () => {
    if (isDone) {
      deleteTask(task);
    } else {
      completeTask(task);
    }
  });

  li.appendChild(button);
  return li;
};

// 할 일 렌더링
const renderTasks = (): void => {
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  todos.forEach((task) => {
    const li = createTaskElement(task, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((task) => {
    const li = createTaskElement(task, true);
    doneList.appendChild(li);
  });
};

// 폼 제출
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});


renderTasks(); //초기 렌더링

