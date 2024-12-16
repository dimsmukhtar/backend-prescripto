const router = require("express").Router()
const QuestionsController = require("../controllers/QuestionsController")
const authenticate = require("../middleware/authenticate")
const isVerified = require("../middleware/isVerified")

router.get("/konsul", authenticate, QuestionsController.getAllQuestions)
router.post("/konsul", authenticate, QuestionsController.makeQuestion)

module.exports = router
