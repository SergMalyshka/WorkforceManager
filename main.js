const Employee = require("./table_scripts/employee")
const Role = require("./table_scripts/role")
const Department = require("./table_scripts/department");
const inquirer = require('inquirer');


const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '9541616aa',
        database: 'workplace_db'
    },
    console.log(`Connected to the workplace_db database.`)
);

const employee = new Employee(db);
const role = new Role(db);
const department = new Department(db);

function ascii() {
    console.log(" __        __         _          _                  __  __                                   \r\n \\ \\      \/ \/__  _ __| | ___ __ | | __ _  ___ ___  |  \\\/  | __ _ _ __   __ _  __ _  ___ _ __ \r\n  \\ \\ \/\\ \/ \/ _ \\| \'__| |\/ \/ \'_ \\| |\/ _` |\/ __\/ _ \\ | |\\\/| |\/ _` | \'_ \\ \/ _` |\/ _` |\/ _ \\ \'__|\r\n   \\ V  V \/ (_) | |  |   <| |_) | | (_| | (_|  __\/ | |  | | (_| | | | | (_| | (_| |  __\/ |   \r\n    \\_\/\\_\/ \\___\/|_|  |_|\\_\\ .__\/|_|\\__,_|\\___\\___| |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|   \r\n                          |_|                                                |___\/           ")
    prompts();
}
ascii();

function prompts() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', "Quit"]
        },
    ])
        .then((response) =>
            handleChoice(response))
}

async function handleChoice(response) {
    if (response.choice === "Quit") {
        process.exit();
    }
    if (response.choice === "View All Departments") {
        await department.viewAll();
    } else if (response.choice === "View All Roles") {
        await role.viewAll();
    } else if (response.choice === "View All Employees") {
        await employee.viewAll();
    }
    prompts();
}

app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });





