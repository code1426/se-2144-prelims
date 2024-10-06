import { 
  characterLimit, 
  greetings, 
  screenActive, 
  screenInactive, 
  goodbyeText, 
  errorMessage, 
  initialDisplay 
} from "./constants";

export class Calculator {
  private currentOperandElement: HTMLDivElement;
  private previousOperandElement: HTMLDivElement;
  private displayContainer: HTMLDivElement;
  private helloTextElement: HTMLDivElement;
  private helloDisplayValue: string;
  private previousOperand: string;
  private currentOperand: string;
  private operator: string | null;
  private isNewEntry: boolean;
  private isTurnedOn: boolean;
  private isClearable: boolean;
  // private canNegative: boolean;

  constructor (
    previousOperandElement: HTMLDivElement, 
    currentOperandElement: HTMLDivElement, 
    helloTextElement: HTMLDivElement, 
    displayContainer: HTMLDivElement
    ) {
    this.currentOperandElement = currentOperandElement;
    this.previousOperandElement = previousOperandElement;
    this.displayContainer = displayContainer;
    this.helloTextElement = helloTextElement;
    this.helloDisplayValue = ""
    this.previousOperand = ""
    this.currentOperand = ""
    this.operator = null
    this.isTurnedOn = false
    this.isNewEntry = true
    this.isClearable = true
    // this.canNegative = true
  }

  public clear(changeDisplayInto: string = initialDisplay, toggleOn: boolean = true): void {
    if (!this.isClearable) return
    this.isTurnedOn = toggleOn;
    this.helloDisplayValue = ""
    this.previousOperand = ""
    this.currentOperand = changeDisplayInto
    this.operator = null
    this.isNewEntry = true
  }

  public backspace(): void {
    if (!this.isTurnedOn
      || this.currentOperand === errorMessage
      || (this.currentOperand === initialDisplay && !this.previousOperand)
    ) return

    if (!this.currentOperand || this.currentOperand === initialDisplay) {
      this.handleDeleteOperator()
      return
    }
    if (this.currentOperand.length > 1) {
      this.currentOperand = this.currentOperand.slice(0, -1);
    } else {
      this.currentOperand = initialDisplay;
    }
  }

  public handleDeleteOperator(): void {
    this.currentOperand = this.previousOperand
    this.previousOperand = ""
    this.operator = null;
  }

  // public setNegativeNumber(): void {
  //   if (this.currentOperand === initialDisplay || this.currentOperand === "") {
  //     this.currentOperand = "-"
  //   }
  //   this.canNegative = false
  // }

  public setOperator(operator: string): void {
    if (!this.isTurnedOn) return
    // if (operator === "-" && this.canNegative) {
    //   this.setNegativeNumber()
    //   return
    // }
    if (!this.currentOperand) return
    if (this.previousOperand) {
      this.calculate()
    }
    if (this.currentOperand === errorMessage) return
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    // this.canNegative = true
  }

  public appendValue(value: string): void {
    if (!this.isTurnedOn || this.currentOperand === errorMessage) return
    if (value === "." && this.currentOperand.includes(".")) return;  // Prevent multiple decimals
    if (this.isNewEntry) {
      this.clear()
    }
    // to prevent operand to start with 0
    if (this.currentOperand === initialDisplay && value !== ".") {
      this.clear("")
    }
    if (this.currentOperand.length >= characterLimit) return
    this.currentOperand += value;
    this.isNewEntry = false;
  }

  public calculate(): void {
    if (!this.isTurnedOn || this.currentOperand === errorMessage) return

    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    let result: number | string;

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = current === 0 ? errorMessage : prev / current;  // Prevent division by zero
        break;
      default:
        return;
    }
    this.clear(result.toString()); // Clear the display and change it into result

    if (this.currentOperand.length > characterLimit) {
      this.currentOperand = this.currentOperand.slice(0, characterLimit); // Limit to 10 digits
    }
  }

  public updateDisplay(): void {
    if (this.isTurnedOn) {
      this.displayContainer.style.backgroundColor = screenActive;
    }
    this.currentOperandElement.innerText = this.currentOperand;
    this.previousOperandElement.innerText = this.previousOperand + (this.operator ? ` ${this.operator}` : "");
    this.helloTextElement.innerText = this.helloDisplayValue;
  }

  public handleBye(): void {
    if (!this.isTurnedOn) return;
    this.clear(goodbyeText, false); // Clear and change the display into "Goodbye!" then turn it off
    this.updateDisplay();
    this.isClearable = false

    setTimeout(() => {
      this.isClearable = true
      this.clear("", false);
      this.displayContainer.style.backgroundColor = screenInactive;
      this.updateDisplay();
    }, 2000);
  }

  public handleHello():  void {
    if (!this.isTurnedOn) return
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    this.helloDisplayValue = randomGreeting;

    setTimeout(() => {
      this.helloDisplayValue = ""
      this.updateDisplay();
    }, 1750)
  }
}