const mongoose = require('mongoose');

const commentScema = new mongoose.Schema({
    name: String,
    productId: String,
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