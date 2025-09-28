const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    profilePic: String,
    email: String,
    password: String,
    cart: [],
    orders: [],
    isAdmin: Boolean,
    contact: Number
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;