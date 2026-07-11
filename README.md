# Calculator Project  
A fully interactive, keyboard‑enabled calculator built as part of The Odin Project foundations curriculum.  
This project demonstrates clean UI design, modular JavaScript architecture, and professional event handling.

---

## 🚀 Features

### **Core Functionality**
- Addition, subtraction, multiplication, division  
- Decimal support  
- Operator chaining  
- Negation (+/−)  
- Backspace editing  
- Clear (AC)  
- Divide‑by‑zero protection (“Nope.”)

### **UI / UX Enhancements**
- Operator highlighting  
- Display overflow handling  
- Automatic rounding  
- Prevention of consecutive operators  
- Reset behavior after evaluation  
- Clean, responsive layout (HTML/CSS)

### **Keyboard Support**
- `0–9` for digits  
- `+ - * /` for operators  
- `.` for decimal  
- `Enter` or `=` to evaluate  
- `Backspace` to delete  
- `c` or `Escape` to clear  
- `n` to toggle negation  

---

## 🧩 File Structure


---

## 🛠️ JavaScript Architecture

The project uses a clean, modular structure:

### **State Variables**
Tracks first number, second number, operator, reset state, and active operator button.

### **Dispatcher**
Routes operations (`+ - * /`) to pure math functions.

### **Pure Math Functions**
Simple, side‑effect‑free arithmetic functions.

### **Display Control**
Updates and clears the calculator screen.

### **Formatting / Overflow Handling**
Rounds long numbers and prevents display overflow.

### **Input Handling**
- Digit input  
- Decimal input  
- Operator input  
- Negation  
- Backspace  

### **Operator Highlighting**
Visual feedback for active operator.

### **Evaluation**
Handles `=` behavior and chaining.

### **Event Listeners**
- Button clicks  
- Keyboard input  

---

## 🎯 Learning Objectives

This project demonstrates:

- DOM manipulation  
- Event delegation  
- Clean function separation  
- State management  
- UI/UX polish  
- Keyboard event handling  
- Defensive programming (overflow, invalid input, divide‑by‑zero)

---

## 📸 Screenshot  
*(Add your screenshot here once your UI is styled)*

---

## 📦 Future Enhancements

- Memory functions (M+, M-, MR)  
- History tape (like old calculators)  
- Scientific mode  
- Theme toggle (light/dark)  
- Button animations and transitions  

---

## 📝 License

This project is part of **The Odin Project** curriculum.  
Feel free to fork, modify, and improve.

