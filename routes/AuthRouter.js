const Router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const passport = require('../middleware/passportConfig')

// Auth Routes
Router.get('/signup', (req,res) => res.render('auth/signup'))
Router.get('/login', (req,res) => res.render('auth/login'))
Router.post('/signup', AuthController.CreateUser)
Router.post('/login', passport.authenticate('local', {
    successFlash: 'Successful login, welcome back!',
    successRedirect: '/user/profile',
    failureFlash: 'Invalid Credentials',
    failureRedirect: '/user/login'
}))


Router.get('/logout', (req, res) => {
    //Remove user data from the session
    req.logout()
    req.flash('success', 'Bye bye! 😘')
    res.redirect('/')
})

module.exports = Router