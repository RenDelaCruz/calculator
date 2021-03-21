
class Calculator {
    constructor(previousExprDisplay, currentExprDisplay) {
        this.previousExprDisplay = previousExprDisplay;
        this.currentExprDisplay = currentExprDisplay;
        this.clear();
    }

    clear() {
        this.currentExpr = "0";
        this.previousExpr = "";
        this.operation = undefined;
    }

    delete() {
        if (this.currentExpr.length === 1) {
            this.currentExpr = "0";
        } else {
            this.currentExpr = this.currentExpr.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (!(number === "." && this.currentExpr.includes(".")) && !(number === "0" && this.currentExpr === "0")) {
            if (this.currentExpr === "0" && number !== ".") {
                this.currentExpr = "";
            }
            this.currentExpr += number.toString();
        }
    }

    selectOperation(operation) {
        if (this.previousExpr !== "") {
            this.calculate();
        }
        this.operation = operation;
        this.previousExpr = this.currentExpr;
        this.currentExpr = "0";
    }

    calculate() {
        const current = parseFloat(this.currentExpr);
        const previous = parseFloat(this.previousExpr);
        let computation;

        switch(this.operation) {
            case "+":
                computation = previous + current;
                break;
            case "-":
                computation = previous - current;
                break;
            case "×":
                computation = previous * current;
                break;
            case "÷":
                computation = previous / current;
                break;
        }

        this.previousExpr = "";
        this.currentExpr = computation;
    }

    updateDisplay() {
        this.currentExprDisplay.innerText = this.currentExpr;
        this.previousExprDisplay.innerText = this.previousExpr + ` ${this.operation ? this.operation : ""}`;
    }

}

const numberButtons = document.querySelectorAll(".num");
const operationButtons = document.querySelectorAll(".operand");
const equalsButton = document.querySelector(".equals");
const delButton = document.querySelector(".del");
const acButton = document.querySelector(".ac");

const currentExprDisplay = document.querySelector(".current-expr");
const previousExprDisplay = document.querySelector(".previous-expr");

const calculator = new Calculator(previousExprDisplay, currentExprDisplay);

for (let button of numberButtons) {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
}

for (let button of operationButtons) {
    button.addEventListener("click", () => {
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    });
}

equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});

delButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

acButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});