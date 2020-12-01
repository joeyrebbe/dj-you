const { render } = require('ejs')
const { Playlist } = require('../db/schema')
const axios = require('axios')
let newSongs = Playlist
const artistSearchUrl = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s='
const artistAlbumsUrl = 'https://theaudiodb.com/api/v1/json/1/album.php?i='



const CreatePlaylist = async (req, res) => {
    try {
      const newPlaylist = new Playlist({ ...req.body, user_id: req.user.id })
      newPlaylist.save()
      res.render('user/playlist', {playlist: newPlaylist} )
    } catch (error) {
      throw error
    }
  }

const GetArtist = async (req, res) => {
    try {
        const apiResponse = await axios.get(artistSearchUrl + req.body.s)
        const artist = apiResponse.data.artists[0]
        const albumResponse = await axios.get(artistAlbumsUrl + artist.idArtist)
        const albums = albumResponse.data.album
        console.log(albums[0])
        res.render('music/artist', {artist, albums})
    }
    catch(err) {
        console.log('you have no taste', err)
    }
}



  module.exports = {
      CreatePlaylist, 
      GetArtist
      //   GetPlaylist, 
  } 

  //   const GetPlaylist = async (req, res) => {
//     console.log('s')    
//          try {
//             Playlist.findById(req.params.id)
//             .populate('songs')
//             res.render('/')
//             }
//         catch(err) {
//             console.log(err)
//             res.render('/error')
//         }
//     }
