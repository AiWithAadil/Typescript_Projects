#! /usr/bin/env node
import inquirer from 'inquirer';
// Customer class
class Customer {
    constructor(fname, lname, age, gender, mob, acc) {
        this.first_name = fname;
        this.last_name = lname;
        this.age = age;
        this.gender = gender;
        this.mobileNum = mob;
        this.AccNo = acc;
    }
}
// Bank class
class Bank {
    constructor(accountNum, initialBalance = 0, withdrawalCharge = 0, depositCharge = 0) {
        this.accountNum = accountNum;
        this.balance = initialBalance;
        this.withdrawalCharge = withdrawalCharge;
        this.depositCharge = depositCharge;
    }
    deposit(amount) {
        if (amount > 0) {
            let finalAmount = amount;
            if (amount > 100) {
                finalAmount -= this.depositCharge;
            }
            this.balance += finalAmount;
            console.log(`Deposited: $${amount}. New balance: $${this.balance}`);
        }
        else {
            console.log('Deposit amount must be positive.');
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            let finalAmount = amount;
            if (amount > 100) {
                finalAmount += this.withdrawalCharge;
            }
            this.balance -= finalAmount;
            console.log(`Withdrew: $${amount}. New balance: $${this.balance}`);
        }
        else {
            console.log('Insufficient balance or invalid amount.');
        }
    }
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
const customers = {};
// Get a customer info 
async function CustomerInfo() {
    const info = await inquirer.prompt([
        {
            type: 'input',
            name: 'fname',
            message: 'Enter your first name'
        },
        {
            type: 'input',
            name: 'lname',
            message: 'Enter your last name'
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age',
            validate: (value) => !isNaN(value) && value > 0 ? true : 'Please enter a valid age.'
        },
        {
            type: 'input',
            name: 'gender',
            message: 'Enter your gender'
        },
        {
            type: 'input',
            name: 'mobileNum',
            message: 'Enter your mobile number',
            validate: (value) => !isNaN(value) && value > 0 ? true : 'Please enter a valid mobile number.'
        },
        {
            type: 'input',
            name: 'accNum',
            message: 'Enter your account number',
            validate: (value) => !isNaN(value) && value > 0 ? true : 'Please enter a valid account number.'
        },
        {
            type: 'input',
            name: 'initialBalance',
            message: 'Enter the initial balance for the account',
            validate: (value) => !isNaN(value) && value >= 0 ? true : 'Please enter a valid balance.'
        }
    ]);
    const customer = new Customer(info.fname, info.lname, parseInt(info.age), info.gender, parseInt(info.mobileNum), parseInt(info.accNum));
    const bank = new Bank(parseInt(info.accNum), parseFloat(info.initialBalance));
    console.log('Customer created successfully:', customer);
    console.log(`Bank account created for ${customer.first_name} with balance $${bank.balance}`);
    customers[customer.AccNo] = { customer, bank };
    return { customer, bank };
}
// main function 
async function Main() {
    while (true) {
        const choice = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Select One Option You Want To Perform',
                choices: ['Open Account', 'Deposit', 'Withdraw', 'Show Balance', 'Exit']
            }
        ]);
        if (choice.choice === 'Open Account') {
            console.log('Please Fill All Information');
            await CustomerInfo();
        }
        else if (choice.choice === 'Deposit') {
            const depo = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'accNum',
                    message: 'Enter your Account Number'
                }
            ]);
            const account = depo.accNum;
            if (customers[account]) {
                const depoAmount = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'amount',
                        message: 'Enter the amount to deposit'
                    }
                ]);
                customers[account].bank.deposit(parseFloat(depoAmount.amount));
            }
            else {
                console.log('Invalid Account number');
            }
        }
        else if (choice.choice === 'Withdraw') {
            const withdrawInfo = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'accNum',
                    message: 'Enter your Account Number'
                }
            ]);
            const account = withdrawInfo.accNum;
            if (customers[account]) {
                const withdrawAmount = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'amount',
                        message: 'Enter the amount to withdraw'
                    }
                ]);
                customers[account].bank.withdraw(parseFloat(withdrawAmount.amount));
            }
            else {
                console.log('Invalid Account number');
            }
        }
        else if (choice.choice === 'Show Balance') {
            const balanceInfo = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'accNum',
                    message: 'Enter your Account Number'
                }
            ]);
            const account = balanceInfo.accNum;
            if (customers[account]) {
                customers[account].bank.checkBalance();
            }
            else {
                console.log('Invalid Account number');
            }
        }
        else if (choice.choice === 'Exit') {
            console.log('Goodbye!');
            break;
        }
    }
}
Main();
