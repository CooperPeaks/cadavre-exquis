const express = require('express')
const { body, param } = require('express-validator')
const router = express.Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')
const storyController = require('./controllers/storyController')
const chapterController = require('./controllers/chapterController')
const genreController = require('./controllers/genreController')

const isAdminMiddleware = require('./middlewares/isAdmin')
const isLogMiddleware = require('./middlewares/isLog')

router.route('/')
    .get(homeController.get)

router.get('/check-authentication', (req, res) => {
    if (req.session.username) {
        // Utilisateur connecté
        res.json({ authenticated: true });
    } else {
        // Utilisateur non connecté
        res.json({ authenticated: false });
    }
});


// Story routes
router.route('/story/create')
    .get(storyController.get)
    .post(
        body('title')
            .exists()
            .notEmpty()
            .withMessage('Ce champ ne doit pas être vide')
            .escape(),
        body('articleContent')
            .exists()
            .notEmpty()
            .withMessage('Ce champ ne doit pas être vide')
            .escape(),
        storyController.postStory)

router.route('/story/list')
    .get(storyController.list)

router.route('/story/read/:id')
    .get(storyController.read)

router.route('/story/delete/:id')
    .post(storyController.delete)

router.route('/story/finish/:id')
    .post(storyController.endingUpdate)

router.route('/story/search')
    .get(storyController.search)

// User routes
router.route('/user/register')
    .get(userController.get)
    .post(userController.post)

router.route('/user/log')
    .get(userController.getLogin)
    .post(userController.postLogin)

router.route('/user/logout')
    .get(userController.logout)

router.route('/user/account')
    .get(userController.getAccount)

router.route('/user/admin')
    .get(userController.getAdmin)

router.route('/user/delete/:id')
    .post(userController.delete)

router.route('/user/update/:id')
    .get(userController.getUpdate)
    .post(userController.postUpdate)

// Chapter Routes
router.route('/chapter/create/:storyId')
    .post(isLogMiddleware, chapterController.post)

// Genre Routes
router.route('/genre/create')
    .get(genreController.createGenre)
    .post(genreController.postGenre)

module.exports = router