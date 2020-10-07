const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgresql',
    password: 'postgresql',
    host: 'localhost',
    port: 5432,
    database: 'my_teacher'
})