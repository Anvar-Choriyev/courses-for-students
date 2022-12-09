const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const {Op} = require("sequelize")
const Users = require("../models/Users")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const {compare} = require("bcrypt")

const generateToken = (payload, jwtSecret, options) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwtSecret, options, (err, token) => {
            if(err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

const findByUsername = async (username) => {
    const user = await Users.findOne({
        where: {username: {[Op.eq]: username}}
    })
    if(user) {
        return user
    }
    return null
}

exports.register = catchAsync( async(req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.isOperational = false;
        err.errors = validationErrors.errors
        return next(err)
    }
    const superAdmin = {
        firstName: "Anvar",
        lastName: "Choriyev",
        email: "choriyevanvar08@gmail.com",
        phoneNumber: "+998936979876",
        verificationCode: null,
        isVerified: true,
        username: "myusername",
        password: "19981998",
        userRole: "SUPER_ADMIN"
    }
    const admin = await Users.findAll()
    if(admin.length === 0) {
        await Users.create({...superAdmin})
    }

    const existedUser = await findByUsername(req.body.username)

    if(existedUser) {
        return next(new AppError("User with this username is available"))
    }
    const newUser = await Users.create(req.body)
    const payload = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
    }
    const token =  generateToken(payload, process.env.JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "24d"
    })
    res.status(201).json({
        status: "success",
        message: "Registration completed",
        error: null,
        data: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                role: newUser.userRole,
                jwt: token
                }
            })
})

exports.login = catchAsync(async (req, res, next) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        const err = new AppError("Validation error", 400)
        err.isOperational = false;
        err.errors = validationErrors.errors
        return next(err)
    }
    const {username, password} = req.body

    const candidate = await findByUsername(username)
    if(!candidate) {
        return next(new AppError("Login or password error", 400))
    }
    const passwordIsMatch = await compare(password, candidate.password)
    if(!passwordIsMatch) {
        return next(new AppError("Login or password error", 400))
    }

    const payload = {
        id: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        role: candidate.userRole
    }
    const token = await generateToken(payload, process.env.JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "24d"
    })
    res.json({
        status: "success",
        message: "",
        error: null,
        data: {
            user: {
                ...payload,
            },
            jwt: token,
        }
    })
})