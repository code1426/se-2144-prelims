export class Calculator {
  private currentOperandElement: HTMLDivElement;
  private previousOperandElement: HTMLDivElement;
  private helloTextElement: HTMLDivElement;
  private helloDisplayValue: string;
  private previousOperand: string;
  private currentOperand: string;
  private operator: string | null;
  private isTurnedOn: boolean;
  private greetings: string[];

  constructor(previousOperandElement: HTMLDivElement, currentOperandElement: HTMLDivElement, helloTextElement: HTMLDivElement) {
    this.currentOperandElement = currentOperandElement;
    this.previousOperandElement = previousOperandElement;
    this.helloTextElement = helloTextElement;
    this.helloDisplayValue = ""
    this.previousOperand = ""
    this.currentOperand = ""
    this.operator = null
    this.isTurnedOn = false
    this.greetings = [
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
  }

  public clear(): void {
    this.isTurnedOn = true
    this.helloDisplayValue = ""
    this.previousOperand = ""
    this.currentOperand = "0"
    this.operator = null
  }

  public backspace(): void {
    if (!this.isTurnedOn) return
    if (this.currentOperand === "ERROR") return
    if (this.currentOperand.length > 1) {
      this.currentOperand = this.currentOperand.slice(0, -1);
  } else {
      this.currentOperand = "0";
    }
  }
 
  public setOperator(operator: string): void {
    if (!this.isTurnedOn) return
    if (this.currentOperand === "" || this.currentOperand === "ERROR") return
    if (this.previousOperand !== "") {
      this.calculate()
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  public appendValue(value: string): void {
    if (!this.isTurnedOn) return
    if (this.currentOperand === "ERROR") return

    // to prevent operand to start with 0
    if (this.currentOperand === "0" && value !== ".") {
      this.currentOperand = ""
    }
    if (value === "." && this.currentOperand.includes(".")) return;  // Prevent multiple decimals
    if (this.currentOperand.length >= 10) return
    this.currentOperand += value;
  }

  public calculate(): void {
    if (!this.isTurnedOn) return
    if (this.currentOperand === "ERROR") return
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    let result: number | "ERROR";

    if (isNaN(prev) || isNaN(current)) return;  // Prevent invalid inputs

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
    this.currentOperand = result.toString();
    this.operator = "";
    this.previousOperand = "";

    if (this.currentOperand.length > 10) {
      this.currentOperand = this.currentOperand.slice(0, 10); // Limit to 10 digits
    }
  }

  public handleHello():  void {
    if (!this.isTurnedOn) return

    const randomGreeting = this.greetings[Math.floor(Math.random() * this.greetings.length)];
    this.helloDisplayValue = randomGreeting;

    setTimeout(() => {
      this.helloDisplayValue = ""
      this.updateDisplay();
    }, 1750)
  }

  public handleBye(): void {
    if (!this.isTurnedOn) return
    this.clear();
    this.isTurnedOn = false;
    this.currentOperand = "Goodbye!";
    this.updateDisplay();
    setTimeout(() => {
      this.clear();
      this.currentOperand = "";
      this.updateDisplay();
    }, 2000);
  }

  public updateDisplay(): void {
    this.currentOperandElement.innerText = this.currentOperand;
    this.previousOperandElement.innerText = this.previousOperand + (this.operator ? ` ${this.operator}` : "");
    this.helloTextElement.innerText = this.helloDisplayValue;
  }
}