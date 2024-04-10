const {DataTypes} = require('sequelize')
const config = require('../../config')

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

module.exports = Chapter