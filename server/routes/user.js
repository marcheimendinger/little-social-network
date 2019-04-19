/**
 * User API
 * 
 * @url '/user'
 */

const tools = require('../tools')
const database = require('../database')
const bcrypt = require('bcrypt')

module.exports = (router, passport) => {

    // Register a new user
    router.post('/register', (req, res) => {
        let user = req.body
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send({'error': err})
            }
            user.password = hash
            const query = 'INSERT INTO users SET ?'
            database.query(query, user, (err, status) => {
                if (err) {
                    return res.status(500).send({'error': err})
                }
                return res.send({'success': true})
                // BUG
                // Automatically trigger Passport authentication
                // req.login(user, (err) => {
                //     if (err) {
                //         return res.status(500).send({'error': err})
                //     }
                //     return res.send({'success': true})
                // })
            })
        })
    })

    // Login a user
    // If accepted, creation of a session and cookie
    router.post('/login', passport.authenticate('local'), (req, res) => {
        return res.send({'success': true})
    })

    // Logout a user (clear the session)
    router.get('/logout', (req, res) => {
        req.logout()
        return res.send({'success': true})
    })

    // Get all informations from a given user
    router.get('/view/:user_id', tools.isAuthenticated, (req, res) => {
        const id = req.params.user_id
        const query = 'SELECT id, username, first_name, last_name, birth_date, gender, location, description, created FROM users WHERE id=?'
        database.query(query, id, (err, data) => {
            if (err) {
                return res.status(500).send({'error': err})
            }
            return res.send(data[0])
        })
    })

    return router
    
}