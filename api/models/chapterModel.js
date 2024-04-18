const {DataTypes} = require('sequelize')
const config = require('../../config')
const Story = require('./storyModel')

const Chapter = config.sequelize.define('chapters', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Story.hasMany(Chapter)
Chapter.belongsTo(Story)

module.exports = Chapter