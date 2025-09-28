const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://peednascooldude:12345@cluster0.qqajo.mongodb.net/scatch");

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