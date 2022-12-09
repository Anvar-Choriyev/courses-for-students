const {DataTypes} = require("sequelize")
const sequelize = require("../config/database/database")
const Teachers = require("./Teachers")

const Literatures = sequelize.define("literatures", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {underscored: true})

Literatures.hasMany(Teachers, {as: "teachers"})
Teachers.belongsTo(Literatures)

module.exports = Literatures