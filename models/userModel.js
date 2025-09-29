const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    profilePic: String,
    email: String,
    password: String,
    cart: [],
    orders: [],
    contact: Number
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;