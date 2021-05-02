let x = 1;
let y = ++x


// Add an Item

function addItem() {
    let userInput = document.getElementById("userInput").value;
    let target = document.getElementById("todoItems");
    target.innerHTML += "<div class='todo-item'><span>"+ userInput +"</span><i class='fas fa-minus' id='remove' onclick='removeItem()'></i></div>";
}

// function oga() {
//     var itemClass = document.getElementsByClassName("fas fa-minus");
//     for (var i = 0; i < itemClass.length; i++ ) {
//         itemClass[i].id = "remove";
//     }
// }

// Remove an Item
function removeItem() {
    document.getElementById("remove").parentNode.remove()

    // let remove = document.getElementById("remove")
    // remove.remove()
}
