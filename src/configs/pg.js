const { Pool } = require('pg')

const pool = new Pool ({
    user: 'admin',
    host: 'localhost',
    database: 'forumhorusdoec',
    password: 'admin',
    port: 5433
})

module.exports = { query: (text , params) => pool.query(text, params) }