const express = require("express")
const literatureController = require("../controllers/literatureController")

const router = express.Router()

router
    .route("/")
    .get(literatureController.getAllLiteratures)
    .post(literatureController.createLiterature)
router
    .route("/:id")
    .get(literatureController.getById)
    .patch(literatureController.updateLiterature)
    .delete(literatureController.deleteLiterature)
router
    .route("/:id/teachers")
    .get(literatureController.getTeachersFromLiterature)

module.exports = router