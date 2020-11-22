const Router = require('express').Router()
const moment = require('moment')
const userLogin = require('../middleware/userLogin')

Router.use(userLogin)

// Profile Routes
Router.get('/profile', (req,res) =>  res.render('user/profile', { moment }))


module.exports = Router