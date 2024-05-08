#! /usr/bin/env node
import inquirer from "inquirer";
async function quizz() {
    let questions = [
        "Which of the following is NOT a primitive data type in Python?",
        "What does HTML stand for?",
        "Which programming language is often used for data analysis and statistical computing?",
        "What is the capital of France?",
        "Which of the following is NOT a primary color?"
    ];
    let ans_choices = [
        "a) int  b) float  c) list  d) str",
        "a) Hyper Text Markup Language  b) Hyperlinks and Text Markup Language  c) Home Tool Markup Language  d) Hyper Transfer Markup Language",
        "a) Java  b) C++  c) Python  d) JavaScript",
        "a) Berlin  b) Paris  c) Rome  d) Madrid",
        "a) Red  b) Green  c) Yellow  d) White"
    ];
    let answers = ["c", "a", "c", "b", "d"];
    let user_data = { name: "", answers: [], score: 0 };
    let userName = await inquirer.prompt([
        {
            type: "input",
            name: "uname",
            message: "Enter your name"
        }
    ]);
    user_data.name = userName.uname;
    for (let i = 0; i < questions.length; i++) {
        let ans = await inquirer.prompt([
            {
                type: "list",
                name: "uans",
                message: `${questions[i]}\n${ans_choices[i]}`,
                choices: ['a', 'b', 'c', 'd']
            }
        ]);
        user_data.answers.push(ans.uans.toLowerCase());
    }
    console.log("User Answers:", user_data.answers);
    for (let i = 0; i < answers.length; i++) {
        if (user_data.answers[i] === answers[i]) {
            user_data.score++;
        }
    }
    console.log(`Dear ${user_data.name}, your scored ${user_data.score} out of ${questions.length}.`);
}
quizz();
