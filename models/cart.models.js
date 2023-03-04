const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email: String,
    cartData: Array,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
   
});

module.exports = CartDb = mongoose.model('CartProducts',cartSchema,'CartProducts');