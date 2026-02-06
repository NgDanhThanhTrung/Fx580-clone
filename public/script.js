let expression = "";

function input(val) {
    if (val === 'fraction') {
        expression += "/"; // Tạm thời dùng gạch chéo cho đơn giản
    } else {
        expression += val;
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('main-display').innerText = expression || "0";
}

function clearAll() {
    expression = "";
    document.getElementById('upper-display').innerText = "";
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        let result = math.evaluate(expression);
        document.getElementById('upper-display').innerText = expression + " =";
        
        // Làm tròn 10 chữ số thập phân cho giống Casio
        result = math.format(result, { precision: 10 });
        
        document.getElementById('main-display').innerText = result;
        expression = result.toString();
    } catch (error) {
        document.getElementById('main-display').innerText = "Syntax ERROR";
        expression = "";
    }
}
