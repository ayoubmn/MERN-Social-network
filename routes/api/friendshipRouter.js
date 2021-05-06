const router = require("express").Router();
const friendshipCtrl = require("../../controllers/friendshipCtrl");

router.post("/follow", friendshipCtrl.follow);
//router.get("/followers", friendshipCtrl.followers);
router.post("/following", friendshipCtrl.following);

module.exports = router;
