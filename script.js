function addItem() {
    var userInput = document.getElementById("dodo").value;
    var target = document.getElementById("todoItems");
    target.innerHTML += "<div class='todo-item'><span>"+ userInput +"</span><input type='checkbox'></div>";
}