const { Schema } = require('mongoose')



module.exports = new Schema(
    {
        title: {
            type: String, 
            required: true
        },

        img_url: {
            type: String,
            required: false,
            default: 'https://res.cloudinary.com/dmazi5xmh/image/upload/v1605921898/dj-you/record-hi_v9cc22.png'
        }, 
        genre: {
            type: String,
            required: false
        },
        bpm: {
            type: Number,
            required: false
        },
        rating: {
            type: Number,
            required: false
        }, 
        artist: {
            type: String,
            required: false
        }

    },  
    {timestamps: true}
)