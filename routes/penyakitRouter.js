const router = require("express").Router()
const penyakitController = require("../controllers/penyakitController")
const authenticate = require("../middleware/authenticate")
const checkRole = require("../middleware/checkRole")

router
  .route("/:id")
  .get(penyakitController.getPenyakitById)
  .patch(authenticate, checkRole("pakar"), penyakitController.updatePenyakitById)
  .delete(authenticate, checkRole("pakar"), penyakitController.deletePenyakitById)
router
  .route("/")
  .get(penyakitController.getPenyakitList)
  .post(authenticate, checkRole("pakar"), penyakitController.createPenyakit)

module.exports = router
