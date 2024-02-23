function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "ERROR";
    }
}

function evaluate(expression) {
    let operatorCount = 0;
    let lastOperators = {
        firstPrecedenceOperator: undefined,
        firstPrecedenceIndex: undefined,
        secondPrecedenceOperator: undefined,
        secondPrecedenceIndex: undefined,
    };
    for (let i = 0; i < expression.length - 1; ++i) {
        if (expression[i] === '+' || expression[i] === '-' ||
            expression[i] === '*' || expression[i] === '/') {
                if (!(lastOperators.firstPrecedenceIndex in lastOperators)) {
                    if (expression[i] === '+' || expression[i] === '-') {
                        lastOperators.firstPrecedenceOperator = expression[i];
                        lastOperators.firstPrecedenceIndex = i;
                    }
                }
                if (!(lastOperators.secondPrecedenceIndex in lastOperators)) {
                    if (expression[i] === '*' || expression[i] === '/') {
                        lastOperators.secondPrecedenceOperator = expression[i];
                        lastOperators.secondPrecedenceIndex = i;
                    }
                }
                ++operatorCount;
            }
    }
    if (operatorCount === 0) return expression[0];
    else if (operatorCount === 1) {
        return operate(expression[1], Number(expression[0]), Number(expression[2]));
    } else {
        console.log(lastOperators)
        console.log(lastOperators.firstPrecedenceIndex)
        if (lastOperators.firstPrecedenceIndex) {
            console.log(0)
            return operate(lastOperators.firstPrecedenceOperator, 
                Number(evaluate(expression.slice(0, lastOperators.firstPrecedenceIndex))), 
                Number(evaluate(expression.slice(lastOperators.firstPrecedenceIndex + 1, expression.length))));
        } else if (lastOperators.secondPrecedenceIndex) {
            console.log(1)
            return operate(lastOperators.secondPrecedenceOperator, 
                Number(evaluate(expression.slice(0, lastOperators.secondPrecedenceIndex))), 
                Number(evaluate(expression.slice(lastOperators.secondPrecedenceIndex + 1, expression.length))));
        } else console.log(2)
    }
}

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
let expression = []
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.id === 'clear') {
            if (display.textContent) {
                if (button.textContent === 'AC') {
                    display.textContent = "";
                    expression = [];
                } else if (button.textContent === "CE") {
                    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
                    expression.pop();
                }
            }
        } else if (button.id === 'equals') {
            answer = evaluate(expression);
            console.log(answer);
            display.textContent = answer;
            expression = [];
        } else {
            if (expression.length === 0 ||
                (expression[expression.length - 1] === '+' || expression[expression.length - 1] === '-' ||
                expression[expression.length - 1] === '*' || expression[expression.length - 1] === '/')) {
                expression.push(button.textContent);
            } else if (button.textContent !== '+' && button.textContent !== '-' &&
                button.textContent !== '*' && button.textContent !== '/') {
                    expression[expression.length - 1] = expression[expression.length - 1].concat(button.textContent);
            } else {
                expression.push(button.textContent);
            }
            display.textContent += button.textContent;
        }
    })
})


