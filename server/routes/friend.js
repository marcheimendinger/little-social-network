const express = require('express')
const router = express.Router()

const tools = require('../tools')
const database = require('../database')

// Get a list of the friends of a given user
router.get('/view/:user_id', tools.isAuthenticated, (req, res) => {
    const id = req.params.user_id
    const connectedUserId = req.user.id
    const query = ` SELECT id, username, first_name, last_name, birth_date, gender, location, description, users.created
                    FROM friends
                    LEFT JOIN users ON id = user_one_id OR id = user_two_id
                    WHERE (id != ? AND id != ?) AND (user_one_id = ? OR user_two_id = ?) AND accepted = true`
    database.query(query, [id, connectedUserId, id, id], (err, results) => {
        // TODO : Add a condition to return an error if the given user is not a friend of the authenticated user
        if (err) {
            return res.status(500).send({'error': err})
        }
        return res.send(results)
    })
})

// Get a list of mutual friends between a given user and the connected one
// https://stackoverflow.com/questions/36096713/finding-mutual-friend-sql
router.get('/mutuals/:user_id', tools.isAuthenticated, (req, res) => {
    const id = req.params.user_id
    const connectedUserId = req.user.id
    const query = ` SELECT id, username, first_name, last_name, birth_date, gender, location, description, created
                    FROM
                    (
                        SELECT user_one_friend.friend_id FROM
                        (
                            SELECT user_one_id friend_id FROM friends WHERE user_two_id = ? AND accepted = true
                            UNION 
                            SELECT user_two_id friend_id FROM friends WHERE user_one_id = ? AND accepted = true
                        ) AS user_one_friend
                        JOIN
                        (
                            SELECT user_one_id friend_id FROM friends WHERE user_two_id = ? AND accepted = true
                            UNION 
                            SELECT user_two_id friend_id FROM friends WHERE user_one_id = ? AND accepted = true
                        ) AS user_two_friend
                        ON user_one_friend.friend_id = user_two_friend.friend_id
                    ) AS friends
                    LEFT JOIN users ON users.id = friends.friend_id`
    database.query(query, [id, id, connectedUserId, connectedUserId], (err, results) => {
        if (err) {
            return res.status(500).send({'error': err})
        }
        return res.send(results)
    })
})

module.exports = router