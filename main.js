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

        } else {
            expression.push(button.textContent);
            display.textContent += button.textContent;
        }
    })
})


