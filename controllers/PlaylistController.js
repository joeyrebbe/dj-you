const { render } = require('ejs')
const { Playlist } = require('../db/schema')



const createPlaylist = (req, res) => {
    const playlist = new Playlist(req.body);
    // Assign the logged in user's id
    playlist.user = res.locals.currentUser._id;
    playlist.save(function(err) {
      if (err) return render;
      // (<new or custom error template>) Probably want to go to newly added playlist's show view
      res.redirect(`/playlist/${playlist._id}`);
    });
  }

  const editPlaylist = (req, res) => {
  Playlist.findById(req.params.id, (err, playlist) => {
    // Verify book is "owned" by logged in user
    if (!playlist.user.equals(req.user._id)) return res.redirect('/models/Playlist');
    res.render('models/Playlist/edit', {playlist});
  });
}


const searchPlaylist = (req, res) => {
  // Make the query object to use with playlist.find based upon
  // if the user has submitted via a search form for a playlist name
  let playlistQuery = req.query.title ? {title: new RegExp(req.query.title, 'i')} : {};
  playlist.find(playlistQuery, function(err, playlists) {
    // Why not reuse the playlists/index template?
	res.render('/playlists/index', {
	  playlists,
	  user: req.user,
	  nameSearch: req.query.name  // use to set content of search form
	});
  });
}


const deletePlaylist = (req, res) => {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Playlist.findOne({'comments._id': req.params.id}, function(err, playlist) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const playlistSubdoc = playlist.title.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!playlist.title.equals(req.playlist.title)) return res.redirect(`/playlists/${playlist._id}`);
    // Remove the comment using the remove method of the subdoc
    playlistSubdoc.remove();
    // Save the updated playlist
    playlist.save((err) => {
      // Redirect back to the playlist's show view
      res.redirect(`/user/home${playlist.title}`);
    });
  });
}

  module.exports = {
      createPlaylist, 
      searchPlaylist, 
      deletePlaylist, 
      editPlaylist
  } 