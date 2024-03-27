const inquirer = require('inquirer');
class Role {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return new Promise((resolve) => {
            this.db.query('SELECT * FROM role', function (err, result) {
                resolve(result);
            })
        });
    }

    async createRole() {
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
                type: "input",
                message: "What department ID does the role belong to",
                name: "deptId"
            }
        ]);

        return new Promise((resolve) => {
            const query = `INSERT INTO role (title, salary, department_id)
                            VALUES ("${response.title}", ${response.salary}, ${response.deptId})`
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