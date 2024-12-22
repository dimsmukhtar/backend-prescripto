const router = require("express").Router()
const QuestionsController = require("../controllers/QuestionsController")
const authenticate = require("../middleware/authenticate")
const checkRole = require("../middleware/checkRole")
const isVerified = require("../middleware/isVerified")

router.get("/konsul", authenticate, QuestionsController.getAllQuestions)
router.post("/konsul", authenticate, QuestionsController.makeQuestion)
//
router.get("/pakar", authenticate, checkRole("pakar"), QuestionsController.getAllQuestionsForPakar)
router.put(
  "/answer/:id",
  authenticate,
  checkRole("pakar"),
  QuestionsController.updateQuestionForPakar
)

module.exports = router
