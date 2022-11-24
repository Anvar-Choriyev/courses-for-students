const express = require("express")
const userController = require("../controllers/userController")
const authMiddleware = require("../config/middlewares/authMiddleware")
const { body } = require("express-validator")

const router = express.Router()

router
    .route("/")
    .get(authMiddleware, userController.getUsers)
    .post(userController.createUsers)
router
    .route("/:id")
    .get(authMiddleware, userController.getById)
    .put(authMiddleware, userController.updateUsers)
    .delete(userController.deleteUsers)

module.exports = router