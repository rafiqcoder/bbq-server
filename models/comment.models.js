const mongoose = require('mongoose');

const commentScema = new mongoose.Schema({
    productId: String,
    name: String,
    email: String,
    img: String,
    comment: String,
    rating: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = CommentDb = mongoose.model('reviews',commentScema,'reviews');