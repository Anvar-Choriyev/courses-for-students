const express = require("express")
const {body} = require("express-validator")
const courseController = require("../controllers/courseController")

const router = express.Router()

router
    .route("/")
    .get(courseController.getAllCourses)
    .post(body("name", "Name cannot be empty").notEmpty(), courseController.createCourse)
router
    .route("/:id")
    .get(courseController.getById)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)
router
    .route("/:id/students")
    .get(courseController.getStudentsFromCourse)

module.exports = router