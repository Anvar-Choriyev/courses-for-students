const express = require("express")
const {body} = require("express-validator")
const studentController = require("../controllers/studentController")

const router = express.Router()

router
    .route("/")
    .get(studentController.getAllStudents)
    .post(studentController.createStudent)
router
    .route("/:id")
    .get(studentController.getById)
    .patch(studentController.updateStudent)
    .delete(studentController.deleteStudent)

module.exports = router