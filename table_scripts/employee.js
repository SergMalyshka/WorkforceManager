class Employee {
    constructor(db) {
        this.db = db;
    }
    
    getAll() {
        return new Promise((resolve) => {
            this.db.query('SELECT * FROM employee', function (err, result) {
                resolve(result);
            })
        });
    }

    async viewAll() {
        const result = await this.getAll();
        console.table(result)
    }
}

module.exports = Employee;