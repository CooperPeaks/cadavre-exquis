const Story = require('../models/storyModel')
const { validationResult } = require('express-validator')

module.exports = {
    get: (req, res) => {
        res.render('story_create')
    },
    postStory: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('story_create', { errors: errors.array() })
            }
            else {
                const newStory = await Story.create({
                    title: req.body.title,
                    content: req.body.articleContent
                })
                console.log("Histoire créée", newStory);
                return res.redirect("/story/list")
            }
        } 
        catch (error) {
            console.error("Erreur lors de la création de l'histoire :", error);
            return res.status(500).send("Une erreur est survenue lors de la création de l'histoire.");
        }
    },

    list: (req, res) => {
        res.render('story_list')
    },

    read: (req, res) => {
        res.render('story_read')
    }
}