const {DataTypes} = require("sequelize")
const sequelize = require("../config/database/database")
const Students = require("../models/Students")

const Courses = sequelize.define("courses", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {underscored: true})


Courses.hasMany(Students, {as: "students"})
Students.belongsTo(Courses, {as: "course"})

module.exports = Courses