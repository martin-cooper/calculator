//Main code area
initializeListeners();
const screen = document.querySelector("#screen");
let input = "";


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
}