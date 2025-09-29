const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: String,
    profilePic: String,
    email: String,
    password: String,
    products: [],
    gstin: String,
});

const ownerModel = mongoose.model('owner', ownerSchema);

module.exports = ownerModel;