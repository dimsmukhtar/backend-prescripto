const router = require("express").Router()
const penyakitController = require("../controllers/penyakitController")

router.route("/:id").get(penyakitController.getPenyakitById)
router.route("/").get(penyakitController.getPenyakitList)

module.exports = router
