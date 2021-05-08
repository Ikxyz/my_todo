console.log("Welcome to My Todo Application v 1.0.1");

let listOfTodo = [];

let completeTodo =[];

const getElement = (id) => document.getElementById(id);

// Add todo to list of our todos array
function addTodo(todo) {
  if (!todo) return;

  if (listOfTodo.includes(todo)) return;

  listOfTodo.push(todo);

  getElement("list-of-todos").innerHTML += todoItem(todo);

  onNewTodoAdded();
}

//add complete to list of completetodos
function addComplete(complete){
    completeTodo.push(complete);
    getElement("completed-todo").innerHTML += completeItem(complete);
}




function onTodoInputChange(event, todo, complete) {
  if (event.target.checked) {
    setTimeout(() => {
      removeTodo(todo);
    }, 3 * 1000);
  }
  getElement(todo).classList.toggle("completed");
//   getElement("completed-Todo").innerHTML += completeItem(complete);

  addComplete(complete);

}

function onNewTodoAdded() {
  listOfTodo.forEach((todo) => {
    getElement("input" + todo).addEventListener("change", (event) =>
      onTodoInputChange(event, todo)
    );
  });
}

// Remove from our list of todo items
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

function todoItem(todo) {
  return `
    <div id="${todo}" class="d-flex justify-content-between todo-item">
    <span>${todo}</span>
    <input id="${"input" + todo}" class="todo-checkbox" type="checkbox"/>
    </div>
    `;
}


function completeItem(complete) {
    return `
    <div id="${complete}" class="dropdown-item d-flex justify-content-between" >
    <span>${complete}</span>
    <span class="fa fa-minus-circle nav-link" aria-hidden="true"></span>
    </div>
      `;
  }
  

