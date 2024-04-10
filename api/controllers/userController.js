const User = require('../models/userModel')

module.exports = {
    get: (req, res) => {
        res.render('user_create')
    }, 
    log: (req, res) => {
        res.render('user_log')
    },
    getAccount: (req, res) => {
        res.render('user_account')
    },
    getAdmin: (req, res) => {
        res.render('admin_account')
    }
}