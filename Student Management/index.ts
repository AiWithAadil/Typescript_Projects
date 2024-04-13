#! /usr/bin/env node

import inquirer from 'inquirer';

// Interface for a students data structure
interface StudentData {
    id: number;
    name: string;
    courses: string[];
    balance: number;
}

// Store student data in an array
let student_data: StudentData[] = [];

class Student {
    // Constructor to initialize student properties
    constructor(public id: number, public name: string, public courses: string[], public balance: number) {}

    // Method to add a new student
    static AddStudent(id: number, name: string, courses: string[], balance: number) {
        const newStudent = new Student(id, name, courses, balance);
        student_data.push(newStudent);
        console.log(`Student with ID ${id} added successfully.`);
    }

    // Method to update a students information
    static async UpdateStudent(id: number) {
        const studentIndex = student_data.findIndex(student => student.id === id);

        if (studentIndex === -1) {
            console.log(`Student with ID ${id} not found.`);
            return;
        }

        while (true) {
            const { update } = await inquirer.prompt({
                type: 'list',
                name: 'update',
                message: 'Select an option to update:',
                choices: ['Name', 'Courses', 'Balance', 'Quit']
            });

            if (update === 'Quit') {
                console.log('Exiting update process...');
                break;
            }

            switch (update) {
                case 'Name':
                    const { newName } = await inquirer.prompt({
                        type: 'input',
                        name: 'newName',
                        message: 'Enter new name:'
                    });
                    student_data[studentIndex].name = newName;
                    console.log('Name updated successfully.');
                    break;
                case 'Courses':
                    const { newCourses } = await inquirer.prompt({
                        type: 'input',
                        name: 'newCourses',
                        message: 'Enter new courses (comma-separated):'
                    });
                    const trimmedCourses: string[] = newCourses.split(',').map((course: string) => course.trim());
                    student_data[studentIndex].courses = trimmedCourses;
                    console.log('Courses updated successfully.');
                    break;
                case 'Balance':
                    const { newBalance } = await inquirer.prompt({
                        type: 'number',
                        name: 'newBalance',
                        message: 'Enter new balance:'
                    });
                    student_data[studentIndex].balance = newBalance;
                    console.log('Balance updated successfully.');
                    break;
            }
        }
    }

    // Method to display student information based on ID
    static DisplayStudent(id: number) {
        const student = student_data.find(student => student.id === id);

        if (student) {
            console.log(`Student Information for ID ${id}:`);
            console.log(`Name: ${student.name}`);
            console.log(`Courses: ${student.courses.join(', ')}`);
            console.log(`Balance: $${student.balance}`);
        } else {
            console.log(`Student with ID ${id} not found.`);
        }
    }
}
// main function were we add all data
async function main() {
    while (true) {
        const { main } = await inquirer.prompt({
            type: 'list',
            name: 'main',
            message: 'Select one option you want to do',
            choices: ['Add Student', 'Update Student', 'View Student', 'Exit']
        });

        if (main === 'Add Student') {
            const { id, name, courses, balance } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'id',
                    message: 'Enter ID:'
                },
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter name:'
                },
                {
                    type: 'input',
                    name: 'courses',
                    message: 'Enter courses (comma-separated):'
                },
                {
                    type: 'number',
                    name: 'balance',
                    message: 'Enter balance:'
                }
            ]);

            const trimmedCourses: string[] = courses.split(',').map((course: string) => course.trim());
            Student.AddStudent(id, name, trimmedCourses, balance);
        } else if (main === 'Update Student') {
            const { uid } = await inquirer.prompt({
                type: 'number',
                name: 'uid',
                message: 'Enter ID of student you want to update:'
            });

            await Student.UpdateStudent(uid);
        } else if (main === 'View Student') {
            const { vid } = await inquirer.prompt({
                type: 'number',
                name: 'vid',
                message: 'Enter ID of student you want to view:'
            });

            Student.DisplayStudent(vid);
        } else if (main === 'Exit') {
            console.log('Thanks for using the student management system.');
            break;
        }
    }
}

main();
