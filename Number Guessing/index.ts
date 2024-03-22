#! /usr/bin/env node

import inquirer from 'inquirer';

let rounds = 5; //describe games round

async function startGame() {
    let user_score = 0;

    for (let i = 0; i < rounds; i++) {
        const numberGuessing = await inquirer.prompt([
            {
                type: "number",
                name: "user1",
                message: `Enter number you want to guess (Round ${i + 1}/${rounds}): ` // when one round finish its value change
            }
        ]);

        const userNumber = numberGuessing.user1;
        const computer_number = Math.floor(Math.random() * 10) + 1;//compute guess numbers between 1 to 10
        
        //conditional statement
        if (userNumber === computer_number) {
            console.log(`
            Correct Guess.
            Your Guess number is ${userNumber}
            Computer Guess number is ${computer_number}
            `);
            user_score++;
            console.log(`Your score is ${user_score}`);
        } else {
            console.log(`
            Wrong Guess.
            Your Guess number is ${userNumber}
            Computer Guess number is ${computer_number}
            `);
            console.log(`Your score is ${user_score}`);
        }
    }

    console.log('Game Over. Thanks for playing!');
}

//Start the game
startGame();
