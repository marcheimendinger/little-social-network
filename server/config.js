const mysql = require('mysql')

/**
 * Database connection credentials
 */
// const config = {
//     host: '10.194.69.15',
//     user: 'A9',
//     password: 'Vp5iMiD6FM7ZzxGx',
//     database: 'A9',
// }
const config = {
    host: '127.0.0.1',
    user: 'projet_transversal_1',
    password: 'projet_transversal_1',
    database: 'projet_transversal_1',
    port: 8889
}

/**
 * Create a MySQL pool
 */
const pool = mysql.createPool(config)

module.exports = pool