// Packages
const mysql = require('mysql')

// Set database connection credentials
const config = {
    host: '10.194.69.15',
    user: 'A9',
    password: 'Vp5iMiD6FM7ZzxGx',
    database: 'A9',
}

// Create a MySQL pool
const pool = mysql.createPool(config)

// Export the pool
module.exports = pool