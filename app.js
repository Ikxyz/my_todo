//To do app 
// write a function that returns hello world 
// write a function that takes in an input and returns hello + that input
// function start(){
//     console.log("Hello World!")
// }

// start();
// function Callout(name){
//     console.log('hello' + ' ' + name);
// }
// Callout('Kemele Godstime');

console.log("Todo v 1.0.0")

let listOfTodo = [];

let timeouts = {};

const getElement= (id)=> document.getElementById(id);

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

function onTodoInputChange(event, todo) {    
    if (event.target.checked === true) {
        timeouts[todo] = setTimeout(() => {
          removeTodo(todo);
        }, 3 * 1000 );
      }
    
      if (event.target.checked === false) {
        clearTimeout(timeouts[todo]);
        timeouts[todo] = 0;
      }
         getElement(todo).classList.toggle("completed");
         
         
        }

function onNewTodoAdded() {
   listOfTodo.forEach((todo) => {
    getElement("input" + todo).addEventListener("change", (event)=>
    onTodoInputChange(event,todo));
   });
}

function removeTodo(todo){
    listOfTodo = listOfTodo.filter((e)=> todo!=e);
    const todoElement = getElement(todo);

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

getElement("input-todo").addEventListener("keydown",(event)=>{
    if(event.code === "Enter"){
      onClickAddTodoButton()
    }
  })

  
localStorage.removeItem("todos");
loadFormStorage();
