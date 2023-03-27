const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    deliveryDate: String,
    menu: [
        {
            name: String,
            desc: String,
            price: Number,
            thumb: String,
            id: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now

    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = MenuDb = mongoose.model('MenuDb',MenuSchema,'MenuDb');