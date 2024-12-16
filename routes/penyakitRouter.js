const router = require("express").Router()
const getPenyakitById = require("../controllers/penyakitController")

router.route("/:id").get(getPenyakitById)

module.exports = router
