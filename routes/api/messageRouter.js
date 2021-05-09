const router = require("express").Router();
const messageCtrl = require("../../controllers/messageCtrl");

router.post("/message", messageCtrl.createMessage);
router.post("/conversations", messageCtrl.getConversations);
router.post("/messages/:id", messageCtrl.getMessages);

module.exports = router;
