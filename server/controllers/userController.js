const Users = require("../models/Users")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const {Op} = require("sequelize")
const QueryBuilder = require("../utils/QueryBuilder")

exports.getUsers = catchAsync(async(req, res, next) => {
    // const {page = 1, size, search} = req.query;
    // const allUsers = await Users.findAndCountAll({
    //     offset: (page - 1) * size || 0,
    //     limit: size,
    //     where : search && {
    //         userRole: {[Op.eq]: "ADMIN"},
    //         [Op.or]: [
    //             {firstName: {[Op.iLike]: `%${search}%`}},
    //             {lastName: {[Op.iLike]: `%${search}%`}},
    //             {email: {[Op.iLike]: `%${search}%`}}
    //         ]
    //     }
    // })
    // allUsers.totalPages = Math.ceil(allUsers.count / size) || 1
    const queryBuilder = new QueryBuilder(req.query)

    queryBuilder
        // .filter()
        .paginate()
        .limitFields()
        .search(["firstName", "lastName", "email"])
        .order()

    let allUsers = await Users.findAndCountAll(queryBuilder.queryOptions)
    allUsers = queryBuilder.createPage(allUsers)
    console.log(queryBuilder)
    if(!allUsers) {
        return next(new AppError("Users list is empty", 404))
    }
    res.json({
        status: "success",
        message: "All admins",
        error: null,
        data: {
            allUsers
        }
        // pagination: {
        //     allPagesCount: allUsers.totalPages,
        //     totalItems: allUsers.count,
        //     isLastPage: allUsers.totalPages === +page,
        //     isFirstPage: (+page - 1) === 0,
        //     hasNextPage: allUsers.totalPages > +page,
        //     page: page || 1
        // }
    })
})
exports.getById = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const userById = await Users.findByPk(id)
    if(!userById) {
        return next(new AppError(`User with this ${id} is not defined`))
    }
    res.status(201).json({
        status: "success",
        message: "Admin found by Id",
        error: null, 
        data: {
            userById
        }
    })
})

exports.createUsers = catchAsync(async(req, res, next) => {
    const newUser = await Users.create(req.body)
    if(!newUser) {
        return next(new AppError("New user not found", 404))
    }
    
    res.json({
        status: "success",
        message: "User created",
        error: null, 
        data: {
            newUser
        }
    })
})
exports.updateUsers = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const userById = await Users.findByPk(id)
    if(!userById) {
        return next(new AppError(`User with this ${id} is not defined`))
    }
    const updateUser = await userById.update(req.body)
    res.json({
        status: "success",
        message: "Admin updated",
        errors: null,
        data: {
            updateUser
        }
    })
})
exports.deleteUsers = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const userById = await Users.findByPk(id)
    if(!userById) {
       return next(new AppError(`User with this ${id} is not defined`))
    }
    userById.destroy()
    res.status(204).json({
        status: "success",
        message: "User deleted",
        error: null,
        data: null
    })
})