const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const tools = require('../tools')
const database = require('../database')

module.exports = (passport) => {

    // Register a new user
    router.post('/register', async (req, res) => {
        try {
            let user = req.body

            user = tools.emptyStringToNull(user)

            if (!user.password) {
                throw 'The password field is required'
            }
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash

            const query = `INSERT INTO users SET ?`
            const [results] = await database.query(query, [user])
    
            // Automatically trigger Passport authentication
            user.id = results.insertId
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).send({'error': err})
                }
                res.send({'success': true})
            })
        } catch (err) {
            res.status(500).send({'error': err})
        }
    })

    // Login a user
    // If accepted, creation of a session and cookie
    router.post('/login', passport.authenticate('local'), (req, res) => {
        res.send({'success': true})
    })

    // Logout the authenticated user (clear the session)
    router.get('/logout', tools.isAuthenticated, (req, res) => {
        req.logout()
        res.send({'success': true})
    })

    // Update informations of authenticated user
    router.post('/update', tools.isAuthenticated, async (req, res) => {
        try {
            let newInformations = req.body

            // Prevent update of 'id' and 'created' fields
            delete(newInformations.id)
            delete(newInformations.created)

            newInformations = tools.emptyStringToNull(newInformations)

            if (newInformations.password) {
                const hash = await bcrypt.hash(newInformations.password, 10)
                newInformations.password = hash
            }

            const query = ` UPDATE users
                            SET ?
                            WHERE id = ?`
            await database.query(query, [newInformations, req.user.id])

            res.send({'success': true})
        } catch (err) {
            res.status(500).send({'error': err})
        }
    })

    // Get all informations from a given user
    router.get('/view', tools.isAuthenticated, async (req, res) => {
        try {
            let id = req.query.user_id
            let columns = 'id, username, first_name, last_name, birth_date, gender, location, description, created'

            // If parameter is 'me', get the authenticated user's id and add email data to the query
            if (id == 'me') {
                id = req.user.id
                columns += ', email'
            }

            const query = ` SELECT ${columns}
                            FROM users
                            WHERE id = ?`
            const [results] = await database.query(query, [id])
            const user = results[0]

            res.send(user)
        } catch (err) {
            res.status(500).send({'error': err})
        }
    })

    // Get a list of users with 'username', 'first_name' or 'last_name' corresponding to 'search_content'
    // TODO : Change the way the '%' are appended to searchContent
    // TODO : Add 'friend' boolean to know if user is a friend of the authenticated user
    // TODO : Order the list with authenticated user's friends at the beginning
    router.get('/search', tools.isAuthenticated, async (req, res) => {
        try {
            const searchContent = '%' + req.query.search_content + '%'
            const query = ` SELECT
                                id,
                                username,
                                first_name,
                                last_name,
                                birth_date,
                                gender,
                                location,
                                description,
                                created
                            FROM users
                            WHERE username LIKE ? OR first_name LIKE ? OR last_name LIKE ?
                            LIMIT 25`
            const [results] = await database.query(query, [searchContent, searchContent, searchContent])
            res.send(results)
        } catch (err) {
            res.status(500).send({'error': err})
        }
    })

    return router
    
}