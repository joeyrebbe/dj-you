const Router = require('express').Router()
const playlistController = require('../controllers/PlaylistController')

Router.get('/:id', playlistController.GetPlaylist)
Router.post('/', playlistController.CreatePlaylist)
Router.delete('/:id', playlistController.DeletePlaylist)


module.exports = Router