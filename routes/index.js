const router = require("express").Router()

const testRouter = require("./testRouter")
const userRouter = require("./userRoutes")
const pakarRouter = require("./pakarRouter")
const diagnosaRouter = require("./diagnosaRouter")
const gejalaRouter = require("./gejalaRouter")
const penyakitRouter = require("./penyakitRouter")
const questionRouter = require("./QuestionRouter")

router.use("/api/v1/user", userRouter)
router.use("/api/v1/pakar", pakarRouter)
router.use("/api/v1/diagnosa", diagnosaRouter)
router.use("/api/v1/gejala", gejalaRouter)
router.use("/api/v1/penyakit", penyakitRouter)
router.use("/api/v1/question", questionRouter)

module.exports = router
