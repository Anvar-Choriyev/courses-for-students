const {DataTypes} = require("sequelize")
const sequelize = require("../config/database/database")
const Teachers = require("./Teachers")
const Attachments = require("./Attachments")

const Subjects = sequelize.define("subjects", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    lecture: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    presentation: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    syllabus: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    literature: {
        type: DataTypes.STRING,
        // allowNull: false
    }
}, {underscored: true})

Subjects.hasMany(Teachers, {as: "teachers"})
Teachers.belongsTo(Subjects)

Attachments.hasOne(Subjects, {as: "attachments"})
Subjects.belongsTo(Attachments)

module.exports = Subjects