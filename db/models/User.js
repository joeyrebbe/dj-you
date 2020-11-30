const { Schema } = require('mongoose')

module.exports = new Schema(
  {
    username: {
        type: String,
        required: true, 
    },
    artistname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profilepic: {
        type: String,
        required: false,
        default: "https://res.cloudinary.com/dmazi5xmh/image/upload/v1605916478/dj-you/41GdRzEKaLL._SL500_AC_SS350__trvpol.jpg"
    },
    coverpic: {
        type: String,
        required: false,
        default: "https://res.cloudinary.com/dmazi5xmh/image/upload/v1605917346/dj-you/Abstract-Music-Wallpaper-Free-Download_ji36hq_pq4ltm.jpg"
    },
    links: {
        type: Array,
        required: false,
    },
    playlists: [{
        type: Schema.Types.ObjectId,
        ref: 'Playlist',
        required: false
    }]
  },
  { timestamps: true }
)