const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('api/static'))

app.get('/', (req, res) => {
    res.status(200).send('Hello.')
})
app.get('/authors', async (req, res) => {
    await db.Author.findAll().then((result) => res.json(result))
})

app.post('/author', async (req, res) => {
    await db.Author.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then((result) => res.json(result))
})

module.exports = app