const { raw } = require('mysql2')
const User = require('../models/userModel')
const { Op } = require('sequelize')

module.exports = {
    get: (req, res) => {
        res.render('user_create')
    },
    post: async (req, res) => {
        if (req.body.password !== req.body.confPass || req.body.password === "") {
            const error = "Le mot de passe ne correspond pas"
            res.render('user_create', { error })
        }
        else {
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: req.body.username },
                        { email: req.body.email }
                    ]
                }
            })
            // Check if user already exist
            if (user) {
                const error = "Ce nom d'utilisateur existe déjà"
                res.render('user_create', { error })
            } else {
                User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
                res.render('user_log')
            }
        }
    },
    getLogin: (req, res) => {
        res.render('user_log')
    },
    postLogin: async (req, res) => {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        }, { raw: true })
        if (!user) {
            res.redirect('/user/register')
        } else {
            req.session.username = user.username
            res.redirect('/')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    },
    getAccount: (req, res) => {
        res.render('user_account')
    },
    getAdmin: (req, res) => {
        res.render('admin_account')
    }
}