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

let completeTodo =[];

const getElement= (id)=> document.getElementById(id);

newCompletetodo = JSON.parse(localStorage.getItem("deletedTodo"))

function addTodo(todo){
    if(!todo)return; 

    if (listOfTodo.includes(todo))return;

    listOfTodo.push(todo);
        
    getElement("list-of-todos").innerHTML += todoItem(todo);
    
    localStorage.setItem("todos", JSON.stringify(listOfTodo));

    onNewTodoAdded();
}

getElement("input-todo").value="";

function loadFormStorage() {
    const todos = localStorage.getItem("todos");
    
  if (!todos) return;

  JSON.parse(todos).map((todo) => {
    addTodo(todo);
  });

}

//add complete to list of completetodos
function addComplete(complete){
  completeTodo.push(complete);
  getElement("completed-todo").innerHTML += completeItem(complete);
}

function onTodoInputChange(event, todo, complete) {    
    if (event.target.checked === true) {
        timeouts[todo] = setTimeout(() => {
          addComplete(complete);
          removeTodo(todo);
        }, 3 * 1000 );
      }
    
      if (event.target.checked === false) {
        clearTimeout(timeouts[todo]);
        timeouts[todo] = 0;
      }
     
         
        }

function onNewTodoAdded() {
   listOfTodo.forEach((todo) => {
    getElement("input" + todo).addEventListener("change", (event)=>
    onTodoInputChange(event,todo));
   });
}


  
function removeTodo(todo){
    listOfTodo = listOfTodo.filter((e)=> todo!=e);
    
    localStorage.setItem("todos", JSON.stringify(listOfTodo));
    localStorage.setItem("deleteTodo", JSON.stringify(completeTodo));

    const todoElement = getElement(todo);
    
    completeItem(todo);


    if(todoElement){
        todoElement.remove();
    }
}

function onClickAddTodoButton(){
    const newTodo = getElement("input-todo").value
    addTodo(newTodo);
}

function onCheckboxStateChange(event){
      
}

function todoItem(todo){
    return `
    <div id="${todo}" class="d-flex justify-content-between todo-item ">
    <span>${todo}</span>
    <input id="${'input'+todo}" class="todo-checkbox" type="checkbox" />
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

// function getComplete(complete){
//   let node = document.createElement("span");
//   let textnode = document.createTextNode(complete);
//   node.appendChild(textnode);

//   getElement("completed-todo").appendChild(node);
//   console.log(complete);
// }

getElement("input-todo").addEventListener("keydown",(event)=>{
    if(event.code === "Enter"){
      onClickAddTodoButton()
    }
  })

  
// localStorage.removeItem("todos");
loadFormStorage();

