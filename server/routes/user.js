const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const tools = require('../tools')
const database = require('../database')

module.exports = (passport) => {

    // Register a new user
    router.post('/register', (req, res) => {
        let user = req.body
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send({'error': err})
            }
            user.password = hash
            const query = `INSERT INTO users SET ?`
            database.query(query, user, (err, results) => {
                if (err) {
                    return res.status(500).send({'error': err})
                }
                // Automatically trigger Passport authentication
                user.id = results.insertId
                req.login(user, (err) => {
                    if (err) {
                        return res.status(500).send({'error': err})
                    }
                    return res.send({'success': true})
                })
            })
        })
    })

    // Login a user
    // If accepted, creation of a session and cookie
    router.post('/login', passport.authenticate('local'), (req, res) => {
        return res.send({'success': true})
    })

    // Logout the authenticated user (clear the session)
    router.get('/logout', tools.isAuthenticated, (req, res) => {
        req.logout()
        return res.send({'success': true})
    })

    // Update informations of authenticated user
    router.post('/update', tools.isAuthenticated, (req, res) => {
        let newInformations = req.body

        // Prevent update of 'id' and 'created' fields
        delete(newInformations.id)
        delete(newInformations.created)

        bcrypt.hash(newInformations.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send({'error': err})
            }
            newInformations.password = hash
            const query = ` UPDATE users
                            SET ?
                            WHERE id = ?`
            database.query(query, [newInformations, req.user.id], (err, results) => {
                if (err) {
                    return res.status(500).send({'error': err})
                }
                return res.send({'success': true})
            })
        })
    })

    // Get all informations from a given user
    router.get('/view/:user_id', tools.isAuthenticated, (req, res) => {
        let id = req.params.user_id
        let columns = 'id, username, first_name, last_name, birth_date, gender, location, description, created'
        // If parameter is 'me', get the authenticated user's id and add email data to the query
        if (id == 'me') {
            id = req.user.id
            // columns = 'id, username, first_name, last_name, email, birth_date, gender, location, description, created'
            columns += ', email'
        }
        const query = ` SELECT ${columns}
                        FROM users
                        WHERE id = ?`
        database.query(query, id, (err, results) => {
            if (err) {
                return res.status(500).send({'error': err})
            }
            const user = results[0]
            return res.send(user)
        })
    })

    // Get a list of users with 'username', 'first_name' or 'last_name' corresponding to 'search_content'
    router.get('/search/:search_content', tools.isAuthenticated, (req, res) => {
        // TODO : Change the way the '%' are appended to searchContent
        // TODO : Add 'friend' boolean to know if user is a friend of the authenticated user
        // TODO : Order the list with authenticated user's friends at the beginning
        const searchContent = '%' + req.params.search_content + '%'
        const query = ` SELECT id, username, first_name, last_name, birth_date, gender, location, description, created
                        FROM users
                        WHERE username LIKE ? OR first_name LIKE ? OR last_name LIKE ?
                        LIMIT 25`
        database.query(query, [searchContent, searchContent, searchContent], (err, results) => {
            if (err) {
                return res.status(500).send({'error': err})
            }
            return res.send(results)
        })
    })

    return router
    
}