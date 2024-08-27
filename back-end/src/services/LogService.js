const db = require('../configs/pg')

const getLog = async () => {
    const sql_get = `select * from log`
    return await db.query(sql_get)
}

module.exports = {
    getLog
};