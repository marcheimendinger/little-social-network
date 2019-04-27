const express = require('express')
const router = express.Router()

const tools = require('../tools')
const database = require('../database')

// Publish a post with the authenticated user as the author
router.post('/publish', tools.isAuthenticated, (req, res) => {
    const connectedUserId = req.user.id
    const postContent = req.body.post_content
    const query = ` INSERT INTO posts (user_id, content) VALUES (?, ?)`
    database.query(query, [connectedUserId, postContent], (err, results) => {
        if (err) {
            return res.status(500).send({'error': err})
        }
        return res.send({'success': true})
    })
})

// Get latest posts and shares from authenticated user's friends
router.get('/feed', tools.isAuthenticated, (req, res) => {
    const connectedUserId = req.user.id
    const paging = req.body.paging * 10 // [0..n]
    const query = ` SELECT
                        DISTINCT posts.post_user_id,
                        posts.share_user_id,
                        posts.post_id,
                        posts.content,
                        posts.created
                    FROM
                    (
                        SELECT
                            user_one_id,
                            user_two_id
                        FROM friends
                        WHERE (user_one_id = ? OR user_two_id = ?) AND accepted = true
                    ) AS userFriends
                    JOIN
                    (
                        SELECT
                            posts.id AS post_id,
                            posts.user_id AS post_user_id,
                            shares.user_id AS share_user_id,
                            posts.content,
                            shares.created
                        FROM shares
                        LEFT JOIN posts ON shares.post_id = posts.id
                        UNION
                        SELECT
                            id AS post_id,
                            user_id AS post_user_id,
                            null AS share_user_id,
                            content,
                            created
                        FROM posts
                    ) AS posts
                    WHERE
                    userFriends.user_one_id = posts.post_user_id OR
                    userFriends.user_two_id = posts.post_user_id
                    ORDER BY posts.created DESC
                    LIMIT 10 OFFSET ?`
    database.query(query, [connectedUserId, connectedUserId, paging], (err, results) => {
        if (err) {
            return res.status(500).send({'error': err})
        }
        return res.send(results)
    })

})

module.exports = router