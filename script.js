// Add an Item

function addItem() {
    let userInput = document.getElementById("userInput").value;
    let target = document.getElementById("todoItems");
    target.innerHTML += "<div class='todo-item'><span>"+ userInput +"</span><i class='fas fa-minus'></i></div>";
}

// function oga() {
//     var itemClass = document.getElementsByClassName('todo-item');
//     for (var i = 0; i < itemClass.length; i++ ) {
//         itemClass[i].id = "bobo";
//     }
// }

// Remove an Item
function removeItem() {
    let remove = document.getElementById("remove")
    remove.style.display = "none"
}
