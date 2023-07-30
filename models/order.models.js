const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    total_amount: {
        type: Number,
        required: true
    },
    products: Array,
    tran_id: String,
    shipping_method: String,
    cus_name: String,
    cus_email: String,
    ship_address: String,
    cus_postcode: String,
    cus_phone: String,
    status: String,
    payment: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = OrdersDb = mongoose.model('orders',orderSchema,'orders');