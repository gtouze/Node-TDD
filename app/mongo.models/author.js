const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema ({
    firstName: String,
    lastName:  String,
    // post: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'post'
    // }]
})

module.exports = mongoose.model('Author',authorSchema)
