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
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return null;
  }
}


/* ==========================================================
   PURE MATH FUNCTIONS
   ========================================================== */
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Nope.";
  return a / b;
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
   DISPLAY FORMATTING / OVERFLOW HANDLING
   ========================================================== */
function formatNumber(value) {
  let str = value.toString();

  // Prevent scientific notation
  if (str.includes("e")) return "Overflow";

  // If too long, try rounding
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

  // First number
  if (currentOperator === null) {
    if (firstNumber === "") {
      firstNumber = "0.";
      updateDisplay(firstNumber);
      return;
    }
    if (!firstNumber.includes(".")) {
      firstNumber += ".";
      updateDisplay(firstNumber);
    }
    return;
  }

  // Second number
  if (secondNumber === "") {
    secondNumber = "0.";
    updateDisplay(secondNumber);
    return;
  }
  if (!secondNumber.includes(".")) {
    secondNumber += ".";
    updateDisplay(secondNumber);
  }
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
  // Prevent consecutive operators
  if (currentOperator !== null && secondNumber === "") {
    currentOperator = op;
    return;
  }

  // Normal chaining
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
  if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active-operator");
  }
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
   EVALUATION (=)
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
   CLEAR (AC)
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
    return;
  }

  secondNumber = secondNumber.slice(0, -1);
  updateDisplay(secondNumber || "0");
}


/* ==========================================================
   NEGATION (+/-)
   ========================================================== */
function negate() {
  if (shouldResetScreen) return;

  if (currentOperator === null) {
    if (firstNumber === "") return;
    firstNumber = (Number(firstNumber) * -1).toString();
    updateDisplay(firstNumber);
    return;
  }

  if (secondNumber === "") return;
  secondNumber = (Number(secondNumber) * -1).toString();
  updateDisplay(secondNumber);
}


/* ==========================================================
   EVENT LISTENERS (BUTTONS)
   ========================================================== */
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const negateButton = document.querySelector(".negate");

digitButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === ".") {
      appendDecimal();
    } else {
      inputDigit(btn.textContent);
    }
  });
});

operatorButtons.forEach(btn =>
  btn.addEventListener("click", () => {
    inputOperator(btn.textContent);
    highlightOperator(btn);
  })
);

equalsButton.addEventListener("click", () => {
  evaluate();
  clearOperatorHighlight();
});

clearButton.addEventListener("click", () => {
  clearAll();
  clearOperatorHighlight();
});

backspaceButton.addEventListener("click", backspace);
negateButton.addEventListener("click", negate);


/* ==========================================================
   KEYBOARD SUPPORT
   ========================================================== */
window.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
  const key = e.key;

  if (key >= "0" && key <= "9") {
    inputDigit(key);
    return;
  }

  if (key === ".") {
    appendDecimal();
    return;
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    inputOperator(key);
    return;
  }

  if (key === "Enter" || key === "=") {
    evaluate();
    clearOperatorHighlight();
    return;
  }

  if (key === "Backspace") {
    backspace();
    return;
  }

  if (key.toLowerCase() === "c" || key === "Escape") {
    clearAll();
    clearOperatorHighlight();
    return;
  }

  if (key === "n") {
    negate();
    return;
  }
}
