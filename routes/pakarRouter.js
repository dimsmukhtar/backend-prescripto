const router = require("express").Router()
const dashboardController = require("../controllers/pakarController")
const authenticate = require("../middleware/authenticate")
const isVerified = require("../middleware/isVerified")

router.route("/login").post(dashboardController.loginPakar)
router.route("/user/list").get(dashboardController.userList)
router.route("/user/:id").delete(dashboardController.deleteUser)
router.route("/user/diagnosa/:id").get(dashboardController.getDiagnosaByIdUser)
router.route("/dashboard").get(dashboardController.getDataDashboard)
router.route("/penyakit").get(dashboardController.getPenyakitListForPakar)

module.exports = router
