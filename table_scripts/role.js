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

    async viewAll() {
        const result = await this.getAll();
        console.table(result)
    }
}

module.exports = Role;