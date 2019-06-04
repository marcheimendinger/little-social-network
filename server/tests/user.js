const { chai, agent, app } = require('./helpers/tests')

const validCredentials = {
    username: 'admin',
    password: 'admin'
}

describe('User', () => {

    describe('Register', () => {

        it('Cannot register a new user with an invalid username', (done) => {
            chai.request(app)
                .post('/user/register')
                .send({
                    username: 'admin',
                    password: 'tester',
                    first_name: 'Tester',
                    last_name: 'Tester',
                    email: 'tester@tester.com'
                })
                .end((err, res) => {
                    res.should.have.status(500)
                    done()
                })
        })

        it('Cannot register a new user without all required fields', (done) => {
            chai.request(app)
                .post('/user/register')
                .send({
                    username: 'testing'
                })
                .end((err, res) => {
                    res.should.have.status(500)
                    done()
                })
        })

        it('Can register a new user with a valid username', (done) => {
            chai.request(app)
                .post('/user/register')
                .send({
                    username: 'tester',
                    password: 'tester',
                    first_name: 'Tester',
                    last_name: 'Tester',
                    email: 'tester@tester.com'
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })

    })

    describe('Login', () => {

        it('Cannot login with invalid password', (done) => {
            chai.request(app)
                .post('/user/login')
                .send({
                    username: 'admin',
                    password: 'test'
                })
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })

        it('Can login with valid credentials', (done) => {
            agent
                .post('/user/login')
                .send(validCredentials)
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })

    })

    describe('View', () => {

        it('Can view authenticated user\'s informations', (done) => {
            agent
                .get('/user/view')
                .query({ user_id: 'me' })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.all.keys(
                        'id',
                        'username',
                        'first_name',
                        'last_name',
                        'birth_date',
                        'gender',
                        'location',
                        'description',
                        'email',
                        'created',
                        'friendship',
                        'is_me')
                    done()
                })
        })

        it('Can view user\'s informations', (done) => {
            agent
                .get('/user/view')
                .query({ user_id: 2 })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.all.keys(
                        'id',
                        'username',
                        'first_name',
                        'last_name',
                        'birth_date',
                        'gender',
                        'location',
                        'description',
                        'created',
                        'friendship',
                        'is_me')
                    done()
                })
        })

    })

})