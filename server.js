// Module Requirements
require('dotenv').config()
const express = require('express')
const layouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
const methodOverride = require('method-override')
const connection = require('./db/connection')

// Set PORT
const PORT = process.env.PORT || 8000

// Create app instance
const app = express()

// Include passpart via the passport config file
const passport = require('./middleware/passportConfig')

// Middleware

app.use(logger('dev'))
// Set template lang to EJS
app.set('view engine', 'ejs')
// Tell express to use the layouts module
app.use(layouts)
// Set up the static folder
app.use(express.static('public'))
// Decrypt the variables coming in via POST routes (from form tags)
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Allow PUT and DELETE routes via POST routes from forms
app.use(methodOverride('_method'))
// set up the session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
// Set up connect-flash for the flash alert messages (depends on session, MUST come after session is declared)
app.use(flash())
// Set up passport (depends on session; must come after it)
app.use(passport.initialize())
app.use(passport.session())

// Custom middleware - make certain variables available to EJS pages through locals
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    res.locals.currentPlaylist = req.playlist
    next()
})



// Routes 

app.use('/user', require('./routes/UserRouter'))
app.use('/auth', require('./routes/AuthRouter'))
app.use('/playlist', require('./routes/PlaylistRouter'))
// Create a home (index) route that renders the home page
app.get('/', (req,res) => res.render('home'))
// Create catch-all route. Put it at the BOTTOM of routes
app.get('*', (req, res) => res.render('error'))


// Listen on the PORT
app.listen(PORT, async () => {
  try {
    await connection
    console.log('Database Connected')
    console.log(`App listening on port ${PORT}!`)
  } catch (error) {
    throw new Error('Error with connection')
  }
})