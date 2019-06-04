const express = require('express')
const session = require('express-session')
const sessionFileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// Body parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Enable cross-origin resource sharing
app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
}))

// User authentication
const passport = require('./auth')

// Session
app.use(session({
    store: new sessionFileStore(),
    secret: 'the answer is 42',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false } // Let React access the cookie
}))

// Initialize Passport and restore authentication state from the session
app.use(passport.initialize())
app.use(passport.session())

// Get the routes
app.use(require('./routes')(app, passport))

module.exports = app