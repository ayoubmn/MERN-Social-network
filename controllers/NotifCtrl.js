const Notifications = require('../models/notificationsModel')


const notifCtrl = {
    createNotif: async (req, res) => {
        try {
            const { id, recipients, url, text, content, image } = req.body

            if(recipients.includes(req.user._id.toString())) return;

            const notif = new Notifications({
                id, recipients, url, text, content, image, user: req.user._id
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
    },
    getNotifications: async (req, res) => {
        try {
            const notifications = await Notifications.find({recipients: req.user._id})
            .sort('-createdAt').populate('user', 'avatar username')
            
            return res.json({notifications})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    isReadNotif: async (req, res) => {
        try {
            const notifications = await Notifications.findOneAndUpdate({_id: req.params.id}, {
                isRead: true
            })

            return res.json({notifications})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteAllNotifications: async (req, res) => {
        try {
            const notifications = await Notifications.deleteMany({recipients: req.user._id})
            
            return res.json({notifications})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}


module.exports = notifCtrl