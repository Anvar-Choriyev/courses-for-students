const express = require("express")
const { body } = require("express-validator")
const authController = require("../controllers/authController")

const router = express.Router()

router.post("/login",
    body("username")
    .notEmpty()
    .withMessage("Username mustn't be empty")
    .isLength({min: 6}).withMessage("Username mustn't be less than 6"),
    body("password")
    .notEmpty()
    .withMessage("Password mustn't be empty")
    .isLength({min: 8}).withMessage("Password mustn't be less than 8"),
    authController.login)
// router.post("/registerSuper",
//     body("firstName")
//     .notEmpty()
//     .withMessage("firstname mustn't be empty"),
//     body("lastName")
//     .notEmpty()
//     .withMessage("lastname mustn't be empty"),
//     body("email")
//     .notEmpty()
//     .withMessage("email mustn't be empty"),
//     body("phoneNumber")
//     .notEmpty()
//     .withMessage("phone number mustn't be empty"),
//     body("username")
//     .notEmpty()
//     .withMessage("Username mustn't be empty")
//     .isLength({min: 6})
//     .withMessage("Username mustn't be less than 6"),
//     body("password")
//     .notEmpty()
//     .withMessage("Password mustn't be empty")
//     .isLength({min: 8})
//     .withMessage("Password mustn't be less than 8"),
//     authController.addSuperAdmin)
router.post("/register",
    body("firstName")
    .notEmpty()
    .withMessage("firstname mustn't be empty"),
    body("lastName")
    .notEmpty()
    .withMessage("lastname mustn't be empty"),
    body("email")
    .notEmpty()
    .withMessage("email mustn't be empty"),
    body("phoneNumber")
    .notEmpty()
    .withMessage("phone number mustn't be empty"),
    body("username")
    .notEmpty()
    .withMessage("Username mustn't be empty")
    .isLength({min: 6})
    .withMessage("Username mustn't be less than 6"),
    body("password")
    .notEmpty()
    .withMessage("Password mustn't be empty")
    .isLength({min: 8})
    .withMessage("Password mustn't be less than 8"),
    authController.register)
// router.post("/email-verification/:id", authController.verifyNumber)
module.exports = router