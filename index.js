console.log("Welcome to my todo app v1.0.1");

// list of all textDecoration
let listOfTodo = [];

// List of timeout to help keep track of our todos item state
let timeouts = {};

/**
 * Get Element By Id
 * @param {string} id
 * @returns HtmlDocumentObject
 */
const getElement = (id) => document.getElementById(id);

/**
 * Add todo to list of our todos array
 * @param {string} todo "call mum"
 * @returns
 */
function addTodo(todo) {
  // validate todo is not empty
  if (!todo) return;

  // check if todo already exists
  if (listOfTodo.includes(todo)) return;

  // add to array of textDecoration
  listOfTodo.push(todo);

  // add todo to list of todo elements in html page
  getElement("list-of-todos").innerHTML += todoItem(todo);

  // store todo in local storage
  localStorage.setItem("todos", JSON.stringify(listOfTodo));

  // call change event listener on all todos
  onNewTodoAdded();

  getElement("input-todo").value = "";
}

function loadFormStorage() {
  const todos = localStorage.getItem("todos");

  if (!todos) return;

  JSON.parse(todos).map((todo) => {
    addTodo(todo);
  });
}

/**
 * Handles Changes To Todo Item Checkbox Change
 * @param {HTMLChangeEvent} event
 * @param {string} todo
 */
function onTodoInputChange(event, todo) {
  if (event.target.checked === true) {
    timeouts[todo] = setTimeout(() => {
      removeTodo(todo);
    }, 3 * 1000);
  }

  if (event.target.checked === false) {
    clearTimeout(timeouts[todo]);
    timeouts[todo] = 0;
  }

  getElement(todo).classList.toggle("completed");
}

/**
 * Add New Change Event Listeners On Each Todo Items
 */
function onNewTodoAdded() {
  listOfTodo.forEach((todo) => {
    getElement("input" + todo).addEventListener("change", (event) => {
      onTodoInputChange(event, todo);
    });
  });
}

/**
 * Remove from out list of todo items
 * @param {string} todo
 */
function removeTodo(todo) {
  console.log(listOfTodo)
  listOfTodo = listOfTodo.filter((e) => todo != e);
  console.log(listOfTodo)
  const todoElement = getElement(todo);

  if (todoElement) {
    todoElement.remove();
  }
  localStorage.setItem("todos", JSON.stringify(listOfTodo));
  const todos = localStorage.getItem("todos");
}

/**
 * On Add Todo Button Click
 */
function onClickAddTodoButton() {
  const newTodo = getElement("input-todo").value;
  addTodo(newTodo);
}

/**
 * Takes a todo string and returns a Html todo element
 * @param {string} todo
 * @returns HTMLElement
 */

function todoItem(todo) {
  return `
  <div id="${todo}" class="todo-item">
  <span>${todo}</span>
  <input id="${"input" + todo}" class="todo-checkbox" type="checkbox"/>
  </div>
  `;
}

/**
 * Listen for enter key press on input todo text
 */
getElement("input-todo").addEventListener("keydown", (ev) => {
  if (ev.code === "Enter") {
    onClickAddTodoButton();
  }
});

// Load Data from storage
loadFormStorage();
