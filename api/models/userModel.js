const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('../../config')
const Story = require('./storyModel')

const User = config.sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

// User.hasMany(Story)
// Story.belongsTo(User)


module.exports = User