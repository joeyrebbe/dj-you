const { model } = require('mongoose')

const UserModel = require('./models/User')
const PlaylistModel = require('./models/Playlist')
const SongModel = require('./models/Song')

const User = model('users', UserModel) // 'users' is the reference string for associations 
const Playlist = model('playlists', PlaylistModel)
const Song = model('songs', SongModel)

module.exports = { User, Playlist, Song }