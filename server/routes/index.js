const express = require('express')
const router = express.Router()

module.exports = (app) => {

    app.use(
        '/',
        require('./home')(router)
    )
    app.use(
        '/user',
        require('./user')(router)
    )

    return router

}