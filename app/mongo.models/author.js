const mangoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema ({
    id: ObjectId(),
    firstName: String,
    lastName:  String,
})

module.exports = mongoose.model('Author',authorSchema)
