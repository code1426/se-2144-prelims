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
  }

  public clear(changeDisplayInto: string = "0", toggleOn: boolean = true): void {
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
      || this.currentOperand === "ERROR" 
      || (this.currentOperand === "0" && !this.previousOperand)
    ) return

    if (!this.currentOperand || this.currentOperand === "0") {
      this.handleDeleteOperator()
      return
    }
    if (this.currentOperand.length > 1) {
      this.currentOperand = this.currentOperand.slice(0, -1);
    } else {
      this.currentOperand = "0";
    }
  }

  public handleDeleteOperator(): void {
    this.currentOperand = this.previousOperand
    this.previousOperand = ""
    this.operator = null;
  }

  public setOperator(operator: string): void {
    if (!this.isTurnedOn) return
    if (!this.currentOperand || this.currentOperand === "ERROR") return
    if (this.previousOperand) {
      this.calculate()
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  public appendValue(value: string): void {
    if (!this.isTurnedOn || this.currentOperand === "ERROR") return
    if (value === "." && this.currentOperand.includes(".")) return;  // Prevent multiple decimals
    if (this.isNewEntry) {
      this.currentOperand = "0"
    }
    // to prevent operand to start with 0
    if (this.currentOperand === "0" && value !== ".") {
      this.currentOperand = ""
    }
    if (this.currentOperand.length >= 10) return
    this.currentOperand += value;
    this.isNewEntry = false;
  }

  public calculate(): void {
    if (!this.isTurnedOn || this.currentOperand === "ERROR") return

    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    let result: number | "ERROR";

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
        result = current === 0 ? "ERROR" : prev / current;  // Prevent division by zero
        break;
      default:
        return;
    }
    this.clear(result.toString()); // Clear the display and change it into result

    if (this.currentOperand.length > 10) {
      this.currentOperand = this.currentOperand.slice(0, 10); // Limit to 10 digits
    }
  }

  public updateDisplay(): void {
    if (this.isTurnedOn) {
      this.displayContainer.style.backgroundColor = "#222";
    }
    this.currentOperandElement.innerText = this.currentOperand;
    this.previousOperandElement.innerText = this.previousOperand + (this.operator ? ` ${this.operator}` : "");
    this.helloTextElement.innerText = this.helloDisplayValue;
  }

  public handleBye(): void {
    if (!this.isTurnedOn) return;
    console.log("true")
    this.clear("Goodbye!", false); // Clear and change the display into "Goodbye!" then turn it off
    this.updateDisplay();
    this.isClearable = false

    setTimeout(() => {
      this.isClearable = true
      this.clear("", false);
      this.displayContainer.style.backgroundColor = "#181818";
      console.log("false")
      this.updateDisplay();
    }, 2000);
  }

  public handleHello():  void {
    if (!this.isTurnedOn) return
    const greetings = [
      "Hello",   // English
      "Hola",    // Spanish
      "Kamusta", // Filipino
      "Bonjour", // French
      "Ciao",    // Italian
      "Hallo",   // German
      "Olá",     // Portuguese
      "Namaste", // Hindi
      "Salaam",  // Persian
      "Nǐ hǎo",  // Chinese (Mandarin)
      "Merhaba", // Turkish
      "Shalom",  // Hebrew
      "Sawubona", // Zulu
      "Salve",   // Latin
      "Hei",     // Norwegian
      "Ahoj",    // Czech
      "Xin chào", // Vietnamese
      "Yassas",  // Greek
      "Sawasdee", // Thai
      "Selamat", // Malay/Indonesian
      "Jambo",   // Swahili
      "Dia dhuit", // Irish Gaelic
      "Hej",     // Swedish
      "Sveiki",  // Latvian
      "Moi",     // Finnish
      "Tere",    // Estonian
      "Halo",    // Indonesian
      "Mingalaba", // Burmese
      "Saluton", // Esperanto
      "Sannu",   // Hausa
      "Bula",    // Fijian
      "Privet"   // Russian (informal)
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    this.helloDisplayValue = randomGreeting;

    setTimeout(() => {
      this.helloDisplayValue = ""
      this.updateDisplay();
    }, 1750)
  }
}