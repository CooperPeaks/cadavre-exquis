const Chapter = require('../models/chapterModel');
const Story = require('../models/storyModel');
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
            const chapter = await Chapter.create({
                content: req.body.content,
                storyId: req.params.storyId,
                userId: user.id
            })

            const existingStory = await Story.findByPk(req.params.storyId)
            const updatedContent = existingStory.content + `\n` + chapter.content;
            
            await Story.update({ content: updatedContent }, { where: { id: req.params.storyId } })

            
            console.log(req.body, chapter.userId, updatedContent, existingStory);

        }
        res.redirect('back')
    }
}
