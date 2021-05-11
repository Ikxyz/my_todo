console.log("My Todo Application v2.0.1");

/**
 * About My Todo Application:-  An application that helps   * you keep track of your schedules
 *
 * User Story:-
 *
 *  1. When a user visit our todo application he/she will click on the input field and type in a todo and click on the add todo button, which will save the todo.
 *
 * 2. When the user close the application and opens it up again the user will be able to see *list* of previously typed in todos
 *
 */

/**
 * Handles getting html element from DOM
 * @param {string} arg
 * @returns HtmlDocumentElement
 */
const getEle = (arg) => document.getElementById(arg);

// html input text field
const textBox = getEle("input-todo");

// add todo button html element
const addTodoBtn = getEle("addTodoBtn");

// list of todo html elements
const listOfTodos = getEle("list-of-todos");

// Hold all users todos
const todos = [];

function addTodo(title) {
  if (!title) return;

  // new json todo
  const todo = { id: todos.length + 1, title: title };

  // add a new todo to our array of json todos
  todos.push(todo);

  // update html UI elements
  listOfTodos.innerHTML += todo.title;

  // store to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromStorage() {
  const todoData = localStorage.getItem("todos");

  if (!todoData) return;

  JSON.parse(todoData).forEach((val) => {
    addTodo(val.title);
  });
}

addTodoBtn.addEventListener("click", () => {
  const value = textBox.value;
  addTodo(value);
});

loadFromStorage();
