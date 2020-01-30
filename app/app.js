const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const postRoutes = require('./api/post')
const authorRoutes = require('./api/author')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('api/static'))

app.get('/', (req, res) => {
    res.status(200).send('Hello World !')
})

postRoutes(app, db)
authorRoutes(app, db)
module.exports = app