#! /usr/bin/env node
import inquirer from 'inquirer';

function startCountdown(seconds: number) {
    const intervalId = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
            clearInterval(intervalId); 
            console.log("⏰ Countdown timer expired! ⏰"); 
        } else {
            console.log(`⏳ ${seconds} seconds remaining`);
        }
    }, 1000);
}

async function SecondsFromUser() {
    let isValidInput = false;
    let seconds = 0;

    while (!isValidInput) {
        const { inputSeconds } = await inquirer.prompt([
            {
                type: 'number',
                name: 'inputSeconds',
                message: '⏳ Enter the number of seconds to count down:',
            }
        ]);

        if (inputSeconds === undefined) {
            console.log('⚠️ Please enter a valid positive number of seconds.');
        } else {
            seconds = parseInt(inputSeconds);
            if (!isNaN(seconds) && seconds > 0) {
                isValidInput = true;
            } else {
                console.log('⚠️ Please enter a valid positive number of seconds.');
            }
        }
    }

    return seconds;
} 

async function main() {
    console.log("🕒 Welcome to Countdown Timer! 🕒"); 
    const targetSeconds = await SecondsFromUser(); 
    console.log("🚀 Countdown started! 🚀"); 
    startCountdown(targetSeconds);
}

main();
