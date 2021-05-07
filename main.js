console.log("Welcome to My Todo Application v 1.0.1");

// list of todos
let listOfTodo = []; 

// list of history
let historyOfTodo = []

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
  getElement("list-of-todos").innerHTML += todoItem(todo);

  // store todo in local storage
  localStorage.setItem("todos", JSON.stringify(listOfTodo));

  // call change event listener on all todos
  onNewTodoAdded();

  getElement("input-todo").value = "";
}

/**
 * 
 * @param {string} todo 
 * @returns 
 */
function addToHistory(todo) {
  // validate todo is not empty
  if (!todo) return;

  // check if history already exists
  if (historyOfTodo.includes(todo)) return;

  // add to history
  historyOfTodo.push(todo);

  // add todo to list of todo elements in html page
  getElement("history-tab").innerHTML += historyItem(todo);

  // store todo in local storage
  localStorage.setItem("history", JSON.stringify(historyOfTodo));

 //add events to our todos
  addHistoryEvent()
}

/**
 * Add initial Todo if there is no input
 */
 /**function addInitial() {
  const todos = localStorage.getItem("todos");

  if (!todos) return;

  JSON.parse(todos).map((todo) => {
    addTodo(todo);
  });
} */

/***
 * Clear all all history
 */
function clearAllHistory(){

  historyOfTodo.forEach(history =>
    { if(getElement(history)){getElement(history).remove() ; console.log(getElement(history))}})//getElement(history).remove())

  localStorage.removeItem("history")
  loadHistoryFormStorage();

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
 * Load History from local storage
 */
 function loadHistoryFormStorage() {
  const histories = localStorage.getItem("history");

  if (!histories) return;

  JSON.parse(histories).map((history) => {
    addToHistory(history);
  });
  //add events to history elements
  addHistoryEvent()
}

/**
 * Remove from localstorage
 */
 function RemoveFormStorage() {
  
  localStorage.setItem("todos", JSON.stringify(listOfTodo));
   const todos = localStorage.getItem("todos");
   
 // if (!todos) return;

//  JSON.parse(todos).filter((todo) => { todo !== item
//  });
//  console.log(todos)
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
  addToHistory(todo)
  listOfTodo = listOfTodo.filter((e) => todo != e);
  const todoElement = getElement(todo);
  if (todoElement) {
    todoElement.remove();
  }
  
  //remove todo from local storage
  RemoveFormStorage()
}

/**
 * On Add Todo Button Click
 */
function onClickAddTodoButton() {
  const newTodo = getElement("input-todo").value;
  addTodo(newTodo);
}

/**
 * restore back the todo
 * @param {event} event 
 * @param {string} element 
 */
function restoreItem(event , element) {
 
 //return item to todo
  addTodo(element);

  //remove item from history
   historyOfTodo = historyOfTodo.filter((e) => element != e);
   localStorage.setItem("history" , JSON.stringify(historyOfTodo))

   //reload the todo app with data from local storage
   loadHistoryFormStorage()
   loadFormStorage()


   //remove element from history
   const todoElement = event.target.parentElement;
    if (todoElement) {
      todoElement.remove();
     }
 
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
 function historyItem(item) {
 
  return `
    <div id="${item}" class="todo-item">
    <span>${item}</span>
    <button  id="${"input" + item}" class="restore" >Restore</button>
  
    </div>
    `;
}

/**
 * this sets the events for history items
 */
function addHistoryEvent(){
 
  //delay the adding of event allowing for the datas to load first
  setTimeout(() => {
   historyOfTodo.forEach( element => getElement("input" + element)? getElement("input" + element).addEventListener("click" , (e) => restoreItem(e, element) ): setTimeout(() => {
    addHistoryEvent()
   }, 3000))
  }, 1000);

}



/**
 * Listen for enter key press on input todo text 
 */
getElement("input-todo").addEventListener("keydown",(event)=>{
  if(event.code === "Enter"){
    onClickAddTodoButton()
  }
})

/**
 * This will swap the tabs to the history tabs
 */

function handleHistory(){

  getElement("history").classList.value = "active"
  getElement("home").classList.value = ""
  getElement("list-of-todos").style.display = "none"
  getElement("history-tab").style.display = "block"

}
/**
 * This will swap the tabs to todo list tab
 */
function handleTab(){
  
  getElement("history").classList.value = ""
  getElement("home").classList.value = "active"
  getElement("list-of-todos").style.display = "block"
  getElement("history-tab").style.display = "none"
 
 
}



// Load Data From Storage
loadFormStorage();

// Load Data From Storage
loadHistoryFormStorage();


// Load initial tab i.e home tab
handleTab()


