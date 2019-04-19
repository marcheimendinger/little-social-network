const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Port used by the server
const port = 3001

// Node body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Get the routes
const router = express.Router()
app.use(
    '/',
    require('./routes/home')(router)
)
app.use(
    '/user',
    require('./routes/user')(router)
)

// Start the server
const server = app.listen(port, () => {
    console.log(`Server running on port ${server.address().port} : http://localhost:${server.address().port}/`)
})