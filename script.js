const buttonsContainer = document.querySelector('.buttons-container');
const displayParagraph = document.querySelector('.screen-display');

buttonsContainer.addEventListener('click', function(event) {
const clickedButton = event.target;

        switch (clickedButton.id) {
            case 'clear':
                handleClearClick();
                break;
            case 'backspace':
                handleBackspaceClick();
                break;
            case 'percent':
                handlePercentClick();
                break;
            case 'positive-negative':
                handlePositivenegativeClick();
                break;
            case 'equals':
                handleEqualsClick();
                break;
            case 'times':
                handleOperator('*');
                break;
            case 'divide':
                handleOperator('/');
                break;
            case 'plus':
            case 'minus':
                handleOperator(clickedButton.innerHTML);
                break;            
            default:
                handleGenericClick(clickedButton.innerHTML);
        }
    });
// variables to keep track on the user interaction with the calculator
    let inputExpression = '';
    let currentOperator = '';
    let isNewCalculation = true;

    function handleBackspaceClick() {
        inputExpression = inputExpression.slice(0, -1);
        updateDisplay();
    }

    function handlePercentClick() {
        if (inputExpression) {
            const value = parseFloat(inputExpression);
            const percentValue = value / 100;
            inputExpression = percentValue.toString();
            updateDisplay();
        }
    }

    function handlePositivenegativeClick() {
        if (inputExpression) {
            inputExpression = -parseFloat(inputExpression);
            updateDisplay();
        }
    }

    let isDecimalDisabled = false;
//the function handleOperator(operator) and handleGenericClick(value), should help consruct the input expression
    function handleOperator(operator) {
    if (currentOperator && inputExpression !== '') {
        if (!isNewCalculation) {
            evaluate();
            updateDisplay();
        }
        if (result) {
            inputExpression += operator;
            updateDisplay();
        }
    }

    currentOperator = operator;

    if (!isNewCalculation) {
        inputExpression += operator;
        updateDisplay();
    }

    isNewCalculation = false;
    isDecimalDisabled = false;
}

function handleGenericClick(value) {
    if (isNewCalculation) {
        inputExpression = '';
        isNewCalculation = false;
    }

    if (value === '.' && isDecimalDisabled) {
        return;
    }

    if (value === '.' || inputExpression.includes('.')) {
        isDecimalDisabled = true;
    }

    inputExpression += value;
    updateDisplay();
}


    function updateDisplay() {
        displayParagraph.innerHTML = inputExpression;
    }

    /*this function handleEqualsClick(), should determine the end of a calculation, 
    but also alow its reuslt to be used as an inital operand for another calculation if 
    an operator is pressed afte the equals sign */
    function handleEqualsClick() {
        if (!isNewCalculation) {
            evaluate(); 
            updateDisplay();
            isNewCalculation = false;
        }
        currentOperator = '';
    }
// this section separates the numbers from oprerators nd stores them in diferent arrays. this is helpful later on evauaton stage
    let numberArr = [];
    let operatorArr = [];
    function inputExpressionToArr(str) {
    const inputArr = str.match(/[+\-*/]|\d+/g);

    if (inputArr) {
        for (let i = 0; i < inputArr.length; i++) {
            if (isNaN(inputArr[i])) {
                operatorArr.push(inputArr[i]);
            } else {
                numberArr.push(parseFloat(inputArr[i])); 
            }
        }
    }
    }
            function handleClearClick() {
                inputExpression = "";
                numberArr = [];
                operatorArr = [];
                isDecimalDisabled = false;
                updateDisplay();
            }
// the evaluation function uses the number array, and opperator array
    function evaluate() {
        if (currentOperator && inputExpression !== '') {
            // Call inputExpressionToArr to update numberArr and operatorArr
            inputExpressionToArr(inputExpression);
    
            // If there are previous numbers and operators, perform the calculation
            if (numberArr.length > 0 && operatorArr.length > 0) {
                // Perform calculations based on the contents of numberArr and operatorArr
                result = calculateResult(numberArr, operatorArr);
    
                // Clear arrays after calculation
                numberArr = [];
                operatorArr = [];
            }
    
            displayResult(result);
            isNewCalculation = true;
        }
    }
    
    // Function to perform calculation based on arrays
    function calculateResult(numbers, operators) {
        let result = numbers[0];
    
        for (let i = 0; i < operators.length; i++) {
            const nextNumber = numbers[i + 1];
    
            switch (operators[i]) {
                case '+':
                    result += nextNumber;
                    break;
                case '-':
                    result -= nextNumber;
                    break;
                case '*':
                    result *= nextNumber;
                    break;
                case '/':
                    if (nextNumber !== 0) {
                        result /= nextNumber;
                    } else {
                        displayResult('Error: Division by zero');
                        isNewCalculation = true;
                        return 'error'; // or some default value
                    }
                    break;
                default:
                    break;
            }
        }
    
        return result;
    }
    
    function displayResult(result) {

        inputExpression = result.toString();
        
        updateDisplay();
    }