module.exports = (router) => {

    router.get('/', (req, res) => {
        res.send('Welcome to the social network API.')
    })

    return router

}