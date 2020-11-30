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
            ref: 'User'
        },
        songs: [{
            type: Schema.Types.ObjectId,
            ref: 'Song'
        }]
    },
    {timestamps: true}
)