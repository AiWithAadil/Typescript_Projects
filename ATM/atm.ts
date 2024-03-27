#! /usr/bin/env node

import inquirer from "inquirer";

let user_balance = 100000;
let user_pin = 123
let user_id = "atm123" 

const atm = await inquirer.prompt([
        {
            type: "string",
            name: "id",
            message: "Enter your user id: ",
        },
        {
            type: "number",
            name: "pin",
            message: "Enter your user pin: ",
        }
    ]);

                             //This Promise will resolve to void, meaning it doesn't return any specific value. 
async function atmSystem(pin: number, id: string): Promise<void> {
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
                    choices: ['Check Balance', 'Withdraw', 'Deposit',"Exit"]
                }
            ]);
            if (atmInputs.atm_type === "Current Account" || atmInputs.atm_type === "Saving Account") {
                if (atmInputs.atm_options === 'Check Balance') {
                    console.log(`This is your balance ${user_balance}`);
                } else if (atmInputs.atm_options === 'Withdraw') {
                    const Withdraw = await inquirer.prompt([
                        {
                            type: "list",
                            name: "withdraw",
                            message: "Please select amount to withdraw:",
                            choices: [1000, 2000, 5000, 10000, 25000]
                        }
                    ]);
                    if ( Withdraw.withdraw <=  user_balance) {
                        user_balance -= Withdraw.withdraw; // It minus the value from user_balance if its less than or equal
                        console.log(`Withdraw successful. Remaining balance: ${user_balance}`);
                    } else {
                        console.log(`Insufficient balance. Your current balance is ${user_balance}`);
                    }
                } else if (atmInputs.atm_options === 'Deposit') {
                    const Deposit = await inquirer.prompt([
                        {
                            type: "number",
                            name: "Deposit",
                            message: "Please enter amount to deposit:"
                        }
                    ]);
                    user_balance += Deposit.Deposit; // it add the amount into user_balance
                    console.log(`Deposit successful. New balance: ${user_balance}`);
                } else if (atmInputs.atm_options === 'Exit') {
                    console.log("Thank you");
                    break;
                } else {
                    console.log("Invalid input");
                }
            }
        }
    }
}

// starting function
atmSystem(user_pin, user_id);