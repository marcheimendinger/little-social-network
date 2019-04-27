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
    let paging = req.body.paging * 10 // [0..n]
    if (!req.body.paging) {
        paging = 0
    }
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

// Get a list of posts from a given user (an authenticated user's friend)
router.get('/by/:user_id', tools.isAuthenticated, (req, res) => {
    const userId = req.params.user_id
    let paging = req.body.paging * 10 // [0..n]
    if (!req.body.paging) {
        paging = 0
    }
    const connectedUserId = req.user.id

    // Check if the given user is friend with the authenticated one
    const queryFriendshipCheck = `  SELECT *
                                    FROM friends
                                    WHERE (user_one_id = ? AND user_two_id = ?)
                                    OR (user_one_id = ? AND user_two_id = ?)
                                    AND accepted = true`
    database.query(queryFriendshipCheck, [userId, connectedUserId, connectedUserId, userId], (err, results) => {
        if (err) {
            return res.status(500).send({'error': err})
        }
        if (!results[0]) {
            return res.status(500).send({'error': 'The two users are not friends.'})
        }

        // Main query to get the posts list
        const query = ` SELECT
                            post_user_id,
                            share_user_id,
                            post_id,
                            content,
                            created
                        FROM
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
                                NULL AS share_user_id,
                                content,
                                created
                            FROM posts
                        ) AS posts
                        WHERE
                            (post_user_id = ? AND share_user_id IS NULL) OR
                            share_user_id = ?
                        ORDER BY created DESC
                        LIMIT 10 OFFSET ?`
        database.query(query, [userId, userId, paging], (err, results) => {
            if (err) {
                return res.status(500).send({'error': err})
            }
            return res.send(results)
        })

    })
})

module.exports = router