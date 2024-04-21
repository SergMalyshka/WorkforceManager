const Employee = require("./table_scripts/employee")
const Role = require("./table_scripts/role")
const Department = require("./table_scripts/department");
const inquirer = require('inquirer');

const mysql = require('mysql2');

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
}

function prompts() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Delete a Department',
                "Add a Role", "Delete a Role", "Add a new Employee", "Update Employee Role", "Quit"]
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
        console.table(await department.getAll());
    } else if (response.choice === "View All Roles") {
        console.table(await role.getAll());
    } else if (response.choice === "View All Employees") {
        console.table(await employee.getAll());
    } else if (response.choice === "Add a Department") {
        await department.createDepartment();
    } else if (response.choice === "Delete a Department") {
        await department.delete();
    } else if (response.choice === "Add a Role") {
        await role.createRole(department);
    } else if (response.choice === "Delete a Role") {
        await role.delete();
    } else if (response.choice === "Add a new Employee") {
        await employee.addEmployee(role)
    } else if (response.choice === "Update Employee Role") {
        await employee.update(role)
    }
    prompts();
}




ascii();
prompts();





