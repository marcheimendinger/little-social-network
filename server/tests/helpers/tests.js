// WARNING : Running the tests will reset the database to its default 'tests' state. Make sure you changed to another database instance.

const chai = require('chai')
const chaiHttp = require('chai-http')
const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);

const app = require('../../app')
const database = require('../../database')

// Chai configuration
chai.use(chaiHttp)
chai.should()

// To keep session cookie
const agent = chai.request.agent(app)
after(() => {
    agent.close()
})

// Reset test database
before(async () => {
    const testsDatabase = await readFile(
        require('path').resolve(__dirname, '../../../database/tests.sql'),
        'utf8'
    )
    await database.query(testsDatabase)
})

module.exports = { chai, agent, app }