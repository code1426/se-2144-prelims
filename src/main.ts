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

const calculator = new Calculator(
  previousOperandElement!,
  currentOperandElement!,
  helloTextElement!,
  displayElement!
  );

const addEventListeners = (calculator: Calculator, elements: HTMLDivElement[] | NodeListOf<HTMLDivElement>): void => {
  elements.forEach(element => {
    element.addEventListener("click", () => {
      switch (element) {
        case backspaceButton:
          calculator.backspace();
          break;
        case allClearButton:
          calculator.clear();
          break;
        case equalsButton:
          calculator.calculate();
          break;
        case helloButton:
          calculator.handleHello();
          break;
        case byeButton:
          calculator.handleBye();
          break;
      }
      
      switch (elements) {
        case numberButtons:
          calculator.appendValue(element.dataset.number!);
          break;
        case operationButtons:
          calculator.setOperator(element.dataset.operation!);
          break;
      }
      calculator.updateDisplay();
    })
  })
}

addEventListeners(calculator, numberButtons)
addEventListeners(calculator, operationButtons)
addEventListeners(calculator, [ backspaceButton!, allClearButton!, equalsButton!, helloButton!, byeButton! ])