const Router = require('express').Router()
const AuthController = require('../controllers/AuthController')

// Auth Routes
Router.get('/signup', (req,res) => res.render('auth/signup'))
Router.get('/login', (req,res) => res.render('auth/login'))
Router.post('/signup', AuthController.CreateUser)

module.exports = Router