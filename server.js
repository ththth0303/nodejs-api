const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// require('dotenv').load()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let routes = require('./api/routes')

const port = process.env.PORT || 3001
routes(app)

app.listen(port)

console.log('Server started on: ' + port)