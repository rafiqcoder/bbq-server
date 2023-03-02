const mongoose = require('mongoose');

const UserListSchema = new mongoose.Schema({
    name: String,
    email: String,
    img: String,
    createdAt: {
        type: Date,
        default: Date.now

    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserList = mongoose.model('UserList',UserListSchema);