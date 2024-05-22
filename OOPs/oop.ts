import inquirer from 'inquirer';

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];

    addStudent(student: Student) {
        this.students.push(student);
    }
}

const persons = new Person();

async function Start(person: Person) {
    while (true) {
        console.log('Welcome');

        const pic = await inquirer.prompt([
            {
                type: "list",
                name: "select",
                message: "Select a person you want to talk with:",
                choices: ["Staff", "Student", "List Students", "Exit"]
            }
        ]);

        if (pic.select === "Staff") {
            console.log("Hi, I am Staff.");
        } else if (pic.select === "Student") {
            const studentName = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Enter the student's name:",
                }
            ]);

            const student = person.students.find(val => val.name === studentName.name);

            if (!student) {
                const newStudent = new Student(studentName.name);
                person.addStudent(newStudent);
                console.log(`Student ${newStudent.name} added.`);
            } else {
                console.log(`Hi, I am ${student.name}.`);
            }

        } else if (pic.select === "List Students") {
            if (person.students.length > 0) {
                console.log('Current students:');
                person.students.forEach(student => console.log(student.name));
            } else {
                console.log('No students have been added yet.');
            }
        } else if (pic.select === "Exit") {
            console.log("Goodbye!");
            break;
        }
    }
}

Start(persons);
