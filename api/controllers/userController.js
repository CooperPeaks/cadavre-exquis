const Story = require('../models/storyModel')
const User = require('../models/userModel')
const { Op } = require('sequelize')

module.exports = {
    // Display register page
    get: (req, res) => {
        res.render('user_create')
    },
    // Allow visitor to create account
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
    // Display log page
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
            // If admin 
            if(user.isAdmin) {
                req.session.isAdmin = true
            }
            res.redirect('/')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    },
    getAccount: async (req, res) => {
        const user = await User.findOne({where: {username: req.session.username}})
        const stories = await Story.findAll({
            where: {
                userId: user.id
            },
            raw: true
        })
        console.log(stories, stories.title);
        stories.forEach(story => {console.log(story.title);})
        res.render('user_account', { user, stories })
    },
    getAdmin: (req, res) => {
        res.render('admin_account')
    }
}