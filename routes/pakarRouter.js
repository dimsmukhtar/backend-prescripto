const router = require("express").Router()
const pakarController = require("../controllers/userController")
const authenticate = require("../middleware/authenticate")
const isVerified = require("../middleware/isVerified")

router.route("/login").post(pakarController.loginPakar)

module.exports = router
