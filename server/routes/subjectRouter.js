const express = require("express")
const {body} = require("express-validator")
const upload = require("../config/middlewares/uploadMiddleware")
const subjectController = require("../controllers/subjectController")
const reportController = require("../controllers/reportController")

const router = express.Router()

router
    .route("/")
    .get(subjectController.getAllSubjects)
    .post(upload.single("avatar"),subjectController.createSubject)
router
    .route("/download")
    .get(reportController.exportSubjects)
router
    .route("/:id")
    .get(subjectController.getById)
    .patch(subjectController.updateSubject)
    .delete(subjectController.deleteSubject)
router
    .route("/:id/teachers")
    .get(subjectController.getTeachersFromSubject)

module.exports = router