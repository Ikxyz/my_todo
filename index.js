console.log("Welcome to my todo app v1.0.1");

//#region history style
/**
 * When a user click on the history button
 * the history container should open
 * and the home container should close
 */
const historyContainer = document.querySelector(".history");
const homeContainer = document.querySelector(".home");
const historyOpenBtn = document.querySelector(".card__footer span");
const historyClosebtn = document.querySelector(
  ".history .history__title i.fa-times"
);

historyOpenBtn.addEventListener("click", () => {
  homeContainer.classList.toggle("no-display");
  historyContainer.classList.toggle("no-display");
});
historyClosebtn.addEventListener("click", () => {
  homeContainer.classList.toggle("no-display");
  historyContainer.classList.toggle("no-display");
});
//#endregion

//#region add/remove todo and storage function
// list of all todo
let listOfTodo = [];

// todo history list
let todoHistoryList = [];

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

function addTodoToHistory(deletedTodo) {
  if (!deletedTodo) return;

  // empty history of deleted todo is not empty
  if (todoHistoryList.includes(deletedTodo)) return;

  // add deleted todo to history list array
  todoHistoryList.push(deletedTodo);

  // add deleted to the todo list in history
  getElement("history-of-todo").innerHTML += addHistoryTodo(deletedTodo);

  localStorage.setItem("todos-history", JSON.stringify(todoHistoryList));
}

function clearDeletedTodoHistory() {
  todoHistoryList.forEach((todo) => {
    if (getElement(todo)) {
      getElement(todo).remove();
    }
  }); //getElement(history).remove())

  localStorage.removeItem("todos-history");
  loadFromHistoryStorage();
}

function loadFromHistoryStorage() {
  const deleteTodos = localStorage.getItem("todos-history");

  if (!deleteTodos) return;

  JSON.parse(deleteTodos).map((deleteTodo) => {
    addTodoToHistory(deleteTodo);
  });
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
  addTodoToHistory(todo);
  listOfTodo = listOfTodo.filter((e) => todo != e);
  const todoElement = getElement(todo);

  if (todoElement) {
    todoElement.remove();
  }
  localStorage.setItem("todos", JSON.stringify(listOfTodo));
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
 * Takes a todo string and returns a Html todo element
 * @param {string} todo
 * @returns HTMLElement
 */
function addHistoryTodo(deletedTodo) {
  return `
  <div id="${deletedTodo}" class="todo-item">
  <span>${deletedTodo}</span>
  <span id="${
    "input" + deletedTodo
  }" class="delete-todo" ><i class="fas fa-trash-alt""></i></span>
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
loadFromHistoryStorage();
//#endregion
