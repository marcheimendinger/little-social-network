const express = require('express')
const router = express.Router()

const tools = require('../tools')
const database = require('../database')
const watson = require('../watson')

// Analyse a given text (in french) and return a string containing the most probable tone
// Possibilities : 'anger', 'fear', 'joy', 'sadness', 'analytical', 'confident' or 'tentative'
// If no tone found, return null
const askWatson = async (text) => {
    try {
        const results = await watson.tone({
            tone_input: text,
            content_type: 'text/plain',
            content_language: 'fr',
            sentences: false
        })
        const tones = results.document_tone.tones
        console.log(tones)

        // No tone found
        if (!tones[0]) {
            return null
        }

        // Select the tone with the highest score above 0.6
        let bestTone = {
            score: 0.6,
            tone_id: null
        }
        for (let tone of tones) {
            if (tone.score > bestTone.score) {
                bestTone.score = tone.score
                bestTone.tone_id = tone.tone_id
            }
        }

        return bestTone.tone_id
    } catch (err) {
        console.log(err)
        return null
    }
}

// Publish a post with the authenticated user as the author
router.post('/publish', tools.isAuthenticated, async (req, res) => {
    try {
        const connectedUserId = req.user.id
        const postContent = req.body.post_content

        const tone = await askWatson(postContent)

        const query = ` INSERT INTO posts (user_id, content, tone) VALUES (?, ?, ?)`
        await database.query(query, [connectedUserId, postContent, tone])

        res.send({'success': true})
    } catch (err) {
        res.status(500).send({'error': err})
    }
})

// Check if a post ('postId') is already shared by a user ('userId')
const isSharedBy = async (postId, userId) => {
    const query = ` SELECT *
                    FROM shares
                    WHERE user_id = ? AND post_id = ?`
    const [results] = await database.query(query, [userId, postId])

    return results[0] ? true : false
}

// Get latest posts and shares from authenticated user's friends
router.get('/feed', tools.isAuthenticated, async (req, res) => {
    try {
        const connectedUserId = req.user.id
        let paging = req.query.paging * 10 // [0..n]
        if (!req.query.paging) {
            paging = 0
        }

        const query = ` SELECT
                            DISTINCT posts.post_user_id,
                            postUsers.username AS post_username,
                            postUsers.first_name AS post_first_name,
                            postUsers.last_name AS post_last_name,
                            posts.share_user_id,
                            shareUsers.username AS share_username,
                            shareUsers.first_name AS share_first_name,
                            shareUsers.last_name AS share_last_name,
                            posts.post_id,
                            posts.content,
                            posts.tone,
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
                                posts.tone,
                                shares.created
                            FROM shares
                            LEFT JOIN posts ON shares.post_id = posts.id
                            UNION
                            SELECT
                                id AS post_id,
                                user_id AS post_user_id,
                                null AS share_user_id,
                                content,
                                tone,
                                created
                            FROM posts
                        ) AS posts
                        LEFT JOIN users AS postUsers ON post_user_id = postUsers.id
                        LEFT JOIN users AS shareUsers ON share_user_id = shareUsers.id
                        WHERE
                            userFriends.user_one_id = post_user_id OR
                            userFriends.user_two_id = post_user_id OR
                            userFriends.user_one_id = share_user_id OR
                            userFriends.user_two_id = share_user_id
                        ORDER BY posts.created DESC
                        LIMIT 10 OFFSET ?`
        let [results] = await database.query(query, [connectedUserId, connectedUserId, paging])

        // Add 'shared' boolean parameter to know if the authenticated user has already shared each post
        for (let value of results) {
            value.shared = await isSharedBy(value.post_id, connectedUserId)
        }

        res.send(results)
    } catch (err) {
        res.status(500).send({'error': err})
    }
})

// Get a list of posts from a given user (an authenticated user's friend)
router.get('/by', tools.isAuthenticated, async (req, res) => {
    try {
        const connectedUserId = req.user.id
        let userId = req.query.user_id
        let paging = req.query.paging * 10 // [0..n]
        if (!req.query.paging) {
            paging = 0
        }

        if (userId == 'me') {
            // If parameter is 'me', get the authenticated user's id
            userId = connectedUserId
        } else {
            // Check if the given user is friend with the authenticated one
            const checkFriendship = await tools.isFriendWith(connectedUserId, userId)
            if (!checkFriendship) {
                throw 'You are not friend with this user'
            }
        }

        // Main query to get the posts list
        const query = ` SELECT
                            post_user_id,
                            postUsers.username AS post_username,
                            postUsers.first_name AS post_first_name,
                            postUsers.last_name AS post_last_name,
                            share_user_id,
                            shareUsers.username AS share_username,
                            shareUsers.first_name AS share_first_name,
                            shareUsers.last_name AS share_last_name,
                            post_id,
                            content,
                            tone,
                            posts.created
                        FROM
                        (
                            SELECT
                                posts.id AS post_id,
                                posts.user_id AS post_user_id,
                                shares.user_id AS share_user_id,
                                posts.content,
                                posts.tone,
                                shares.created
                            FROM shares
                            LEFT JOIN posts ON shares.post_id = posts.id
                            UNION
                            SELECT
                                id AS post_id,
                                user_id AS post_user_id,
                                NULL AS share_user_id,
                                content,
                                tone,
                                created
                            FROM posts
                        ) AS posts
                        LEFT JOIN users AS postUsers ON post_user_id = postUsers.id
                        LEFT JOIN users AS shareUsers ON share_user_id = shareUsers.id
                        WHERE
                            (post_user_id = ? AND share_user_id IS NULL) OR
                            share_user_id = ?
                        ORDER BY created DESC
                        LIMIT 10 OFFSET ?`
        let [results] = await database.query(query, [userId, userId, paging])

        // Add 'shared' boolean parameter to know if the authenticated user has already shared each post
        for (let value of results) {
            value.shared = await isSharedBy(value.post_id, connectedUserId)
        }

        res.send(results)
    } catch (err) {
        res.status(500).send({'error': err})
    }
})

// Share a post with the authenticated user as the author from the share
router.post('/share', tools.isAuthenticated, async (req, res) => {
    try {
        const connectedUserId = req.user.id
        const postId = req.body.post_id
        const query = `INSERT INTO shares (user_id, post_id) VALUES (?, ?)`

        await database.query(query, [connectedUserId, postId])

        res.send({'success': true})
    } catch (err) {
        res.status(500).send({'error': err})
    }
})

module.exports = router