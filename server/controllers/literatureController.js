const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const {validationResult} = require("express-validator")
const {Op} = require("sequelize")
const QueryBuilder = require("../utils/QueryBuilder")
const Literatures = require("../models/Literatures")

exports.getAllLiteratures = catchAsync(async(req, res, next) => {
    const queryBuilder = new QueryBuilder(req.query)

    queryBuilder
        .filter()
        .paginate()
        .limitFields()
        .search()
        .order()
        
    let allLiteratures = await Literatures.findAndCountAll(queryBuilder.queryOptions)
    allLiteratures = queryBuilder.createPage(allLiteratures)

    res.json({
        status: "success",
        message: "Barcha adabiyotlar",
        error: null,
        data: {
            allLiteratures
        },
    })
})

exports.createLiterature = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const newLiterature = await Literatures.create(req.body)

    res.status(201).json({
        status: "success",
        message: "Adabiyot yaratildi",
        error: null,
        data: {
            newLiterature
        }
    })
})

exports.getById = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const literatureById = await Literatures.findByPk(id)
    if(!literatureById) {
        return next(new AppError(`Bunaqa ${id}li adabiyot topilmadi`, 404))
    }
    res.json({
        status: "success",
        message: "Tanlangan adabiyot",
        error: null,
        data: {
            literatureById
        }
    })
})

exports.updateLiterature = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const {id} = req.params
    const literatureById = await Literatures.findByPk(id)
    if(!literatureById) {
        return next(new AppError(`Bunaqa ${id}li adabiyot topilmadi`, 404))
    }
    const updatedLiterature = await literatureById.update(req.body)
    res.json({
        status: "success",
        message: "Adabiyot o'zgartirildi",
        error: null,
        data: {
            updatedLiterature
        }
    })
})

exports.deleteLiterature = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const literatureById = await Literatures.findByPk(id)
    if(!literatureById) {
        return next(new AppError(`Bunaqa ${id}li adabiyot topilmadi`, 404))
    }
    await literatureById.destroy()
    res.status(204).json({
        status: "success",
        message: "Adabiyot o'chirildi",
        error: null,
        data: null
    })
})

exports.getTeachersFromLiterature = catchAsync(async(req, res, next) => {
    const byIdTeachers = await Literatures.findOne({
        where: {id: {[Op.eq]: req.params.id}},
        include: [
            "teachers"
        ]
    })
    if(!byIdTeachers){
        const err = new AppError("Bunday Id li o'qituvchi topilmadi", 404)
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