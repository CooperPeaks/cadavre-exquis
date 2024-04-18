const Chapter = require('../models/chapterModel')
const User = require('../models/userModel')
const { validationResult } = require('express-validator')

module.exports = {
    post: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('story_create', { errors: errors.array() })
        }
        else {
            const user = await User.findOne({ where: { username: req.session.username } }, { raw: true })
            await Chapter.create({
                content: req.body.content,
                storyId: req.params.storyId,
                userId: user.id
            })
            console.log(req.body, Chapter.userId);
        }
        res.redirect('back')
    }
}