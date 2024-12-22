const router = require("express").Router()
const gejalaController = require("../controllers/gejalaController")
const authenticate = require("../middleware/authenticate")
const checkRole = require("../middleware/checkRole")

router
  .route("/:id")
  .get(gejalaController.getGejalaById)
  .patch(authenticate, checkRole("pakar"), gejalaController.updateGejalaById)
  .delete(authenticate, checkRole("pakar"), gejalaController.deleteGejalaById)
router
  .route("/")
  .get(gejalaController.getGejalaList)
  .post(authenticate, checkRole("pakar"), gejalaController.createGejala)

router.get("/:penyakitId/gejala", gejalaController.getGejalaByPenyakit)

module.exports = router
