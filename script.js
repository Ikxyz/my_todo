// New script
var form = document.getElementById("addForm");
var itemList = document.getElementById("items");

// Form submit event
form.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();

  // Get input value
  var newItem = document.getElementById("inputItem").value;

  // Create new li with class
  var li = document.createElement("li");
  li.className = "todo-item";

  // Add text node with input value
  var createText = document.createTextNode(newItem);
  li.appendChild(createText);

  // Create the delete buttonwithlass and append to li
  var delButton = document.createElement("button");
  delButton.className = "btn btn-danger btn-sm delete";
  delButton.appendChild(document.createTextNode("X"));
  li.appendChild(delButton);

  itemList.appendChild(li);
}

// Delete button event
itemList.addEventListener("click", removeItem);

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

// v1.0.2
/* const submitForm = document.querySelector('.add');
const addButon = document.querySelector('.add-todo')
const todoList = document.querySelector('.todo-item-box');
const list = document.querySelector('.todo-item span');

let listLength = list.length;

const generateTemplate = (todo) => {

  const html = ` <div id="todo_${listLength}" class="todo-item">
                    <span>${todo}</span>
                    <input id="${"input" + todo}" class="todo-checkbox" type="checkbox"/>
                  </div>`

  todoList.innerHTML += html;
}

function addTodos(e) {
  e.preventDefault();
  const todo = submitForm.add.value.trim();
  if (todo.length) {
    listLength = listLength + 1;
    generateTemplate(todo);
    submitForm.reset();
  }
}

submitForm.addEventListener('keydown', addTodos);
submitForm.addEventListener('submit', addTodos);
submitForm.addEventListener('click', addTodos);

function deleteTodos(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
} */
