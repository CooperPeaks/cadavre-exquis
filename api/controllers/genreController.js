const { where } = require('sequelize')
const Genre = require('../models/genreModel')
const { validationResult } = require('express-validator')

module.exports = {
    createGenre: (req, res) => {
        res.render('genre_create')
    },
    postGenre: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.render('genre_create', { errors: errors.array() })
            }
            const genreMatch = await Genre.findOne({
                where: { genre_name: req.body.genre_name }
            }, {
                where: { id: req.params.id }
            })
            console.log("Correspondance trouvé", genreMatch);

            if (genreMatch !== null) {
                const error = "Ce genre existe déjà"
                return res.render('genre_create', { error: error })
            } else {
                const genreCreated = await Genre.create({
                    genre_name: req.body.genre_name
                })
                console.log("Catégorie créée", genreCreated);
                return res.redirect('/')
            }
        } catch (error) {
            console.error("Erreur lors de la création de la catégorie", error);
            return res.status(500).send('Erreur survenue lors de la création du genre')
        }
    }
}