function addItem() {
    let userInput = document.getElementById("userInput").value;
    let target = document.getElementById("todoItems");
    target.innerHTML += "<div class='todo-item'><span>"+ userInput +"</span><i class='fas fa-minus'></i></div>";
}
