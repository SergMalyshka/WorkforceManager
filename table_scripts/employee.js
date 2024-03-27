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
}

module.exports = Employee;