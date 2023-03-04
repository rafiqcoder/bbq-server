const mongoose = require('mongoose');

const BBQProductsScema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    img: [
        {
            img: String
        },
    ],
    thumb: String


});

module.exports = BBQProducts = mongoose.model('BBQProducts',BBQProductsScema,'BBQProducts');