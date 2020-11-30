const { song } = require('../db/models/Song')

const createSong = (req, res) => {
    const song = new Song(req.body);
    // Assign the logged in user's id
    song.user = req.user._id;
    song.save(function(err) {
      if (err) return render;
      // (<new or custom error template>) Probably want to go to newly added song's show view
      res.redirect(`/playlist/${song._id}`);
    });
  }


const searchSong = (req, res) => {
  // Make the query object to use with Book.find based upon
  // if the user has submitted via a search form for a book name
  let songQuery = req.query.title ? {title: new RegExp(req.query.title, 'i')} : {};
  playlist.find(bookQuery, function(err, playlists) {
    // Why not reuse the books/index template?
	res.render('/books/index', {
	  books,
	  user: req.user,
	  nameSearch: req.query.name  // use to set content of search form
	});
  });
}


const deleteSong = (req, res) => {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Playlist.findOne({'comments._id': req.params.id}, function(err, book) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const playlistSubdoc = playlist.title.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!playlist.title.equals(req.playlist.title)) return res.redirect(`/books/${book._id}`);
    // Remove the comment using the remove method of the subdoc
    commentSubdoc.remove();
    // Save the updated book
    playlist.save((err) => {
      // Redirect back to the book's show view
      res.redirect(`/user/home${playlist.title}`);
    });
  });
}

  module.exports = {
      createSong, 
      searchSong, 
      deleteSong
  } 