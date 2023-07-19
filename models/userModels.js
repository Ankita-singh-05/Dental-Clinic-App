const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    mobile: {
        type: String,
        required: [true, 'Mobile is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

// /users - collection name
const userModels = mongoose.model('users', userSchema);

module.exports = userModels;
