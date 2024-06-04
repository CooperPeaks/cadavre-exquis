const { DataTypes } = require('sequelize')
const config = require('../../config')
const Genre = require('./genreModel')

const Story = config.sequelize.define('stories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isFinished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

Story.belongsTo(Genre)

module.exports = Story



