const express = require('express')
const router = express.Router()

module.exports = (app, passport) => {
    
    app.use(
        '/friend',
        require('./friend')
    )
    app.use(
        '/post',
        require('./post')
    )
    app.use(
        '/user',
        require('./user')(passport)
    )

    return router

}