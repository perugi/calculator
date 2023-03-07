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

function operate(a, b, operator) {
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
            return undefined;
    }
}

// first, second, calculated;
let calcState = 'first';

let displayValue = '';
let operator = '';
let firstOperand = 0;
let resultValue = 0;

function refreshDisplay() {
    let calcValue = '';
    if (calcState === 'second') {
        calcValue += `${firstOperand} ${operator}`;
    } else if (calcState === 'calculated')
        calcValue += resultValue;

    calcDisplay = document.querySelector('#calc-display');
    calcDisplay.textContent = calcValue;

    inputDisplay = document.querySelector('#input-display');
    inputDisplay.textContent = displayValue;
}

digitBtns = document.querySelectorAll('.digit');
digitBtns.forEach(btn => btn.addEventListener('click', (e) => {
    if (calcState === 'calculated') {
        calcState = 'first'
        displayValue = e.target.textContent;
    } else {
        displayValue += e.target.textContent;
    }

    refreshDisplay();
}));

clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    firstOperand = 0;
    displayValue = '';
    operator = '';
    calcState = 'first';

    refreshDisplay();
})

bckspBtn = document.querySelector('#backspace');
bckspBtn.addEventListener('click', () => {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '';
    }

    refreshDisplay();
})

operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach(btn => btn.addEventListener('click', (e) => {
    if (calcState === 'first') {
        firstOperand = +displayValue;
    } else if (calcState === 'second') {
        firstOperand = operate(firstOperand, +displayValue, operator);
    } else if (calcState === 'calculated') {
        firstOperand = resultValue;
    }
    displayValue = '';
    operator = e.target.textContent;
    calcState = 'second';

    refreshDisplay();
}));


equalBtn = document.querySelector('#equal');
equalBtn.addEventListener('click', () => {
    if (calcState === 'second') {
        resultValue = operate(firstOperand, +displayValue, operator);
    } else if (calcState === 'first') {
        resultValue = +displayValue;
    }
    displayValue = '';
    calcState = 'calculated';

    refreshDisplay();
});