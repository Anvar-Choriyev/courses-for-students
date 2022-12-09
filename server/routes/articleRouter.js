const express = require("express")
const articleController = require("../controllers/articleController")

const router = express.Router()

router
    .route("/")
    .get(articleController.getAllArticles)
    .post(articleController.createArticle)
router
    .route("/:id")
    .get(articleController.getById)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle)
router
    .route("/:id/teachers")
    .get(articleController.getTeachersFromArticle)

module.exports = router