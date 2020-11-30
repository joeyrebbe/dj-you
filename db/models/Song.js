const { Schema } = require('mongoose')



module.exports = new Schema(
    {
        title: {
            type: String, 
            required: true
        },
        api_id: {
            type: String,
            required: true
        },
        img_url: {
            type: String,
            required: false,
            default: 'https://res.cloudinary.com/dmazi5xmh/image/upload/v1605921898/dj-you/record-hi_v9cc22.png'
        } ,
        onPlaylist: {
            type: ObjectID,
        }
    },  
    {timestamps: true}
)