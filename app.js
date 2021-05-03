function hello() {
    return "Hello World!"
}


function userInput(name){ 
    if(name){ 
        return "Hello, " + name + "!"; 
    }else{ 
        return "Hello there!"; 
    } 
}


console.log(hello())
console.log(userInput("Poppy"))