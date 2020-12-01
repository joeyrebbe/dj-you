const { render } = require('ejs')
const { Playlist } = require('../db/schema')
const axios = require('axios')
let newSongs = Playlist
const artistSearchUrl = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s='
const artistAlbumsUrl = 'https://theaudiodb.com/api/v1/json/1/album.php?i='



const CreatePlaylist = (req, res) => {
    const playlist = new Playlist(req.body);
    // Assign the logged in user's id
    playlist.user = res.locals.currentUser._id;
    playlist.save(function(err) {
      if (err) return render;
      // (<new or custom error template>) Probably want to go to newly added playlist's show view
      res.redirect(`/playlist/${playlist._id}`);
    });
  }

  const GetPlaylist = async (req, res) => {
    console.log('s')    
         try {
            Playlist.findById(req.params.id)
            .populate('songs')
            .then( (dbPlaylist) => {
                console.log(dbPlaylist)
                res.render('user/playlist', {playlist: dbPlaylist})
            })
        }
        catch(err) {
            console.log(err)
            res.render('/error')
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
      GetPlaylist, 
      GetArtist
  } 

