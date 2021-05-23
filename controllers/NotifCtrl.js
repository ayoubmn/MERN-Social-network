const Notifications = require('../models/notificationsModel')

const notifCtrl = {
    createNotif: async (req, res) => {
        try {
            const { id, recipients, url, text, content, image} = req.body

            const notif = new Notifications({
                id, recipients, url, text, content, image, user:req.user._id
            })
            await notif.save()
            return res.json({notif})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    removeNotif: async (req, res) => {
        try {
            const notif = await Notifications.findOneAndDelete({
                id: req.params.id, url: req.query.url
            })
            return res.json({notif})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = notifCtrl;