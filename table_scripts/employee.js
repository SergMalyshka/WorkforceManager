const inquirer = require('inquirer');
class Employee {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return new Promise((resolve) => {
            this.db.query('SELECT a.id, a.first_name, a.last_name, d.name AS Department, r.title AS Role, r.salary, CONCAT(b.first_name, " ",b.last_name) AS Manager FROM employee AS a LEFT JOIN employee AS b ON a.manager_id = b.id INNER JOIN role AS r ON a.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id', function (err, result) {
                resolve(result);
            })
        });
    }


    async addEmployee(role) {

        const roleChoices = await role.getAll();
        const roleNames = roleChoices.map((role) => role.title)

        const managerChoices = await this.getAll();
        const managerNames = []
        const managerReferenceId = []

        for (const manager of managerChoices) {

            const fullName = `${manager.first_name} ${manager.last_name}`
            managerNames.push(fullName)

            const idReference = { fullName, id: manager.id }
            managerReferenceId.push(idReference)
        }

        managerNames.push("None")


        const response = await inquirer.prompt([
            {
                type: "input",
                message: `What is the employees's first name?`,
                name: "first",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "last"
            },
            {
                type: "list",
                message: "What is the employee's role",
                name: "title",
                choices: roleNames
            },
            {
                type: "list",
                message: "Who is the employee's manager",
                name: "managerName",
                choices: managerNames
            }
        ]);

        let managerId;

        if (response.managerName === "None") {
            managerId = "NULL"
        } else {
            managerId = managerReferenceId.find(item => item.fullName === response.managerName).id
        }

        const roleId = roleChoices.find(item => item.title === response.title).id


        return new Promise((resolve) => {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                VALUES ("${response.first}", "${response.last}", ${roleId}, ${managerId})`
            this.db.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Added a new employee: ${response.first} ${response.last}`)
                    resolve(true)
                }
            })
        });
    }



    async update(role) {

        const roleChoices = await role.getAll();
        const roleNames = roleChoices.map((role) => role.title)

        const employees = await this.getAll();
        const employeeChoices = []
        const employeesIdReference = []

        for (const employee of employees) {

            const fullName = `${employee.first_name} ${employee.last_name}`
            employeeChoices.push(fullName)

            const idReference = { fullName, id: employee.id }
            employeesIdReference.push(idReference)
        }

        const response = await inquirer.prompt([
            {
                type: "list",
                message: "Which employee would you like to update",
                name: "name",
                choices: employeeChoices,
            },
            {
                type: "list",
                message: "Which role would you like to assign them to?",
                name: "newRole",
                choices: roleNames
            }
        ])

        const roleId = roleChoices.find(item => item.title === response.newRole).id
        const employeeId = employeesIdReference.find(item => item.fullName === response.name).id

        return new Promise((resolve) => {
            const query = `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`
            this.db.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Role Updated`)
                    resolve(true)
                }
            })
        });

    }

}

module.exports = Employee;