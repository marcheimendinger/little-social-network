const express = require('express')
const router = express.Router()

module.exports = (app, passport) => {

    app.use(
        '/',
        require('./home')(router)
    )
    app.use(
        '/user',
        require('./user')(router, passport)
    )

    return router

}