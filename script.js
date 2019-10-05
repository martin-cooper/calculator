//Main code area
initializeListeners();
const screen = document.querySelector("#screen");
let input = "";
let operations = [];


function add(a, b){
    return (Number)(a + b);
}

function subtract(a, b){
    return (Number)(a - b);
}

function multiply(a, b){
    return (Number)(a*b);
}

function divide(a,b){
    return (Number)(a/b);
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
        newNode(digit, "end");
    } else if(operations[operations.length - 1].operation !== "end"){
        //Need more robustness I think
        newNode(digit, "end")
    } else{
        //Adds new digit that was pressed to end of the latest number
        let currentDigit = operations[operations.length -1].number;
        let newNumber = (currentDigit.toString() + digit.toString());
        console.log(newNumber)
        operations[operations.length -1].number = parseInt(newNumber); 
    }
}
function addOperator(operatorElement){
    let operator = operatorElement.textContent;
    //-1 is allowed as the first operator treat it as a -1 multiplying the next incoming number
    if(operator === "-" && operations.length == 0){
        newNode(-1, "*");
    } else if(operations.length > 0){
        //Requires there to be a number to operate on
        operations[operations.length - 1].operation = operator;
    }
}

function newNode(digit, op){
    operations.push({
        number: digit,
        operation: op
    })
}
function compute(){
    for(let i  = 0; i < operations.length - 1; i++){
        let currentOp = operations[i].operation;
        if(currentOp === "*" || currentOp == "/"){
            //Calculates using current number and operation as well as the next number
            result = operate(currentOp, operations[i].number, operations[i + 1].number);

            operations[i].number = result;
            operations[i].operation = operations[i + 1].operation;

            operations.splice(i + 1, 1);
            i--;

        }
    }
    //Repeated to allow for order of operations
    for(let i  = 0; i < operations.length - 1; i++){
        let currentOp = operations[i].operation;
        if(currentOp === "-" || currentOp == "+"){
            //Calculates using current number and operation as well as the next number
            result = operate(currentOp, operations[i].number, operations[i + 1].number);

            operations[i].number = result;
            operations[i].operation = operations[i + 1].operation;

            operations.splice(i + 1, 1);
            i--;

        }
    }
    document.querySelector("#screen").textContent += Math.round(operations[0].number*100)/100;
}