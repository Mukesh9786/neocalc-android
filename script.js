let input = document.getElementById('input');
let history = document.getElementById('history');
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;
    history.innerText = `${previousInput} ${getOpChar(op)}`;
}

function getOpChar(op) {
    switch(op) {
        case '/': return '÷';
        case '*': return '×';
        default: return op;
    }
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    history.innerText = '';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': 
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = prev / current; 
            break;
        case '%': result = (prev / 100) * current; break;
        default: return;
    }
    
    history.innerText = `${previousInput} ${getOpChar(operator)} ${currentInput} =`;
    currentInput = result.toString();
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}

function updateDisplay() {
    // Limit length to fit screen
    if (currentInput.length > 10) {
        input.style.fontSize = '2.5rem';
    } else {
        input.style.fontSize = '3.5rem';
    }
    input.innerText = currentInput;
}
