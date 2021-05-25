const router = require('express').Router()
const auth = require('../middleware/auth')
const notifCtrl = require('../controllers/NotifCtrl')


router.post('/notif', auth, notifCtrl.createNotif)
router.delete('/notif/:id', auth, notifCtrl.removeNotif)
router.get('/notifications', auth, notifCtrl.getNotifications)

router.patch('/isReadNotif/:id', auth, notifCtrl.isReadNotif)

router.delete('/deleteAllNotif', auth, notifCtrl.deleteAllNotifications)


module.exports = router
