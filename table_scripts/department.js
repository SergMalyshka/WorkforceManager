const inquirer = require('inquirer');

class Department {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return new Promise((resolve) => {
            this.db.query('SELECT * FROM department', function (err, result) {
                resolve(result);
            })
        });
    }

    async delete() {
        const allDepts = await this.getAll();
        const deptNames = allDepts.map((dept) => dept.name)
        const response = await inquirer.prompt([
            {
                type: "list",
                message: "What department would you like to delete?",
                name: "name",
                choices: deptNames
            }
        ])

        return new Promise((resolve) => {
            this.db.query(`DELETE FROM department WHERE name="${response.name}"`, function (err, result) {
                resolve(result);
                if(result.affectedRows === 1) {
                    console.log(`Successfully deleted ${response.name}`)
                }
            })
        });
    }

    async createDepartment() {
        const response =  await inquirer.prompt([
            {
                type: "input",
                message: `What is the departments name?`,
                name: "name",
            }
        ]);

        return new Promise((resolve) => {
            const query = `INSERT INTO department (name) VALUES ("${response.name}")`
            this.db.query(query, function (err, result) {
                if(err) {
                    console.log(err)
                } else {
                    console.log(`Added a new department: ${response.name}`)
                    resolve(true)
                }
            })
        });
    }
}

module.exports = Department;