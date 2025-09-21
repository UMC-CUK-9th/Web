"use strict";
const addButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
const inputTodo = document.getElementById("inputTodo");
let todos = [];
let dones = [];
const addTodo = () => {
    todos.push(inputTodo.value);
    inputTodo.value = '';
    createTodoLi();
};
addButton.addEventListener('click', () => {
    addTodo();
});
const createDoneLi = () => {
    doneList.innerHTML = "";
    dones.map((todo, id) => {
        const li = document.createElement('li');
        li.textContent = todo;
        const button = document.createElement('button');
        button.id = id.toString();
        button.textContent = '삭제';
        button.classList.add("li__button--delete");
        button.addEventListener("click", () => {
            dones.splice(id, 1);
            createDoneLi();
        });
        li.appendChild(button);
        doneList.appendChild(li);
    });
};
const createTodoLi = () => {
    todoList.innerHTML = "";
    todos.map((todo, id) => {
        const li = document.createElement('li');
        li.textContent = todo;
        const button = document.createElement('button');
        button.id = id.toString();
        button.textContent = '완료';
        button.addEventListener("click", () => {
            if (todos[id]) {
                dones.push(todos[id]);
                todos.splice(id, 1);
                createTodoLi();
                createDoneLi();
            }
        });
        li.appendChild(button);
        todoList.appendChild(li);
    });
};
