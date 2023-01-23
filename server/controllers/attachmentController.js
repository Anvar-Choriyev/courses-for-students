const Attachments = require("../models/Attachments")
const Subjects = require("../models/Subjects")
const catchAsync = require("../utils/catchAsync")
const {Op} = require("sequelize")

exports.create = catchAsync(async(req, res, next) => {
    const avatarObj = {
        name: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url:req.file.path,
        type: req.file.originalname.slice(+req.file.originalname.lastIndexOf(".")+1)
    }
    const newAttachment = await Attachments.create(avatarObj)
    const subjectAttachment = await Subjects.create({presentation: avatarObj.url})
    res.status(201).json({
        status: "success",
        message: "",
        error: null,
        data: {
            newAttachment,
            avatarObj
        }        
    })
})