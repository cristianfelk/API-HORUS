const { Pool } = require('pg')

const pool = new Pool ({
    user: 'admin',
    host: 'localhost',
    database: 'APP_SECRETARIA',
    password: 'admin',
    port: 5434
})

module.exports = { query: (text , params) => pool.query(text, params) }