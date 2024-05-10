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

    if (!user) {
        res.redirect('/user/log')
    }
    else {
        next()
    }
}



