const Students = require("../models/Students")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const {validationResult} = require("express-validator")
const QueryBuilder = require("../utils/QueryBuilder")

exports.getAllStudents = catchAsync(async(req, res, next) => {
    // const {page = 1 , size = 3} = req.query;
    // const allStudents = await Students.findAndCountAll({
    //     offset: (page - 1) * size,
    //     limit: size
    // })
    // allStudents.totalPages = Math.ceil(allStudents.count / size)
    const queryBuilder = new QueryBuilder(req.query)

    queryBuilder
        .filter()
        .paginate()
        .limitFields()
        .search(["firstName", "lastName"])
        .order()
    
    let allStudents = await Students.findAndCountAll(queryBuilder.queryOptions)
    allStudents = queryBuilder.createPage(allStudents)

    res.json({
        status: "success",
        message: "All teachers",
        error: null,
        data: {
            allStudents
        }
        // pagination: {
        //     allPages: allStudents.totalPages,
        //     totalItems: allStudents.count,
        //     isLastPage: allStudents.totalPages === +page,
        //     isFirstPage: (+page - 1) === 0,
        //     hasNextPage: allStudents.totalPages > +page,
        //     page: +page
        // }
    })
})

exports.createStudent = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const newStudent = await Students.create(req.body)

    res.status(201).json({
        status: "success",
        message: "Subject created",
        error: null,
        data: {
            newStudent
        }
    })
})

exports.getById = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const studentById = await Students.findByPk(id)
    if(!studentById) {
        return next(new AppError(`Category with ID ${id} not found`, 404))
    }
    res.json({
        status: "success",
        message: "Selected teacher",
        error: null,
        data: {
            studentById
        }
    })
})

exports.updateStudent = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const {id} = req.params
    const studentById = await Students.findByPk(id)
    if(!studentById) {
        return next(new AppError(`Category with ID ${id} not found`, 404))
    }
    const updatedStudent = studentById.update(req.body)
    res.json({
        status: "success",
        message: "Teacher updated",
        error: null,
        data: {
            updatedStudent
        }
    })
})

exports.deleteStudent = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const studentById = await Students.findByPk(id)
    if(!studentById) {
        return next(new AppError(`Category with ID ${id} not found`, 404))
    }
    await studentById.destroy()
    res.status(204).json({
        status: "success",
        message: "Teacher deleted",
        error: null,
        data: null
    })
})