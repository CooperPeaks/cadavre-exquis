const express = require('express')
const {body, param} = require('express-validator')
const router = express.Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')
const storyController = require('./controllers/storyController')
const chapterController = require('./controllers/chapterController')
const genreController = require('./controllers/genreController')


router.route('/')
    .get(homeController.get)

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

module.exports = router