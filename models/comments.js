const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const commentsSchema = new mongoose.Schema(
    {
        
        comment: {
            type: String,
            required: true,
            
        },
        createdAt: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            
        }
    },
    { timestamps: true }
);



module.exports = mongoose.model('Comments', commentsSchema);