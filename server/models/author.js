const mongoose = require('mongoose')
const Schema = mongoose.Schema

const author_schema = new Schema({
    name: String,
    age: Number,
})

module.exports = mongoose.model('Author', author_schema)