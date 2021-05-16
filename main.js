console.log("Welcome to Todo App v2.0.0");

/**
 * @param {string} arg
 * @return HTMLElement
 */
const getEle = (arg) => document.getElementById(arg);

//#region get DOM values
const newTodoValue = getEle("input-todo");
// console.log(newTodoValue)
const addTodoBtn = getEle("add");

const listOfTodo = getEle("list-of-todos");
//#endregion

const todos = [];

function addTodo(title) {
  if (!title) return;

  //   new json todo
  const todo = { id: todos.length + 1, title: title };

  // add todo to our array of json todo
  todos.push(todo);

  //   update the html UI elements
  listOfTodo.innerHTML += `
  <div id="${todo}" class="d-flex justify-content-between todo-item ">
  <span>${todo.title}</span>
  <input id="${"input" + todo}" class="todo-checkbox" type="checkbox" />
  </div>
  `;

  //   store to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromStorage() {
  const todosData = localStorage.getItem("todos");

  if (!todosData) return;

  JSON.parse(todosData).forEach((todo) => {
    addTodo(todo.title);
  });
}

addTodoBtn.addEventListener("click", () => {
  const todoValue = newTodoValue.value;
  addTodo(todoValue);
});

loadFromStorage();
