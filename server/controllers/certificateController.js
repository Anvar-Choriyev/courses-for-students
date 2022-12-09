const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const {validationResult} = require("express-validator")
const {Op} = require("sequelize")
const QueryBuilder = require("../utils/QueryBuilder")
const Certificates = require("../models/Certificates")

exports.getAllCertificates = catchAsync(async(req, res, next) => {
    const queryBuilder = new QueryBuilder(req.query)

    queryBuilder
        .filter()
        .paginate()
        .limitFields()
        .search()
        .order()
        
    let allCertificates = await Certificates.findAndCountAll(queryBuilder.queryOptions)
    allCertificates = queryBuilder.createPage(allCertificates)

    res.json({
        status: "success",
        message: "Barcha guvohnomalar",
        error: null,
        data: {
            allCertificates
        },
    })
})

exports.createCertificate = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const newCertificate = await Certificates.create(req.body)

    res.status(201).json({
        status: "success",
        message: "Guvohnoma yaratildi",
        error: null,
        data: {
            newCertificate
        }
    })
})

exports.getById = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const certificateById = await Certificates.findByPk(id)
    if(!certificateById) {
        return next(new AppError(`Bunaqa ${id}li guvohnoma topilmadi`, 404))
    }
    res.json({
        status: "success",
        message: "Tanlangan guvohnoma",
        error: null,
        data: {
            certificateById
        }
    })
})

exports.updateCertificate = catchAsync(async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.name = "validationError"
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }
    const {id} = req.params
    const certificateById = await Certificates.findByPk(id)
    if(!certificateById) {
        return next(new AppError(`Bunaqa ${id}li guvohnoma topilmadi`, 404))
    }
    const updatedCertificate = await certificateById.update(req.body)
    res.json({
        status: "success",
        message: "Guvohnoma o'zgartirildi",
        error: null,
        data: {
            updatedCertificate
        }
    })
})

exports.deleteCertificate = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const certificateById = await Certificates.findByPk(id)
    if(!certificateById) {
        return next(new AppError(`Bunaqa ${id}li guvohnoma topilmadi`, 404))
    }
    await certificateById.destroy()
    res.status(204).json({
        status: "success",
        message: "Guvohnoma o'chirildi",
        error: null,
        data: null
    })
})

exports.getTeachersFromCertificate = catchAsync(async(req, res, next) => {
    const byIdTeachers = await Certificates.findOne({
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
        message: "Certificate by id",
        error: null,
        data: {
            byIdTeachers
        }
    })
})