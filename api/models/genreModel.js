const {DataTypes} = require('sequelize')
const config = require('../../config')

const Genre = config.sequelize.define('genres', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    genre_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Genre