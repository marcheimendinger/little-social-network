// Useful utility functions for the whole app

// Structure of this file inspired by
// https://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files

const database = require('./database')

module.exports = {

    // Check if the user is authenticated by Passport
    // To use as an Express middleware
    isAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).send('Unauthorized')
        }
        next()
    },

    // Check if the two given users are friends (true) or not (false)
    isFriendWith: async (userOne, userTwo) => {
        const query = ` SELECT *
                        FROM friends
                        WHERE
                        (
                            (user_one_id = ? AND user_two_id = ?)
                            OR
                            (user_one_id = ? AND user_two_id = ?)
                        )
                        AND accepted = true`
        const [results] = await database.query(query, [userOne, userTwo, userTwo, userOne])
        if (!results[0]) {
            return false
        }
        return true
    },
    
    // Convert empty strings ('') from an object to null
    emptyStringToNull: (data) => {
        for (const attribute in data) {
            if (data[attribute] === '') {
                data[attribute] = null
            }
        }
        return data
    }

}