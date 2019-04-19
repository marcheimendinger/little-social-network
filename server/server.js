const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()

// Port used by the server
const port = 3001

// Body parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// User authentication
const passport = require('./auth')

// Session
app.use(session({
    secret: 'the answer is 42',
    resave: false,
    saveUninitialized: false
}))

// Initialize Passport and restore authentication state from the session
app.use(passport.initialize())
app.use(passport.session())

// Get the routes
app.use(require('./routes')(app, passport))

// Start the server
const server = app.listen(port, () => {
    console.log(`Server running on port ${server.address().port} : http://localhost:${server.address().port}/`)
})