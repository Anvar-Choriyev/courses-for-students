const Subjects = require("../models/Subjects")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const {validationResult} = require("express-validator")
const {Op} = require("sequelize")
const QueryBuilder = require("../utils/QueryBuilder")
const Attachments = require("../models/Attachments")

exports.getAllSubjects = catchAsync(async(req, res, next) => {
    const queryBuilder = new QueryBuilder(req.query)

    queryBuilder
        .filter()
        .paginate()
        .limitFields()
        .search(["name", "description"])
        .order()
        
    let allSubjects = await Subjects.findAndCountAll(queryBuilder.queryOptions)
    allSubjects = queryBuilder.createPage(allSubjects)

    res.json({
        status: "success",
        message: "All subjects",
        error: null,
        data: {
            allSubjects
        },
    })
})

exports.createSubject = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const newSubject = await Subjects.create(req.body)
    res.status(201).json({
        status: "success",
        message: "Subject created",
        error: null,
        data: {
            newSubject
        }
    })
})

exports.getById = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const subjectById = await Subjects.findByPk(id)
    if(!subjectById) {
        return next(new AppError(`Subject with ID ${id} not found`, 404))
    }
    res.json({
        status: "success",
        message: "Selected subject",
        error: null,
        data: {
            subjectById
        }
    })
})

exports.updateSubject = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const {id} = req.params
    const subjectById = await Subjects.findByPk(id)
    if(!subjectById) {
        return next(new AppError(`Subject with ID ${id} not found`, 404))
    }
    const updatedSubject = await subjectById.update(req.body)
    res.json({
        status: "success",
        message: "Subject updated",
        error: null,
        data: {
            updatedSubject
        }
    })
})

exports.deleteSubject = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const subjectById = await Subjects.findByPk(id)
    if(!subjectById) {
        return next(new AppError(`Subject with ID ${id} not found`, 404))
    }
    await subjectById.destroy()
    res.status(204).json({
        status: "success",
        message: "Subject deleted",
        error: null,
        data: null
    })
})

exports.getTeachersFromSubject = catchAsync(async(req, res, next) => {
    const byIdTeachers = await Subjects.findOne({
        where: {id: {[Op.eq]: req.params.id}},
        include: [
            "teachers"
        ]
    })
    if(!byIdTeachers){
        const err = new AppError("bunday Id li o'qituvchi topilmadi", 404)
        return next(err)
    }

    res.status(201).json({
        status: "success",
        message: "Subject by id",
        error: null,
        data: {
            byIdTeachers
        }
    })
})

exports.createPresentation = catchAsync(async(req, res, next) => {
    const presentationObj = {
        name: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        type: req.file.originalname.slice(+req.file.originalname.lastIndexOf(".")+1)
    }
    const newPresentation = await Attachments.create(presentationObj)
    res.status(201).json({
        status: "success",
        message: "",
        error: null,
        data: {
            newPresentation
        }        
    })
})