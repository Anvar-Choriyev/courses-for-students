const Attachments = require("../models/Attachments")
const catchAsync = require("../utils/catchAsync")

exports.create = catchAsync(async(req, res, next) => {

    const avatarObj = {
        name: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        type: req.file.originalname.slice(+req.file.originalname.lastIndexOf(".")+1)
    }
    const newAttachment = await Attachments.create(avatarObj)
    res.status(201).json({
        status: "success",
        message: "",
        error: null,
        data: {
            newAttachment
        }        
    })
})