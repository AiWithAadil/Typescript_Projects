#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    name;
    Fuel;
    constructor(name) {
        this.name = name;
        this.Fuel = 100; // Initialize fuel to 100
    }
    // Method to decrease fuel
    decreaseFuel(amount) {
        this.Fuel -= amount;
    }
}
class Opponent {
    name;
    Fuel;
    constructor(name) {
        this.name = name;
        this.Fuel = 100; // Initialize fuel to 100
    }
    // Method to decrease fuel
    decreaseFuel(amount) {
        this.Fuel -= amount;
    }
}
async function main() {
    let choice;
    let playerInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'player',
            message: 'Enter your name here'
        }
    ]);
    let opponentInput = await inquirer.prompt([
        {
            type: 'list',
            name: 'opponent',
            message: 'Please select your Opponent',
            choices: ["Zombie", "Dragon", "Ghost"]
        }
    ]);
    let P = new Player(playerInput.player);
    let O = new Opponent(opponentInput.opponent);
    while (true) {
        console.log(P, O);
        if (opponentInput.opponent === 'Zombie') {
            console.log(`${chalk.bold.blue(P.name)} VS ${chalk.bold.red(O.name)}`);
            choice = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'ch',
                    message: 'Select one option',
                    choices: ['Attack', 'Hide from Zombie', 'Run away from Zombie']
                }
            ]);
            if (choice.ch === "Attack") {
                // Generate a random number between 1 and 10
                const randomNumber = Math.floor(Math.random() * 10);
                if (randomNumber > 5) {
                    // If random number is greater than 5, decrease player's fuel
                    P.decreaseFuel(20);
                    console.log(chalk.bold.red(`You attacked ${O.name}. Your fuel decreased.`));
                }
                else {
                    // If random number is less than or equal to 5, decrease opponent's fuel
                    O.decreaseFuel(20);
                    console.log(chalk.bold.red(`${O.name} defended. Its fuel decreased.`));
                }
            }
            if (choice.ch === "Hide from Zombie") {
                console.log(chalk.bold.green('You Safe: GOOD'));
            }
            if (choice.ch === "Run away from Zombie") {
                console.log(chalk.bold.gray('You LOST THE GAME'));
            }
            // Display remaining fuel
            console.log(`${P.name}'s fuel: ${P.Fuel}`);
            console.log(`${O.name}'s fuel: ${O.Fuel}`);
        }
        else if (opponentInput.opponent === "Dragon") {
            console.log(`${chalk.bold.blue(P.name)} VS ${chalk.bold.red(O.name)}`);
            choice = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'ch',
                    message: 'Select one option',
                    choices: ['Attack', 'Hide from Dragon', 'Run away from Dragon']
                }
            ]);
            if (choice.ch === "Attack") {
                // Generate a random number between 1 and 10
                const randomNumber = Math.floor(Math.random() * 10);
                if (randomNumber > 5) {
                    // If random number is greater than 5, decrease player's fuel
                    P.decreaseFuel(20);
                    console.log(chalk.bold.red(`You attacked ${O.name}. Your fuel decreased.`));
                }
                else {
                    // If random number is less than or equal to 5, decrease opponent's fuel
                    O.decreaseFuel(20);
                    console.log(chalk.bold.red(`${O.name} defended. Its fuel decreased.`));
                }
            }
            if (choice.ch === "Hide from Dragon") {
                console.log(chalk.bold.red('You LOST THE GAME'));
            }
            if (choice.ch === "Run away from Dragon") {
                console.log(chalk.bold.green('You SAFE: GOOD'));
            }
            // Display remaining fuel
            console.log(`${P.name}'s fuel: ${P.Fuel}`);
            console.log(`${O.name}'s fuel: ${O.Fuel}`);
        }
        else if (opponentInput.opponent === "Ghost") {
            console.log(`${chalk.bold.blue(P.name)} VS ${chalk.bold.red(O.name)}`);
            choice = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'ch',
                    message: 'Select one option',
                    choices: ['Attack', 'Hide from Dragon', 'Run away from Dragon']
                }
            ]);
            if (choice.ch === "Attack") {
                // Generate a random number between 1 and 10
                const randomNumber = Math.floor(Math.random() * 10);
                if (randomNumber > 5) {
                    // If random number is greater than 5, decrease player's fuel
                    P.decreaseFuel(20);
                    console.log(chalk.bold.red(`You attacked ${O.name}. Your fuel decreased.`));
                }
                else {
                    // If random number is less than or equal to 5, decrease opponent's fuel
                    O.decreaseFuel(20);
                    console.log(chalk.bold.red(`${O.name} defended. Its fuel decreased.`));
                }
            }
            if (choice.ch === "Hide from Ghost") {
                console.log(chalk.bold.red('You LOST THE GAME'));
            }
            if (choice.ch === "Run away from Ghost") {
                console.log(chalk.bold.red('You LOST THE GAME'));
            }
            // Display remaining fuel
            console.log(`${P.name}'s fuel: ${P.Fuel}`);
            console.log(`${O.name}'s fuel: ${O.Fuel}`);
        }
        // Check if Player's Fuel is 0 or choice is "Run away from Zombie"
        if (P.Fuel === 0 || choice.ch === 'Run away from Zombie' || O.Fuel === 0 || choice.ch === 'Hide from Dragon' || choice.ch === "Hide from Ghost " || choice.ch === "Run away from Ghost") {
            console.log(chalk.bold.yellow('Game Over'));
            break; // Exit the loop if the game is over
        }
    }
}
main();
