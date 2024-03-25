import inquirer from "inquirer";
let user_balance = 0;
const atm = await inquirer.prompt([
    {
        type: "number",
        name: "id",
        message: "Enter your user id: ",
    },
    {
        type: "number",
        name: "pin",
        message: "Enter your user pin: ",
    }
]);
const user_pin = atm.pin;
const user_id = atm.id;
async function atmSystem(pin, id) {
    if (pin === user_pin && id === user_id) {
        console.log("Successfully login");
        while (true) {
            const atmInputs = await inquirer.prompt([
                {
                    type: "list",
                    name: "atm_type",
                    message: "Please select your account type",
                    choices: ["Current Account", "Saving Account"]
                },
                {
                    type: "list",
                    name: "atm_options",
                    message: "Please select one option you want to do",
                    choices: ['Check Balance', 'Withdraw', 'Deposit', 'Exit']
                }
            ]);
            if (atmInputs.atm_type === "Current Account" || atmInputs.atm_type === "Saving Account") {
                if (atmInputs.atm_options === 'Check Balance') {
                    console.log(`This is your balance ${user_balance}`);
                }
                else if (atmInputs.atm_options === 'Withdraw') {
                    const Withdraw = await inquirer.prompt([
                        {
                            type: "list",
                            name: "withdraw",
                            message: "Please select amount to withdraw:",
                            choices: [1000, 2000, 5000, 10000, 25000]
                        }
                    ]);
                    if (Withdraw.withdraw <= user_balance) {
                        user_balance -= Withdraw.withdraw;
                        console.log(`Withdraw successful. Remaining balance: ${user_balance}`);
                    }
                    else {
                        console.log(`Insufficient balance. Your current balance is ${user_balance}`);
                    }
                }
                else if (atmInputs.atm_options === 'Deposit') {
                    const Deposit = await inquirer.prompt([
                        {
                            type: "number",
                            name: "Deposit",
                            message: "Please enter amount to deposit:"
                        }
                    ]);
                    user_balance += Deposit.Deposit;
                    console.log(`Deposit successful. New balance: ${user_balance}`);
                }
                else if (atmInputs.atm_options === 'Exit') {
                    break;
                }
                else {
                    console.log("Invalid input");
                }
            }
        }
    }
}
// Usage example
atmSystem(user_pin, user_id);
