//Main code area
initializeListeners();
const screen = document.querySelector("#screen");
const typingScreen = screen.querySelector("#top");
const resultScreen = screen.querySelector("#bottom");

resultScreen.textContent = "";
let input = "";
let operations = [];
let negative = false;

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
    if(b == 0){
        throw "Cannot divide by zero";
    }
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
    if(resultScreen.textContent.length > 0){
        reset();
    }
    //Computes the function
    if(e.target.id === "equals"){
        compute();
    } else if(e.target.id === "clear"){
        clear();
    } else if(e.target.className === "operator"){
        addOperator(e.target);
    } else if(e.target.className === "digit"){
        addDigit(e.target);
    }
}
function addDigit(digitElement){
    let digit = parseInt(digitElement.textContent);
    if(negative){
        digit *= -1;
        negative = false;
    }

    updateScreen(typingScreen, Math.abs(digit));
    //If there are no operations, creates a new one with the given digit and no operation
    if(operations.length === 0){
        newNode(digit, "end");
    } else if(operations[operations.length - 1].operation !== "end"){
        //Need more robustness I think
        newNode(digit, "end")
    } else{
        //Adds new digit that was pressed to end of the latest number
        let currentDigit = operations[operations.length -1].number;
        let newNumber = (currentDigit.toString() + digit.toString());

        operations[operations.length -1].number = parseInt(newNumber); 
    }
}
function addOperator(operatorElement){
    let operator = operatorElement.textContent;
    let validInput = false;

    //-1 is allowed as the first operator treat it as a -1 multiplying the next incoming number
    if(operator === "-" ){
        if(operations.length > 0 && operations[operations.length - 1].operation == "end"){
            operations[operations.length - 1].operation = operator;
            validInput = true;
        } else{
            negative = true;
            validInput = true;
        }
    } else if(operations.length > 0){
        //Requires there to be a number to operate on
        operations[operations.length - 1].operation = operator;
        validInput = true;
    }
    if(validInput){
        updateScreen(typingScreen, operator);
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
        if(currentOp === "*" || currentOp === "/"){
            //Calculates using current number and operation as well as the next number
            try{
                result = operate(currentOp, operations[i].number, operations[i + 1].number);
            } catch(error){
                alert("You cannot divide by zero");
                clear();
                return;
            }
            

            operations[i].number = result;
            operations[i].operation = operations[i + 1].operation;

            operations.splice(i + 1, 1);
            i--;

        }
    }
    //Repeated to allow for order of operations
    for(let i  = 0; i < operations.length - 1; i++){
        let currentOp = operations[i].operation;
        if(currentOp === "-" || currentOp === "+"){
            //Calculates using current number and operation as well as the next number
            result = operate(currentOp, operations[i].number, operations[i + 1].number);

            operations[i].number = result;
            operations[i].operation = operations[i + 1].operation;

            operations.splice(i + 1, 1);
            i--;

        }
    }
    let roundedResult = Math.round(operations[0].number*100)/100;
    updateScreen(resultScreen, "= " + roundedResult);
}

function updateScreen(element, newText){
    element.textContent += newText;
}

function clear(){
    input = "";
    typingScreen.textContent = "";
    resultScreen.textContent = "";
    operations = [];
}

function reset(){
    resultScreen.textContent = "";
    typingScreen.textContent = operations[0].number;
}