const {DataTypes} = require("sequelize")
const sequelize = require("../config/database/database")
const Students = require("./Students")

const Attachments = sequelize.define("attachments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    originalName: DataTypes.STRING,
    size: DataTypes.BIGINT,   
    type: DataTypes.STRING,
},
    {underscored: true})

module.exports = Attachments

