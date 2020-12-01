const Router = require('express').Router()
const songController = require('../controllers/SongController')


Router.get('/:id', (req, res) => res.render('user/addsong'))
// ^ may want to change the route to playlist page
Router.delete('/', songController.DeleteSong)
Router.post('/:id', songController.AddSong)

module.exports = Router