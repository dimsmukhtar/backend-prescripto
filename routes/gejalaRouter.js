const router = require("express").Router()
const { getGejala } = require("../controllers/diagnosaController")
const authenticate = require("../middleware/authenticate")
const isVerified = require("../middleware/isVerified")

router.get("/", getGejala)

module.exports = router
