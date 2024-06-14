const Genre = require('../models/genreModel')
const Story = require('../models/storyModel')
const { validationResult } = require('express-validator')
const User = require('../models/userModel')
const Chapter = require('../models/chapterModel')
const { Op } = require('sequelize')

module.exports = {
    getStory: async (req, res) => {
        if (!req.session || !req.session.username) {
            return res.render('home')
        }
        const user = await User.findOne({ where: { username: req.session.username } })
        const genres = await Genre.findAll({ raw: true })
        if (!user) {
            return res.render('home')
        } else {
            res.render('story_create', { genres })
        }
    },

    postStory: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('story_create', { errors: errors.array() })
            }
            else {
                const existingStory = await Story.findOne({ where: { title: req.body.title } })
                if (existingStory) {
                    return res.render('story_create', { error: 'Ce titre existe déjà', genres: await Genre.findAll({ raw: true }) })
                }

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
            return res.render('story_create', { logError: 'Vous devez être connecté pour publier une histoire', genres: await Genre.findAll({ raw: true }) });
        }
    },

    list: async (req, res) => {
        const stories = await Story.findAll({ include: [{ model: Genre }, { model: User }], raw: true });
        const genres = await Genre.findAll({ raw: true })

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
        const story = await Story.findByPk(req.params.id, { include: Chapter })
        const user = await User.findOne({ where: { username: req.session.username } })
        const chapters = story.chapters
        const isWrittenByOther = chapters.some(chapter => chapter.userId !== user.id)

        if (isWrittenByOther) {
            await story.update({ isFinished: true })

            // Update story content
            const updatedContent = story.content + "\n" + req.body.content;
            await story.update({ content: updatedContent })
            console.log(story.isFinished, story.content);

            res.redirect('/story/read/' + req.params.id)
        }
        else {
            return res.render('story_read', { error: 'Un utilisateur doit écrire au moins un chapitre ' })
        }
    },

    // console.log("Un utilisateur doit écrire au moins un chapitre avant que l'histoire ne soit terminée");
    search: async (req, res) => {
        const searchQuery = req.query.searchBar
        const storiesFilter = await Story.findAll({
            include: [{ model: Genre }, { model: User }],
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${searchQuery}%` } },
                    { '$genre.genre_name$': { [Op.like]: `%${searchQuery}%` } },
                    { '$user.username$': { [Op.like]: `%${searchQuery}%` } }
                ]
            }, raw: true
        })

        if (storiesFilter.length > 0) {
            res.render('story_list', { storiesFilter, searchQuery })
        } else {
            res.render('story_list', { message: 'No exists' })
        }
        console.log(storiesFilter);
    }
}