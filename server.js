const express = require('express')
const {engine} = require('express-handlebars')
const session = require('express-session')
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require ('path')

const router = require('./api/router')
const config = require('./config')

const app = express()
const port = 3000

const Handlebars = require("handlebars")
const MomentHandler = require("handlebars.moment")
MomentHandler.registerHelpers(Handlebars)

app.engine('hbs', engine({
    extname: '.hbs', 
    helpers: {
        ifCond: function(v1, v2, option) {
            if (v1 === v2) {
                return option.fn(this)
            }
            return option.inverse(this)
        }
    }
}))
app.set('view engine', 'hbs')

app.use('/css', express.static(path.join(__dirname, 'assets/css')))
app.use('/js', express.static(path.join(__dirname, 'assets/js')))
app.use('/pictures', express.static(path.join(__dirname, 'views/pictures')))


try {
    config.sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: config.secretSession,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new SequelizeStore({ db: config.sequelize })
}))

app.use('*', (req, res, next) => {
    if (req.session.username) {
        res.locals.username = req.session.username
        if (req.session.isAdmin) {
            res.locals.isAdmin = req.session.isAdmin
        }
    }
    next()
})

app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at: http://127.0.0.1:${port}`)
})

