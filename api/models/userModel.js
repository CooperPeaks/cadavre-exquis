const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('../../config')
const Story = require('./storyModel')
const Chapter = require('./chapterModel')

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
}, 

{
    hooks: {
        beforeCreate: (User) => {
            {
                User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10) : ""
            }
        }
        
        ,
        beforeBulkUpdate: (User) => {

            User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10) : ""

        }
    }
})

User.hasMany(Chapter)
Chapter.belongsTo(User)

User.hasMany(Story)
Story.belongsTo(User)

module.exports = User