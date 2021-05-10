// write a function that returns hello world 
// write a function that takes in an input and returns hello + that input
// function start(){
//     console.log("Hello World!")
// }

// start();
// function greet(name){
//     console.log('hello' + ' ' + name);
// }
// greet('Victory');
console.log("Todo v 1.0.0")

let listOfTodo = [];

let timeouts = {};

const getElement = (id) => document.getElementById(id);

// add item only if it doesnt exist
function addItem(item) {
  // listOfTodo = []
  var index = listOfTodo.findIndex(x => x.value == item.value)
  if (index === -1) {
    listOfTodo.push(item);
    // add an object contining data and another value to show if deleted
    localStorage.setItem("todos", JSON.stringify(listOfTodo));
    !item.deleted ? getElement("list-of-todos").innerHTML += todoItem(item.value) : getElement("list-of-history").innerHTML += todoItem(item.value);
  } else {
    console.log("object already exists")
  }
  console.log(listOfTodo);
}

async function addTodo(todo, deleted) {
  if (!todo) return;
  // object of data
  const itemObject = {
    deleted: deleted,
    value: todo
  }
  await listOfTodo.push(itemObject);
  localStorage.setItem("todos", JSON.stringify(listOfTodo));
}

// make todo unique
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}


// this fuction edits the todo and makes deleted true
const deleteTodo = async (todo, deleted) => {
  // get item and edit to add deleted flag
  var arr = []
  const todos = localStorage.getItem("todos");
  await JSON.parse(todos).map(async (todoValue, index) => {
    // making sure we are sending just value
    if (todoValue.value === todo) {
      todoValue.deleted = true;
    }
    const userExists = listOfTodo.some(user => user.value === todoValue.value && user.deleted === todoValue.deleted);
    if (userExists) {
      return new Error({ error: 'User exists' })
    }
    await listOfTodo.push(todoValue)
    arr = getUniqueListBy(listOfTodo, 'value')
    await localStorage.setItem("todos", JSON.stringify(arr));
  });

  // empty array to add new fresh data with changed value
  listOfTodo = []
  await arr.forEach((todo) => {
    addTodo(todo.value, todo.deleted)
  });
  await listOfTodo.forEach((todo) => {
    const todoElement = getElement(todo.value);
    if (todoElement) {
      todoElement.remove();
    }
  });
  await listOfTodo.forEach((todo) => {
    !todo.deleted ? getElement("list-of-todos").innerHTML += todoItem(todo.value) : getElement("list-of-history").innerHTML += todoItem(todo.value);
  })
  onNewTodoAdded();
}

async function clearHistory() {
  console.log(listOfTodo);
  // loop theough array, look for the class and delete all of em
  listOfTodo.forEach((todo) => {
    const todoElement = getElement(todo.value);
    if (todoElement && todo.deleted === true) {
      todoElement.remove();
    }
  });
  listOfTodo = []
  // clear storage
  const todos = localStorage.getItem("todos");
  let deletedArr = [];
  await JSON.parse(todos).map(async (todoValue, index) => {
    // deleteing if deleted is equal true to clear history
    (todoValue.deleted === false) && deletedArr.push(todoValue)
  });
  await localStorage.setItem("todos", JSON.stringify(deletedArr));
  deletedArr = [];
}

async function loadFormStorage() {
  const todos = localStorage.getItem("todos");

  if (!todos) return;

  await JSON.parse(todos).map((todo) => {
    // making sure we are sending just value
    addTodo(todo.value, todo.deleted);
  });
  await listOfTodo.forEach((todo) => {
    !todo.deleted ? getElement("list-of-todos").innerHTML += todoItem(todo.value) : getElement("list-of-history").innerHTML += todoItem(todo.value);
  })
  onNewTodoAdded();
}

function onTodoInputChange(event, todo) {
  if (event.target.checked === true) {
    timeouts[todo.value] = setTimeout(() => {
      removeTodo(todo);
    }, 3 * 1000);
  }

  if (event.target.checked === false) {
    clearTimeout(timeouts[todo.value]);
    timeouts[todo.value] = 0;
  }
  getElement(todo.value).classList.toggle("completed");


}

function onNewTodoAdded() {
  listOfTodo.forEach((todo) => {
    getElement("input" + todo.value).addEventListener("change", (event) =>
      onTodoInputChange(event, todo));
  });
}

function removeTodo(todo) {
  deleteTodo(todo.value, true);
  listOfTodo = listOfTodo.filter((e) => todo.value != e);
  const todoElement = getElement(todo.value);

  if (todoElement) {
    todoElement.remove();
  }
}

async function onClickAddTodoButton() {
  const newTodo = getElement("input-todo").value
  getElement("input-todo").value = "";
  addTodo(newTodo, false);
  await listOfTodo.forEach((todo) => {
    const todoElement = getElement(todo.value);
    if (todoElement) {
      todoElement.remove();
    }
  });
  await listOfTodo.forEach((todo) => {
    !todo.deleted ? getElement("list-of-todos").innerHTML += todoItem(todo.value) : getElement("list-of-history").innerHTML += todoItem(todo.value);
  })
  onNewTodoAdded();
}

function onCheckboxStateChange(event) {

}

function todoItem(todo) {
  return `
    <div id="${todo}" class="d-flex justify-content-between todo-item ">
    <span>${todo}</span>
    <input id="${'input' + todo}" class="todo-checkbox" type="checkbox" />
    </div>
    `;
}

getElement("input-todo").addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    onClickAddTodoButton()
  }
})


// localStorage.removeItem("todos");

loadFormStorage();

// thursday's code
