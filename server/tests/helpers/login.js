const { agent } = require('./tests')

// Login
before((done) => {
    agent
        .post('/user/login')
        .send({
            username: 'admin',
            password: 'admin'
        })
        .then((res) => {
            res.should.have.status(200)
            res.should.have.cookie('connect.sid')
            done()
        })
})

module.exports = agent