const Router = require('express').Router()
const playlistController = require('../controllers/PlaylistController')

Router.get('/:id', (req, res) => res.render('user/playlist'))
Router.post('/', playlistController.createPlaylist)
Router.delete('/:id', playlistController.deletePlaylist)


module.exports = Router