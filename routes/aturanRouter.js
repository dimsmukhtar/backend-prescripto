const router = require("express").Router()
const createRule = require("../controllers/aturanController")
const authenticate = require("../middleware/authenticate")
const checkRole = require("../middleware/checkRole")

router.post("/", authenticate, checkRole("pakar"), createRule)

module.exports = router
