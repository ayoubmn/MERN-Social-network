const mongoose = require ('mongoose')

const roomSchema = new mongoose.Schema({
    room: String,
    author: String,
    message: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('rooms', roomSchema)