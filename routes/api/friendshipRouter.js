const router = require("express").Router();
const friendshipCtrl = require("../../controllers/friendshipCtrl");

router.post("/add", friendshipCtrl.addFriend);
router.post("/accept", friendshipCtrl.acceptFriend);
router.post("/deleteFriend", friendshipCtrl.deleteFriend);
router.post("/deleteRequest", friendshipCtrl.deleteRequest);
router.post("/friends", friendshipCtrl.friends);

module.exports = router;
