/* ==========================================================
   STATE VARIABLES
   ========================================================== */
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;
let activeOperatorButton = null;

/* ==========================================================
   CORE OPERATION DISPATCHER
   ========================================================== */
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Nope." : a / b;
  }
}

/* ==========================================================
   DISPLAY CONTROL
   ========================================================== */
const display = document.getElementById("display");

function updateDisplay(value) {
  display.textContent = formatNumber(value);
}

function clearDisplay() {
  display.textContent = "";
}

/* ==========================================================
   DISPLAY FORMATTING
   ========================================================== */
function formatNumber(value) {
  let str = value.toString();
  if (str.includes("e")) return "Overflow";
  if (str.length > 12) {
    let rounded = Number(value).toPrecision(10);
    if (rounded.length > 12) return "Overflow";
    return rounded;
  }
  return str;
}

/* ==========================================================
   DECIMAL INPUT
   ========================================================== */
function appendDecimal() {
  if (shouldResetScreen) {
    clearDisplay();
    shouldResetScreen = false;
  }

  if (currentOperator === null) {
    if (firstNumber === "") firstNumber = "0.";
    else if (!firstNumber.includes(".")) firstNumber += ".";
    updateDisplay(firstNumber);
    return;
  }

  if (secondNumber === "") secondNumber = "0.";
  else if (!secondNumber.includes(".")) secondNumber += ".";
  updateDisplay(secondNumber);
}

/* ==========================================================
   DIGIT INPUT
   ========================================================== */
function inputDigit(digit) {
  if (shouldResetScreen) {
    clearDisplay();
    shouldResetScreen = false;
  }

  clearOperatorHighlight();

  if (currentOperator === null) {
    firstNumber += digit;
    updateDisplay(firstNumber);
  } else {
    secondNumber += digit;
    updateDisplay(secondNumber);
  }
}

/* ==========================================================
   OPERATOR INPUT
   ========================================================== */
function inputOperator(op) {
  if (currentOperator !== null && secondNumber === "") {
    currentOperator = op;
    return;
  }

  if (currentOperator !== null && secondNumber !== "") {
    firstNumber = operate(currentOperator, firstNumber, secondNumber);
    secondNumber = "";
    updateDisplay(firstNumber);
  }

  currentOperator = op;
  shouldResetScreen = true;
}

/* ==========================================================
   OPERATOR HIGHLIGHTING
   ========================================================== */
function highlightOperator(button) {
  if (activeOperatorButton) activeOperatorButton.classList.remove("active-operator");
  activeOperatorButton = button;
  activeOperatorButton.classList.add("active-operator");
}

function clearOperatorHighlight() {
  if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active-operator");
    activeOperatorButton = null;
  }
}

/* ==========================================================
   EVALUATION
   ========================================================== */
function evaluate() {
  if (currentOperator && secondNumber !== "") {
    firstNumber = operate(currentOperator, firstNumber, secondNumber);
    secondNumber = "";
    currentOperator = null;
    updateDisplay(firstNumber);
    shouldResetScreen = true;
  }
}

/* ==========================================================
   CLEAR
   ========================================================== */
function clearAll() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  updateDisplay("0");
}

/* ==========================================================
   BACKSPACE
   ========================================================== */
function backspace() {
  if (shouldResetScreen) return;

  if (currentOperator === null) {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber || "0");
  } else {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || "0");
  }
}

/* ==========================================================
   NEGATION
   ========================================================== */
function negate() {
  if (shouldResetScreen) return;

  if (currentOperator === null) {
    if (firstNumber !== "") {
      firstNumber = (Number(firstNumber) * -1).toString();
      updateDisplay(firstNumber);
    }
  } else {
    if (secondNumber !== "") {
      secondNumber = (Number(secondNumber) * -1).toString();
      updateDisplay(secondNumber);
    }
  }
}

/* ==========================================================
   EVENT LISTENERS
   ========================================================== */
document.querySelectorAll(".digit").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.textContent === "." ? appendDecimal() : inputDigit(btn.textContent);
  });
});

document.querySelectorAll(".operator").forEach(btn =>
  btn.addEventListener("click", () => {
    inputOperator(btn.textContent);
    highlightOperator(btn);
  })
);

document.querySelector(".equals").addEventListener("click", () => {
  evaluate();
  clearOperatorHighlight();
});

document.querySelector(".clear").addEventListener("click", () => {
  clearAll();
  clearOperatorHighlight();
});

document.querySelector(".backspace").addEventListener("click", backspace);
document.querySelector(".negate").addEventListener("click", negate);

/* ==========================================================
   KEYBOARD SUPPORT
   ========================================================== */
window.addEventListener("keydown", e => {
  const key = e.key;

  if (key >= "0" && key <= "9") inputDigit(key);
  else if (key === ".") appendDecimal();
  else if (["+", "-", "*", "/"].includes(key)) inputOperator(key);
  else if (key === "Enter" || key === "=") {
    evaluate();
    clearOperatorHighlight();
  }
  else if (key === "Backspace") backspace();
  else if (key.toLowerCase() === "c" || key === "Escape") {
    clearAll();
    clearOperatorHighlight();
  }
  else if (key === "n") negate();
});

/* ==========================================================
   THEME TOGGLE
   ========================================================== */
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");

  themeToggle.textContent =
    document.documentElement.classList.contains("light") ? "☀️" : "🌙";
});
