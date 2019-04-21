const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const database = require('./database')

// Local strategy for authentication by Passeport
passport.use(new Strategy(
    (username, password, done) => {
        const query = ` SELECT id, username, password
                        FROM users
                        WHERE username = ?`
        database.query(query, username, (err, results) => {
            if (err) {
                return done(err)
            }
            const user = results[0]
            if (!user) {
                return done(null, false)
            }
            bcrypt.compare(password, user.password, (err, passwordCheck) => {
                if (err) {
                    return done(err)
                }
                if (!passwordCheck) {
                    return done(null, false)
                }
                return done(null, user)
            })
        })
    }
))

// Save user id in the session during the authentication
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Retrieve complete user data when an already authenticated user connects
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.deserializeUser((id, done) => {
    const query = ` SELECT *
                    FROM users
                    WHERE id = ?`
    database.query(query, id, (err, results) => {
        if (err) {
            return done(err)
        }
        const user = results[0]
        done(null, user)
    })
})

module.exports = passport