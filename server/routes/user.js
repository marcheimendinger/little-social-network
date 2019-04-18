/**
 * User API
 */

const database = require('../config')
const bcrypt = require('bcrypt')

module.exports = (router) => {

    /**
     * Register a new user
     * 
     * @url /register
     * @json "username",
     *  "first_name",
     *  "last_name",
     *  "email",
     *  "password",
     *  "birth_date",
     *  "gender",
     *  "location",
     *  "description"
     */
    router.post('/register', (req, res) => {
        let user = req.body
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.send({'Error: ': err})
            } else {
                user.password = hash
                const query = 'INSERT INTO users SET ?'
                database.query(query, user, (err, status) => {
                    if (err) {
                        res.send({'Err: ': err})
                    } else {
                        res.redirect('/')
                    }
                })
            }
        })
    })

    /**
     * Get all informations from a user
     * 
     * @url /user/:id
     */
    router.get('/:id', (req, res) => {
        const id = req.params.id
        const query = 'SELECT * FROM users WHERE id=?'
        database.query(query, id, (err, data) => {
            if (err) {
                res.send({'Error': err})
            } else {
                // Remove the password from the sent data
                delete data[0].password
                res.send(data[0])
            }
        })
    })

    return router
    
}