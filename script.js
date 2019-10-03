//Main code area
initializeListeners();
const screen = document.querySelector("#screen");
let input = "";
let operations = [];


function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator, a, b){
    switch (operator){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        default:
            return divide(a, b);
    }
}

function initializeListeners(){
    let operators = Array.from(document.querySelectorAll("button"));
    operators.forEach((button) => {
        button.addEventListener("click", intepretInput);
    });
    
}

function intepretInput(e){
    input += e.target.textContent;
    screen.textContent = input;
    console.log(e.target.className);
    //Computes the function
    if(e.target.id == "equals"){
        compute();
    } else if(e.target.id == "clear"){
        input = "";
        screen.textContent = "";
        operations = [];
    } else if(e.target.className == "operator"){
        addOperator(e.target);
    } else if(e.target.className == "digit"){
        addDigit(e.target);
    }
}
function addDigit(digitElement){
    let digit = parseInt(digitElement.textContent);
    console.log(digit);
    //If there are no operations, creates a new one with the given digit and no operation
    if(operations.length == 0){
        newNode(digit);
    } else if(operations[operations.length - 1].operation !== "end"){
        //Need more robustness I think
        newNode(digit)
    } else{
        //Adds new digit that was pressed to end of the latest number
        let currentDigit = operations[operations.length -1].number;
        let newNumber = (currentDigit.toString() + digit.toString());
        console.log(newNumber)
        operations[operations.length -1].number = newNumber; 
    }
}
function addOperator(operatorElement){
    let operator = operatorElement.textContent;

}

function newNode(digit){
    operations.push({
        number: digit,
        operation: "end"
    })
}
function compute(){

}