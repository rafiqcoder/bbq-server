const mongoose = require('mongoose');

const UserListSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required:[true,'Email is required'],
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserList = mongoose.model('UserList',UserListSchema,'UserList');