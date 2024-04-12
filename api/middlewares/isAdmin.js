const { raw } = require("mysql2")
const User = require("../models/userModel")

module.exports = async (req, res, next) => {
    let user
    if (req.session.username !== undefined) {
        user = await User.findOne({
            where: {
                username: req.session.username
            }
        }, { raw: true })
    }

    if (!user || user.isAdmin === false) {
        res.redirect('/')
    } else {
        next()
    }
}