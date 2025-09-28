const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    discount: {
        type: Number,
        default: 0 
    },
    bgColor: String,
    panelColor: String,
    textColor: String,
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;