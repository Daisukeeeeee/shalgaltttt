const express = require('express');
const router = express.Router();
const {register, Login, addToWishlist, getWishList, deleteWishList} = require("../controller/userController");
const { Logger } = require("../middlewares/Logger");

router.route("/").post(register)
router.route('/login').post(Login)
router.route("/wishList").post(Logger, addToWishlist).get(Logger, getWishList).delete(Logger, deleteWishList)

module.exports = router;