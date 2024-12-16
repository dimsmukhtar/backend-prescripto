const router = require("express").Router()
const { forwardChaining, riwayatDiagnosa } = require("../controllers/diagnosaController")
const authenticate = require("../middleware/authenticate")
const isVerified = require("../middleware/isVerified")

router.post("/", authenticate, isVerified, forwardChaining)
router.get("/riwayat", authenticate, riwayatDiagnosa)

module.exports = router
