const Genre = require('../models/genreModel')
const Story = require('../models/storyModel')
const { validationResult } = require('express-validator')
const User = require('../models/userModel')
const Chapter = require('../models/chapterModel')

module.exports = {
    get: async (req, res) => {
        const genres = await Genre.findAll({ raw: true })
        res.render('story_create', { genres })
    },
    postStory: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('story_create', { errors: errors.array() })
            }
            else {
                const user = await User.findOne({ where: { username: req.session.username } })
                const newStory = await Story.create({
                    title: req.body.title,
                    content: req.body.articleContent,
                    genreId: req.body.genreId,
                    userId: user.id
                })
                console.log("Histoire créée", newStory, "Bool story :" + newStory.isFinished);
                return res.redirect("/story/list")
            }
        }
        catch (error) {
            console.error("Erreur lors de la création de l'histoire :", error);
            return res.status(500).send("Une erreur est survenue lors de la création de l'histoire.");
        }
    },

    list: async (req, res) => {
        const stories = await Story.findAll({
            include: [{ model: Genre }, { model: User }],
            raw: true
        });
        const genres = await Genre.findAll({ raw: true })
        console.log(stories);
        res.render('story_list', { stories, genres })
    },

    read: async (req, res) => {
        let story = await Story.findByPk(req.params.id, {
            include: [{ model: Chapter, separate: true, include: User }, { model: User }],
        })
        if (story) {
            story = story.toJSON();
            res.render('story_read', { story })
        } else {
            res.status(404).send('Article not found');
        }
    },

    delete: async (req, res) => {
        await Story.destroy(
            {
                where: { id: req.params.id }
            })
        res.redirect("/user/admin")
    },

    endingUpdate: async (req, res) => {
        const story = await Story.findByPk(req.params.id)
        await story.update({isFinished: true})
        console.log(story.isFinished);
    }
}