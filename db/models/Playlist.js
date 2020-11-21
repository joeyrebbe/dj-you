const { Schema } = require('mongoose')

module.exports = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String, 
            required: false
        },
        purpose: {
            type: String, 
            required: false
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        songs: [{
            type: Schema.Types.ObjectId,
            ref: 'songs'
        }]
    },
    {timestamps: true}
)