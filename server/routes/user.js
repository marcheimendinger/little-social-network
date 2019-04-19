/**
 * User API
 * 
 * @url '/user'
 */

const database = require('../config')
const bcrypt = require('bcrypt')

module.exports = (router) => {

    /**
     * Register a new user
     * 
     * @url '/register'
     * @method post
     * @param "username" (required),
     *  "first_name" (required),
     *  "last_name" (required),
     *  "email" (required),
     *  "password" (required),
     *  "birth_date",
     *  "gender" ('m', 'f' or 'o'),
     *  "location",
     *  "description"
     */
    router.post('/register', (req, res) => {
        let user = req.body
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.send({'Error': err})
            } else {
                user.password = hash
                const query = 'INSERT INTO users SET ?'
                database.query(query, user, (err, status) => {
                    if (err) {
                        res.send({'Error': err})
                    } else {
                        res.send({'Confirmation': true})
                    }
                })
            }
        })
    })

    /**
     * Get all informations from a given user
     * 
     * @url '/view/:user_id'
     * @method get
     */
    router.get('/view/:user_id', (req, res) => {
        const id = req.params.user_id
        const query = 'SELECT id, username, first_name, last_name, birth_date, gender, location, description, created FROM users WHERE id=?'
        database.query(query, id, (err, data) => {
            if (err) {
                res.send({'Error': err})
            } else {
                res.send(data[0])
            }
        })
    })

    return router
    
}