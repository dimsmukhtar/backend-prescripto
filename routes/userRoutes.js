const router = require("express").Router()
const userController = require("../controllers/userController")
const authenticate = require("../middleware/authenticate")
const upload = require("../middleware/uploader")

router.route("/signup").post(userController.register)
router.route("/login").post(userController.login)
router.route("/me").get(authenticate, userController.me)
router.patch("/me/edit", authenticate, upload.single("image"), userController.editProfile)

router.route("/logout", userController.logout)

router.route("/verify-email").post(userController.verifyEmail)
// router.route("/forgot-password").post(userController.forgotPassword)
// router.route("/reset-password/:token").post(userController.resetPassword)

module.exports = router
