const express = require("express")
const certificateController = require("../controllers/certificateController")

const router = express.Router()

router
    .route("/")
    .get(certificateController.getAllCertificates)
    .post(certificateController.createCertificate)
router
    .route("/:id")
    .get(certificateController.getById)
    .patch(certificateController.updateCertificate)
    .delete(certificateController.deleteCertificate)
router
    .route("/:id/teachers")
    .get(certificateController.getTeachersFromCertificate)

module.exports = router