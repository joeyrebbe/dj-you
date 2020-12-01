const Router = require('express').Router()
const moment = require('moment')
const userLogin = require('../middleware/userLogin')
const { User } = require('../db/schema')

Router.use(userLogin)

// Profile Routes
Router.get('/profile', (req,res) =>  res.render('user/profile', { moment }))
Router.get('/profile/edit', async (req, res) => { 
    console.log(req.user)
    try {
        const user = await User.findById(req.user._id)
        res.render('user/editprofile', { currentUser: user })
    }
    catch(err) {
        console.log('error rendering editprofile page', err)
    }
})


module.exports = Router