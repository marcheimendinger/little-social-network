// Useful utility functions for the whole app

// Structure of this file inspired by
// https://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files

module.exports = {

    // Check if the user is authenticated by Passport
    // To use as an Express middleware
    isAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).send('Unauthorized')
        }
        next()
    }

}