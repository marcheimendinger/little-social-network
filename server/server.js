const app = require('./app')

// Port used by the server
const port = 3001

// Start the server
const server = app.listen(port, () => {
    console.log(`Server running on port ${server.address().port} : http://localhost:${server.address().port}/`)
})