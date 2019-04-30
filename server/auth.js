const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const database = require('./database')

// Local strategy for authentication by Passeport
passport.use(new Strategy(
    async (username, password, done) => {
        try {
            const query = ` SELECT id, username, password
                            FROM users
                            WHERE username = ?`
            const [results] = await database.query(query, [username])

            const user = results[0]
            if (!user) {
                return done(null, false)
            }

            const passwordCheck = await bcrypt.compare(password, user.password)
            if (!passwordCheck) {
                return done(null, false)
            }

            done(null, user)
        } catch (err) {
            done(null, false)
        }
    }
))

// Save user id in the session during the authentication
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Retrieve complete user data when an already authenticated user connects
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.deserializeUser(async (id, done) => {
    try {
        const query = ` SELECT *
                        FROM users
                        WHERE id = ?`
        const [results] = await database.query(query, [id])
        const user = results[0]
        
        done(null, user)
    } catch (err) {
        done(null, false)
    }
})

module.exports = passport