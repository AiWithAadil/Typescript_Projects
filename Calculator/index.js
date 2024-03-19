import inquirer from "inquirer";
const CalculatorInput = await inquirer.prompt([
    {
        type: "number",
        name: "num1",
        message: "Enter First Value: "
    },
    {
        type: "list",
        name: "operator",
        message: "Select one operator: ",
        choices: ["+", "-", "*", "/", "%"]
    },
    {
        type: "number",
        name: "num2",
        message: "Enter Second Value: "
    }
]);
// conditional operators
if (CalculatorInput.operator === "+") {
    let addition = CalculatorInput.num1 + CalculatorInput.num2;
    console.log(`This is your answer: ${addition}`);
}
else if (CalculatorInput.operator === "-") {
    let subtraction = CalculatorInput.num1 - CalculatorInput.num2;
    console.log(`This is your answer: ${subtraction}`);
}
else if (CalculatorInput.operator === "*") {
    let multiplication = CalculatorInput.num1 * CalculatorInput.num2;
    console.log(`This is your answer: ${multiplication}`);
}
else if (CalculatorInput.operator === "/") {
    let division = CalculatorInput.num1 / CalculatorInput.num2;
    console.log(`This is your answer: ${division}`);
}
else if (CalculatorInput.operator === "%") {
    let modulas = CalculatorInput.num1 % CalculatorInput.num2;
    console.log(`This is your answer: ${modulas}`);
}
else {
    console.log("INVALID INPUT");
}
