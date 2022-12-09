const Teachers = require("../models/Teachers")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const {validationResult} = require("express-validator")
const QueryBuilder = require("../utils/QueryBuilder")

exports.getAllTeachers = catchAsync(async(req, res, next) => {
    const queryBuilder = new QueryBuilder(req.query)

    queryBuilder
        .filter()
        .paginate()
        .limitFields()
        .search(["firstName", "lastName"])
        .order()
    
    let allTeachers = await Teachers.findAndCountAll(queryBuilder.queryOptions)
    allTeachers = queryBuilder.createPage(allTeachers)

    res.json({
        status: "success",
        message: "All teachers",
        error: null,
        data: {
            allTeachers
        }
    })
})

exports.createTeacher = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const newTeacher = await Teachers.create(req.body)

    res.status(201).json({
        status: "success",
        message: "Teacher created",
        error: null,
        data: {
            newTeacher
        }
    })
})

exports.getById = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const teacherById = await Teachers.findByPk(id)
    if(!teacherById) {
        return next(new AppError(`Teacher with ID ${id} not found`, 404))
    }
    res.json({
        status: "success",
        message: "Selected teacher",
        error: null,
        data: {
            teacherById
        }
    })
})

exports.updateTeacher = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const {id} = req.params
    const teacherById = await Teachers.findByPk(id)
    if(!teacherById) {
        return next(new AppError(`Teacher with ID ${id} not found`, 404))
    }
    const updatedTeacher = teacherById.update(req.body)
    res.json({
        status: "success",
        message: "Teacher updated",
        error: null,
        data: {
            updatedTeacher
        }
    })
})

exports.deleteTeacher = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const teacherById = await Teachers.findByPk(id)
    if(!teacherById) {
        return next(new AppError(`Teacher with ID ${id} not found`, 404))
    }
    await teacherById.destroy()
    res.status(204).json({
        status: "success",
        message: "Teacher deleted",
        error: null,
        data: null
    })
})