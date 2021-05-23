const mongoose = require ('mongoose')

const notificationSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    recipients: [mongoose.Types.ObjectId],
    url: String,
    text: String,
    content: String,
    image: String,
    isRead: {type: Boolean, defaut: false}
}, {
    timestamps: true
})

module.exports = mongoose.model('notification', notificationSchema)