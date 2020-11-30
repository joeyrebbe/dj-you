const Router = require('express').Router()
const songController = require('../controllers/SongController')


Router.get('/:id', (req, res) => res.render('user/song'))
// ^ may want to change the route to playlist page
Router.get('/findAll')
Router.delete('/', songController.deleteSong)
Router.post('/', songController.createSong)

module.exports = Router