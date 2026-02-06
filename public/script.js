let expression = "";
let ans = "0";

function input(val) {
    if (val === 'exp') val = '*10^';
    if (val === 'ans') val = ans;
    expression += val;
    renderDisplay();
}

function renderDisplay() {
    document.getElementById('main-display').innerText = expression || "0";
}

function ac() {
    expression = "";
    document.getElementById('upper-display').innerText = "";
    renderDisplay();
}

function del() {
    expression = expression.slice(0, -1);
    renderDisplay();
}

function calculate() {
    try {
        let cleanExp = expression.replace(/×/g, '*').replace(/÷/g, '/');
        let result = math.evaluate(cleanExp);
        
        document.getElementById('upper-display').innerText = expression + " =";
        
        // Định dạng kết quả
        let formatted = math.format(result, { precision: 10 });
        document.getElementById('main-display').innerText = formatted;
        
        ans = formatted; // Lưu vào biến Ans
        expression = formatted.toString();
    } catch (err) {
        document.getElementById('main-display').innerText = "Math ERROR";
        expression = "";
    }
}
