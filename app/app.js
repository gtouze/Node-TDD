const express = require('express');
const bodyParser = require('body-parser');
//const db = require('./models');
const postRoutes = require('./api/post')
const authorRoutes = require('./api/author')
const config = require(__dirname + '/config/config');
const app = express()
const mongoose = require('mongoose')
const AuthorModel = require('./mongo.models/author.js')
const PostModel = require('./mongo.models/post.js')
const db = {
    Author: AuthorModel,
    Post: PostModel
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('api/static'))

mongoose.connect(`mongodb+srv://root:root@cluster0-vnic8.mongodb.net/${config.database}`,{useUnifiedTopology: true, useNewUrlParser: true, autoIndex: false})
    .then(() => {
      console.log('Connected to MongoDB !')
    })
    .catch((err) => {
      console.log(err)
    })

app.get('/', (req, res) => {
    res.status(200).send('Hello World !')
})

postRoutes(app, db)
authorRoutes(app, db)
module.exports = app