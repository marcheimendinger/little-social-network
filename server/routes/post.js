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

module.exports = router