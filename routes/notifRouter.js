const router = require('express').Router()
const auth = require('../middleware/auth')
const notifCtrl = require('../controllers/NotifCtrl')


router.post('/notif', auth, notifCtrl.createNotif)
router.delete('/notif/:id', auth, notifCtrl.removeNotif)

module.exports = router
