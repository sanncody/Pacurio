const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    profilePic: String,
    email: String,
    password: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId, // We have array of productIds here
            ref: "product"
        }
    ],
    orders: [],
    contact: Number
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;