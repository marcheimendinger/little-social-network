const express = require('express')
const router = express.Router()

const tools = require('../tools')
const database = require('../database')

// Get a list of the friends of a given user
router.get('/view/:user_id', tools.isAuthenticated, (req, res) => {
    const id = req.params.user_id
    const query = ` SELECT id, username, first_name, last_name, birth_date, gender, location, description, users.created
                    FROM friends
                    LEFT JOIN users ON id = user_one_id OR id = user_two_id
                    WHERE id != ? AND (user_one_id = ? OR user_two_id = ?)`
    database.query(query, [id, id, id], (err, results) => {
        // TODO : Add a filter to return an error if the given user is not a friend of the authenticated user
        if (err) {
            return res.status(500).send({'error': err})
        }
        // TODO : Remove the authenticated user from the list before sending it
        return res.send(results)
    })
})

module.exports = router