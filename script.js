// window.alert("Enter your name")

function writeName() {
    let userName = prompt('Please enter your name','Poppy');
        if (userName != null && userName != "") {
            document.getElementById("welcome").innerHTML = "Hello "+ userName
        }
}

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