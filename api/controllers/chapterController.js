const Chapter = require('../models/chapterModel');
const Story = require('../models/storyModel');
const User = require('../models/userModel')
const { validationResult } = require('express-validator')
const { Op, Sequelize } = require('sequelize')

module.exports = {
    post: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('story_create', { errors: errors.array() })
        }
        else {
            const user = await User.findOne({ where: { username: req.session.username } }, { raw: true })

            // Get a random chapter from database
            const randomChapter = await Chapter.findOne({
                order: [Sequelize.literal('RAND()')],
                include: [{ model: Story, where: { isFinished: false } }],
                raw: true
            })

            if (!randomChapter) {
                return res.render('story_create', {error : 'Aucun chapitre disponible pour mise à jour'})
            }

            const chapter = await Chapter.create({
                content: req.body.content,
                storyId: req.params.storyId,
                userId: user.id
            })

            const existingStory = await Story.findByPk(randomChapter.storyId)
            const updatedContent = existingStory.content + `\n` + randomChapter.content;

            await Story.update({ content: updatedContent }, { where: { id: randomChapter.storyId } })

            console.log(req.body, randomChapter.userId, updatedContent, existingStory);
        }
        res.redirect('back')
    }
}

