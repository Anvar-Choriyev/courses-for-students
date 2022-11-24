const {DataTypes} = require("sequelize")
const sequelize = require("../config/database/database")
const Attachments = require("./Attachments")

const Students = sequelize.define("students", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
}, {underscored: true})

    Attachments.hasOne(Students, {as: "attachments"})
    Students.belongsTo(Attachments)

module.exports = Students