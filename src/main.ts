import { Calculator } from "./calculator";

const numberButtons = document.querySelectorAll<HTMLDivElement>("[data-number]");
const operationButtons = document.querySelectorAll<HTMLDivElement>("[data-operation]");
const equalsButton = document.querySelector<HTMLDivElement>("[data-equals]");
const backspaceButton = document.querySelector<HTMLDivElement>("[data-backspace]");
const allClearButton = document.querySelector<HTMLDivElement>("[data-allClear]");
const byeButton = document.querySelector<HTMLDivElement>("[data-bye]");
const helloButton = document.querySelector<HTMLDivElement>("[data-hello]");
const helloTextElement = document.querySelector<HTMLDivElement>("#hello-world")
const previousOperandElement = document.querySelector<HTMLDivElement>("#previousOperand")
const currentOperandElement = document.querySelector<HTMLDivElement>("#currentOperand")
const displayElement = document.querySelector<HTMLDivElement>("#screen")

const calculator = new Calculator(previousOperandElement!, currentOperandElement!, helloTextElement!);

numberButtons.forEach(buttons => {
  buttons.addEventListener("click", () => {
    calculator.appendValue(buttons.dataset.number!);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(buttons => {
  buttons.addEventListener("click", () => {
    calculator.setOperator(buttons.dataset.operation!);
    calculator.updateDisplay();
  })
})

backspaceButton?.addEventListener("click", () => {
  calculator.backspace();
  calculator.updateDisplay();
})

allClearButton?.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
  displayElement!.style.backgroundColor = "#222"
})

equalsButton?.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
})

helloButton?.addEventListener("click", () => {
  calculator.handleHello();
  calculator.updateDisplay();
})

byeButton?.addEventListener("click", () => {
  calculator.handleBye();
  setTimeout(() => {
    displayElement!.style.backgroundColor = "#111"
  }, 2000)
})