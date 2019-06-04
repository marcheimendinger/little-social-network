const mysql = require('mysql2/promise')

// Database connection credentials
const config = {
    host: '',
    user: '',
    password: '',
    database: '',
    port: 8889,
    multipleStatements: true // For the tests
}

// Create a MySQL pool
const pool = mysql.createPool(config)

module.exports = pool