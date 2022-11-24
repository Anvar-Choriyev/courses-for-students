const Courses = require("../models/Courses")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const {validationResult} = require("express-validator")
const {Op} = require("sequelize")
const QueryBuilder = require("../utils/QueryBuilder")

exports.getAllCourses = catchAsync(async(req, res, next) => {
    const queryBuilder = new QueryBuilder(req.query)

    queryBuilder
        // .filter()
        .paginate()
        .limitFields()
        .search(["name", "description"])
        .order()
        
    let allCourses = await Courses.findAndCountAll(queryBuilder.queryOptions)
    allCourses = queryBuilder.createPage(allCourses)

    // const {page = 1, size = 3} = req.query
    // const allCourses = await Courses.findAndCountAll({
    //     offset: (page - 1) * size,
    //     limit: size
    // })
    // allCourses.totalPages = Math.ceil(allCourses.count / size)
    // if(!(page <= allCourses.totalPages) || !(size <= allCourses.count)) {
    //     return next(new AppError(`Required informations (page:${page},
    //         size of informations: ${size})`))
    // }
    res.json({
        status: "success",
        message: "All courses",
        error: null,
        data: {
            allCourses
        },
        // pagination: {
        //     allPages: allCourses.totalPages,
        //     totalItems: allCourses.count,
        //     isLastPage: allCourses.totalPages === +page,
        //     isFirstPage: (+page - 1) === 0,
        //     hasNextPage: allCourses.totalPages > +page,
        //     page: page||1
        // }
    })
})

exports.createCourse = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const newCourse = await Courses.create(req.body)

    res.status(201).json({
        status: "success",
        message: "Subject created",
        error: null,
        data: {
            newCourse
        }
    })
})

exports.getById = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const courseById = await Courses.findByPk(id)
    if(!courseById) {
        return next(new AppError(`Category with ID ${id} not found`, 404))
    }
    res.json({
        status: "success",
        message: "Selected subject",
        error: null,
        data: {
            courseById
        }
    })
})

exports.updateCourse = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const {id} = req.params
    const courseById = await Courses.findByPk(id)
    if(!courseById) {
        return next(new AppError(`Category with ID ${id} not found`, 404))
    }
    const updatedCourse = await courseById.update(req.body)
    res.json({
        status: "success",
        message: "Subject updated",
        error: null,
        data: {
            updatedCourse
        }
    })
})

exports.deleteCourse = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const courseById = await Courses.findByPk(id)
    if(!courseById) {
        return next(new AppError(`Category with ID ${id} not found`, 404))
    }
    await courseById.destroy()
    res.status(204).json({
        status: "success",
        message: "Subject deleted",
        error: null,
        data: null
    })
})

exports.getStudentsFromCourse = catchAsync(async(req, res, next) => {
    const byIdStudents = await Courses.findOne({
        where: {id: {[Op.eq]: req.params.id}},
        include: [
            "students"
        ]
    })
    if(!byIdStudents){
        const err = new AppError("bunday Idli subject topilmadi", 404)
        return next(err)
    }

    res.status(201).json({
        status: "success",
        message: "Subject by id",
        error: null,
        data: {
            byIdStudents
        }
    })
})