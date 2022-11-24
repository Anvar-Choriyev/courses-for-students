const {DataTypes, UUIDV4, UUIDV1} = require("sequelize")
const sequelize = require("../config/database/database") 
const userRole = require("../utils/userENUM")
const {hash} = require("bcrypt")

const Users = sequelize.define("users", {
    id: {
       type: DataTypes.UUID,
       defaultValue: UUIDV4,
       primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {min: {args: 6, msg: "Username mustn't be less than 6"}}
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {min: {args: 8, msg: "Password mustn't be less than 8"}}
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {isEmail: true}      
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verificationCode: {
        type: DataTypes.STRING,
        // defaultValue: b,
    },
    isVerified : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userRole: {
        type: DataTypes.ENUM(Object.values(userRole)),
        allowNull: false,
        defaultValue: userRole.ADMIN
    }
}, {
    underscored: true,
    hooks: {
        async beforeCreate(user) {
            user.password = await hash(user.password, 8)
        }
    }
})

module.exports = Users