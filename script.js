
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
        if (this.currentExpr.length === 1 || this.currentExpr === "Error" || this.currentExpr === "Infinity") {
            this.currentExpr = "0";
        } else {
            this.currentExpr = this.currentExpr.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (this.currentExpr === "Error") { return; }

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
        if (!this.previousExpr) { return; }

        let current = parseFloat(this.currentExpr);
        let previous = parseFloat(this.previousExpr);
        let computation = undefined;

        switch (this.operation) {
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

        if (Number.isNaN(computation)) {
            computation = "Error";
        }

        this.previousExpr = "";
        this.currentExpr = computation.toString();
    }

    updateDisplay() {
        const curr = this.formatNumber(this.currentExpr);
        const prev = this.formatNumber(this.previousExpr);
        this.currentExprDisplay.innerText = curr;
        this.previousExprDisplay.innerText = this.previousExpr ? `${prev} ${this.operation}` : "";
    }

    formatNumber(number) {
        let formatted = number.toString();

        if (formatted.includes(".")) {
            let partitions = formatted.split(".");
            let wholeNums = parseFloat(partitions[0]).toLocaleString();
            formatted = wholeNums + "." + partitions[1];
        } else if (formatted !== "Error"){
            formatted = parseFloat(formatted).toLocaleString();
        }

        return formatted;
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