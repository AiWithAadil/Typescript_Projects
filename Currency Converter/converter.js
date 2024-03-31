#! /usr/bin/env node
import inquirer from "inquirer";
let Currencies = {
    'PKR': {
        "USD": 0.0036,
        "IND": 0.30,
        "Thai Baht": 0.13,
        "Turkish Lira": 0.12
    },
    'IND': {
        "USD": 0.014,
        "PKR": 3.33,
        "Thai Baht": 0.43,
        "Turkish Lira": 0.39
    },
    'USD': {
        "PKR": 277.42,
        "IND": 73.11,
        "Thai Baht": 32.76,
        "Turkish Lira": 8.92
    },
    'Turkish Lira': {
        "USD": 0.112,
        "PKR": 8.87,
        "IND": 2.56,
        "Thai Baht": 4.48
    },
    'Thai Baht': {
        "USD": 0.031,
        "PKR": 7.64,
        "IND": 2.32,
        "Turkish Lira": 0.22
    }
};
async function Converter() {
    while (true) {
        console.log("Welcome to TS Currency Converter");
        const options = await inquirer.prompt([
            {
                type: "list",
                name: "currency1",
                message: "Select currency you have",
                choices: ["PKR", "IND", "USD", "Turkish Lira", "Thai Baht"]
            },
            {
                type: "number",
                name: "amount",
                message: "Enter amount",
            },
            {
                type: "list",
                name: "currency2",
                message: "Select currency to convert",
                choices: ["PKR", "IND", "USD", "Turkish Lira", "Thai Baht", "Exit"]
            }
        ]);
        if (options.currency2 === "Exit") {
            console.log("Thanks");
            break;
        }
        const conversionRate = Currencies[options.currency1][options.currency2];
        if (conversionRate !== undefined) {
            const convertedAmount = options.amount * conversionRate;
            console.log(`Converted amount: ${convertedAmount} ${options.currency2}`);
        }
        else {
            console.log("Invalid input");
        }
    }
}
Converter();
