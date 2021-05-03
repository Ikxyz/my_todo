//this code returns hello world
const outputHello = () =>{

    return `Hello World`
}

console.log(outputHello());



//this will return hello plus the inputed name or it will use the default name "stanley" if no name was given
const outputName = ( name = "Stanley") =>{

    return `Hello ${name}`
}

console.log(outputName("James"))