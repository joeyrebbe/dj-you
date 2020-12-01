const { render } = require('ejs')
const { Playlist } = require('../db/schema')
let newSongs = Playlist

//ADAM / Jonah: need to require a handler function up here? to put in AddSong function


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

// 


const SearchPlaylist = (req, res) => {
  let playlistQuery = req.query.title ? {title: new RegExp(req.query.title, 'i')} : {};
  playlist.find(playlistQuery, (err, playlists) => {
	res.render('/playlists', {
	  playlists,
	  user: req.user,
	  nameSearch: req.query.songs  // use to set content of search form
	});
  });
}


const DeletePlaylist = (req, res) => {
  Playlist.findOne({'playlist._id': req.params.id}, (err, playlist) => {
    const playlistSubdoc = playlist.title.id(req.params.id);
    if (!playlist._id.equals(req.playlist._id)) return res.redirect(`/playlists/${playlist._id}`);
    playlistSubdoc.remove();
    playlist.save((err) => {
      res.redirect(`/user/home${playlist.title}`);
    });
  });
}



  module.exports = {
      CreatePlaylist, 
      SearchPlaylist, 
      DeletePlaylist, 
      GetPlaylist
      //   EditPlaylist,
  } 

//   const EditPlaylist = (req, res) => {
    //   Playlist.findById(req.params.id, (err, playlist) => {
    //     if (!playlist.user.equals(req.user._id)) return res.redirect('/models/Playlist');
    //     res.render('/models/Playlist/edit', {playlist});
    //   });
    // }