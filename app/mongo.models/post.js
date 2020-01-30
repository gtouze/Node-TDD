const mangoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema ({
    id: ObjectId(),
    title: String,
    content:  Text,
})

module.exports = mongoose.model('Post',postSchema)