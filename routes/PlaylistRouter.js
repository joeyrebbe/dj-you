const Router = require('express').Router()
const playlistController = require('../controllers/PlaylistController')

Router.post('/', playlistController.CreatePlaylist)
Router.get('/search', (req, res) => { res.render('music/search')})
Router.post('/search/artist', playlistController.GetArtist)
// Router.get('/user/:id', playlistController.GetPlaylist)

module.exports = Router