const {DataTypes} = require("sequelize")
const sequelize = require("../config/database/database")
const Teachers = require("./Teachers")

const Articles = sequelize.define("articles", {
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

Articles.hasMany(Teachers, {as: "teachers"})
Teachers.belongsTo(Articles)

module.exports = Articles