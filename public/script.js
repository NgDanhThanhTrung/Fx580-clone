let exp = "";
let mode = "COMP"; // COMP hoặc EQN
let eqnStep = 0;
let params = [];

const mainDisp = document.getElementById('main-display');
const upperDisp = document.getElementById('upper-display');

function input(v) {
    if (mode === "MENU") {
        if (v === '9') startEqn();
        return;
    }
    if (mode === "EQN") {
        handleEqn(v);
        return;
    }
    exp += v;
    mainDisp.innerText = exp;
}

function handleBtn(type) {
    if (type === 'menu') {
        mode = "MENU";
        upperDisp.innerText = "1:Calculate  9:Equation";
        mainDisp.innerText = "Select Mode";
    }
    if (type === 'on') {
        mode = "COMP";
        exp = "";
        eqnStep = 0;
        upperDisp.innerText = "";
        mainDisp.innerText = "0";
    }
}

function startEqn() {
    mode = "EQN";
    eqnStep = 1;
    params = [];
    upperDisp.innerText = "ax^2 + bx + c = 0";
    mainDisp.innerText = "a?";
    exp = "";
}

function handleEqn(v) {
    if (!isNaN(v) || v === '.' || v === '-') {
        exp += v;
        mainDisp.innerText = exp;
    } else if (v === 'calculate' || v === 'ans' || v === 'sd') { // Ở đây ta coi như phím =
        // Logic đơn giản để bắt phím = 
    }
}

// Hàm tính toán chính
function calculate() {
    if (mode === "EQN") {
        params.push(parseFloat(exp) || 0);
        exp = "";
        eqnStep++;
        if (eqnStep === 2) mainDisp.innerText = "b?";
        if (eqnStep === 3) mainDisp.innerText = "c?";
        if (eqnStep === 4) {
            const [a, b, c] = params;
            const delta = b*b - 4*a*c;
            if (delta < 0) mainDisp.innerText = "No Real Roots";
            else {
                const x1 = (-b + Math.sqrt(delta)) / (2*a);
                const x2 = (-b - Math.sqrt(delta)) / (2*a);
                mainDisp.innerText = `x1=${x1.toFixed(2)} x2=${x2.toFixed(2)}`;
            }
            mode = "COMP";
        }
        return;
    }
    try {
        let result = math.evaluate(exp.replace('x', '*').replace('÷', '/'));
        upperDisp.innerText = exp + " =";
        mainDisp.innerText = math.format(result, {precision: 10});
        exp = result.toString();
    } catch (e) {
        mainDisp.innerText = "Syntax ERROR";
        exp = "";
    }
}

function ac() { exp = ""; mainDisp.innerText = "0"; upperDisp.innerText = ""; mode = "COMP"; }
function delLast() { exp = exp.slice(0, -1); mainDisp.innerText = exp || "0"; }
