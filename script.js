console.log("Welcome to My Todo Application v 1.0.1");

// window.alert("Enter your name")

function writeName() {
    let userName = prompt('Please enter your name','Poppy');
        if (userName != null && userName != "") {
            document.getElementById("welcome").innerHTML = "Hello "+ userName
        }
}

// list of todos
let listOfTodo = []; 

/// List of timeout to help keep track of our todos item state
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

  // add to array of todo
  listOfTodo.push(todo);

  // add todo to list of todo elements in html page
  getElement("todo-item-box").innerHTML += todoItem(todo);

  // store todo in local storage
  localStorage.setItem("todos", JSON.stringify(listOfTodo));

  // call change event listener on all todos
  onNewTodoAdded();

  getElement("input-todo").value = "";
}

/**
 * Load list of todos from local storage
 */
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
    }, 3 * 1000 /** 3000 ~ 3 seconds */ );
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
    getElement("input" + todo).addEventListener("change", (event) =>
      onTodoInputChange(event, todo)
    );
  });
}

/**
 * Remove from out list of todo items
 * @param {string} todo 
 */
function removeTodo(todo) {
  listOfTodo = listOfTodo.filter((e) => todo != e);
  const todoElement = getElement(todo);
  if (todoElement) {
    todoElement.remove();
  }
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
getElement("input-todo").addEventListener("keydown",(event)=>{
  if(event.code === "Enter"){
    onClickAddTodoButton()
  }
})

// Load Data From Storage
loadFormStorage();