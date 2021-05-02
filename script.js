function addItem() {
    var userInput = document.getElementById("userInput").value;
    var target = document.getElementById("todoItems");
    target.innerHTML += "<div class='todo-item'><span>"+ userInput +"</span><input type='checkbox'></div>";
}