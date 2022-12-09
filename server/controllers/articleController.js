const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const {validationResult} = require("express-validator")
const {Op} = require("sequelize")
const QueryBuilder = require("../utils/QueryBuilder")
const Articles = require("../models/Articles")

exports.getAllArticles = catchAsync(async(req, res, next) => {
    const queryBuilder = new QueryBuilder(req.query)

    queryBuilder
        .filter()
        .paginate()
        .limitFields()
        .search()
        .order()
        
    let allArticles = await Articles.findAndCountAll(queryBuilder.queryOptions)
    allArticles = queryBuilder.createPage(allArticles)

    res.json({
        status: "success",
        message: "Barcha maqolalar",
        error: null,
        data: {
            allArticles
        },
    })
})

exports.createArticle = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const newArticle = await Articles.create(req.body)

    res.status(201).json({
        status: "success",
        message: "Maqola yaratildi",
        error: null,
        data: {
            newArticle
        }
    })
})

exports.getById = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const articleById = await Articles.findByPk(id)
    if(!articleById) {
        return next(new AppError(`Bunaqa ${id}li maqola topilmadi`, 404))
    }
    res.json({
        status: "success",
        message: "Tanlangan maqola",
        error: null,
        data: {
            articleById
        }
    })
})

exports.updateArticle = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const {id} = req.params
    const articleById = await Articles.findByPk(id)
    if(!articleById) {
        return next(new AppError(`Bunaqa ${id}li maqola topilmadi`, 404))
    }
    const updatedArticle = await articleById.update(req.body)
    res.json({
        status: "success",
        message: "Maqola o'zgartirildi",
        error: null,
        data: {
            updatedArticle
        }
    })
})

exports.deleteArticle = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const articleById = await Articles.findByPk(id)
    if(!articleById) {
        return next(new AppError(`Bunaqa ${id}li maqola topilmadi`, 404))
    }
    await articleById.destroy()
    res.status(204).json({
        status: "success",
        message: "Maqola  o'chirildi",
        error: null,
        data: null
    })
})

exports.getTeachersFromArticle = catchAsync(async(req, res, next) => {
    const byIdTeachers = await Articles.findOne({
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