const express = require("express")
const upload = require("../config/middlewares/uploadMiddleware")
const attachmentController = require("../controllers/attachmentController")

const router = express.Router()

router.post("/", upload.single("avatar"), attachmentController.create)

module.exports = router