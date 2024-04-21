const inquirer = require('inquirer');
class Role {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return new Promise((resolve) => {
            this.db.query('SELECT role.id, role.title, role.salary, department.name as Department FROM role INNER JOIN department ON role.department_id = department.id', function (err, result) {
                resolve(result);
            })
        });
    }

    async delete() {
        const allRoles = await this.getAll();
        const roleNames = allRoles.map((role) => role.title)
        const response = await inquirer.prompt([
            {
                type: "list",
                message: "What role would you like to delete?",
                name: "name",
                choices: roleNames
            }
        ])

        return new Promise((resolve) => {
            this.db.query(`DELETE FROM role WHERE title="${response.name}"`, function (err, result) {
                resolve(result);
                if(result.affectedRows === 1) {
                    console.log(`Successfully deleted ${response.name}`)
                }
            })
        });
    }

    async createRole(department) {
        const departments = await department.getAll();
        const deptChoices = departments.map((dept) => dept.name)

        const response = await inquirer.prompt([
            {
                type: "input",
                message: `What is the roles name?`,
                name: "title",
            },
            {
                type: "input",
                message: "What is the role's salary?",
                name: "salary"
            },
            {
                type: "list",
                message: "What department does the role belong to",
                name: "deptId",
                choices: deptChoices
            }
        ]);

        const deptId = departments.find(department => department.name === response.deptId).id

        return new Promise((resolve) => {
            const query = `INSERT INTO role (title, salary, department_id)
                            VALUES ("${response.title}", ${response.salary}, ${deptId})`
            this.db.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Added a new role: ${response.title}`)
                    resolve(true)
                }
            })
        });
    }
}

module.exports = Role;