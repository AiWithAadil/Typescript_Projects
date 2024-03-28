#! /usr/bin/env node
import inquirer from "inquirer";
let TodoList = []; // This is for TODO LIST Storage
// This is main function of TODO LIST
async function start() {
    while (true) {
        let choices = await inquirer.prompt([
            {
                type: "list",
                name: "todo",
                message: "Enter choice you want to do:",
                choices: ["ADD", "DELETE", "UPDATE", "VIEW", "EXIT"]
            }
        ]);
        if (choices.todo === "ADD") {
            await add();
        }
        else if (choices.todo === "DELETE") {
            await Delete();
        }
        else if (choices.todo === "UPDATE") {
            await Update();
        }
        else if (choices.todo === "VIEW") {
            console.log("THIS IS YOUR LIST");
            console.log(`${TodoList}`);
            console.log("Thank you");
        }
        else if (choices.todo === "EXIT") {
            break;
        }
        else {
            console.log("Invalid choice");
        }
    }
}
async function add() {
    while (true) {
        let addItems = await inquirer.prompt([
            {
                type: "input",
                name: "add",
                message: "Enter item you want to add or enter (q) to quit:" // q is for quit function which stop while loop
            }
        ]);
        if (addItems.add === "q") {
            console.log("Thanks");
            break;
        }
        else if (addItems.add) {
            TodoList.push(addItems.add);
            console.log("Item added to the list.");
        }
        else {
            console.log("Invalid input");
        }
    }
}
async function Delete() {
    while (true) {
        let DeleteItems = await inquirer.prompt([
            {
                type: "list",
                name: "delete",
                message: "Select Item you want to delete:",
                choices: [...TodoList, "Exit"]
            }
        ]);
        let deleteItem = DeleteItems.delete;
        if (deleteItem === "Exit") {
            break;
        }
        else {
            TodoList = TodoList.filter(item => item !== deleteItem);
            console.log(`Item "${deleteItem}" has been deleted.`);
            console.log("Updated Todo List:", TodoList);
        }
    }
}
async function Update() {
    while (true) {
        let updateItems = await inquirer.prompt([
            {
                type: "list",
                name: "update1",
                message: "Select item to update:",
                choices: [...TodoList, "Exit"]
            },
            {
                type: "input",
                name: "update2",
                message: "Enter updated value (q) for quit:" // q is for quit function which stop while loop
            }
        ]);
        if (updateItems.update1 === "Exit" && updateItems.update2 === "q") {
            console.log("Thanks");
            break;
        }
        else {
            let updateIndex = TodoList.indexOf(updateItems.update1);
            if (updateIndex !== -1) {
                TodoList[updateIndex] = updateItems.update2;
                console.log(`Item "${updateItems.update1}" has been updated to "${updateItems.update2}".`);
                console.log("Updated Todo List:", TodoList);
            }
            else {
                console.log("Item not found in the list.");
            }
        }
    }
}
start();
