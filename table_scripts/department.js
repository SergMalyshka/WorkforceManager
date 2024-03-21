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

    async viewAll() {
        const result = await this.getAll();
        console.table(result)
    }
}

module.exports = Department;