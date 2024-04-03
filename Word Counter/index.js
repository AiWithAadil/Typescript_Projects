#! /usr/bin/env node
import inquirer from "inquirer";
let user = await inquirer.prompt([
    {
        type: "string",
        name: "paragraph",
        message: "Enter paragraph: "
    }
]);
function countWord(sentance) {
    let words = sentance.split(" ");
    console.log(`"${sentance}":In this paragraph, there are ${words.length} words`);
}
countWord(user.paragraph);
