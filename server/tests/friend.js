const agent = require('./helpers/login')

describe('Friend', () => {

    describe('View', () => {

        it('Cannot view non-friend\'s friends list', (done) => {
            agent
                .get('/friend/view')
                .query({ user_id: 3 })
                .end((err, res) => {
                    res.should.have.status(500)
                    done()
                })
        })

        it('Can view friend\'s friends list', (done) => {
            agent
                .get('/friend/view')
                .query({ user_id: 2 })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })

        it('Can view authenticated user\'s friends list', (done) => {
            agent
                .get('/friend/view')
                .query({ user_id: 2 })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })

    })

    describe('Mutuals', () => {

        it('Can view user\'s mutual friends list', (done) => {
            agent
                .get('/friend/mutuals')
                .query({ user_id: 3 })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
        
    })

    describe('Invite', () => {

        it('Cannot invite a user who has already been invited by the authenticated user', (done) => {
            agent
                .post('/friend/invite')
                .send({ user_id: 4 })
                .end((err, res) => {
                    res.should.have.status(500)
                    done()
                })
        })

        it('Cannot invite a user who is already a friend', (done) => {
            agent
                .post('/friend/invite')
                .send({ user_id: 2 })
                .end((err, res) => {
                    res.should.have.status(500)
                    done()
                })
        })

        it('Can invite a not yet invited user', (done) => {
            agent
                .post('/friend/invite')
                .send({ user_id: 3 })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })

    })

    describe('Invitations', () => {

        it('Can view invitations list', (done) => {
            agent
                .get('/friend/invitations')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })

    })

    describe('Accept', () => {

        it('Can accept an invitation', (done) => {
            agent
                .post('/friend/accept')
                .send({ user_id: 5 })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })

    })

    describe('Suggestions', () => {

        it('Can view some suggestions', (done) => {
            agent
                .get('/friend/suggestions')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })

    })

})