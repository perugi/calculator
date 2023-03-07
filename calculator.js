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
    if (b === 0) return 'div_by_0';
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
        if (resultValue === 'div_by_0') {
            calcValue += "I'm afraid I can't do that."
        } else {
            // Round the displayed results to 5 decimals.
            calcValue += Math.round(resultValue * 100000) / 100000;
        }

    calcDisplay = document.querySelector('#calc-display');
    calcDisplay.textContent = calcValue;

    inputDisplay = document.querySelector('#input-display');
    inputDisplay.textContent = displayValue;
}

digitBtns = document.querySelectorAll('.digit');
digitBtns.forEach(btn => btn.addEventListener('click', (e) => {
    if (calcState === 'calculated') {
        // Pressing a digit after a successful calculation should start a new one.
        calcState = 'first'
        displayValue = e.target.textContent;
    } else {
        displayValue += e.target.textContent;
    }

    refreshDisplay();
}));

dotBtn = document.querySelector('#decimal-dot');
dotBtn.addEventListener('click', () => {
    // Check if there is already a decimal point.
    if (displayValue !== '' && displayValue.indexOf('.') === -1) {
        displayValue += '.'
    }

    refreshDisplay();
});

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