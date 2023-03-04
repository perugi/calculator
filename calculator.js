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

let displayValue = '0';

digitBtns = document.querySelectorAll('.digit');
digitBtns.forEach(btn => btn.addEventListener('click', (e) => {
    if (displayValue === '0') {
        displayValue = e.target.textContent;
    } else {
        displayValue += e.target.textContent;
    }

    refreshDisplay();
}));

clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    displayValue = '0';

    refreshDisplay();
})
bckspBtn = document.querySelector('#backspace');
bckspBtn.addEventListener('click', () => {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }

    refreshDisplay();
})

function refreshDisplay() {
    display = document.querySelector('#display');
    display.textContent = displayValue;
}
