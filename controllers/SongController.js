const { render } = require('ejs')
const { Song } = require('../db/schema')

const AddSong = async (req, res) => {
    // ??? need to put await function up here setting variable to external function???
   try {
       const newSong = await {
           title: req.body.title,
           genre: req.body.genre,
           bpm: req.body.bpm,
           rating: req.body.rating
       }
       await playlist.push(newSong)
       res.render('playlist', {playlist: newSongs})
   }
   catch(err) {
       console.log(err)
       res.render('error')
   }
}

const SearchSong = async (req, res) => {
  // Make the query object to use with Book.find based upon
  // if the user has submitted via a search form for a book name
  try {
    let songQuery = await req.query._id ? {title: new RegExp(req.query._id, 'i')} : {}
    song.findOne(songQuery, (err, songs) => {
	res.render('/user/song', {
	  songs,
	  user: req.user,
	  nameSearch: req.query.name  // use to set content of search form
	})
  })
    }

    catch(err) {
        console.log('No such song found')
        res.redirect('/error')
    }
}


const DeleteSong = async (req, res) => {
  
    try {
    const songSubdoc = song.id(req.params.id)
    await Song.findOne({'song': req.params.id}, (err, song) => {
    songSubdoc.remove()
    playlist.save( () => {
      res.redirect(`/home${playlist._id}`)
            })
        })
    }

    catch(err) {
        console.log('Failed to delete song')
        res.redirect('/error')
    }
}

  module.exports = {
      SearchSong, 
      DeleteSong, 
      AddSong
  } 


//   const CreateSong = async (req, res) => {
    
    //     try {
    //         const song = new Song(req.body)
    //         song.user = req.user._id
    //         await song.save()
    //         }
        
    //     catch(err) {
    //         res.redirect(`/playlist/${song._id}`)
    //     }
    //   }