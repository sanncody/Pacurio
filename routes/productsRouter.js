const express = require('express');

const router = express.Router();

const { isLoggedIn } = require('../middlewares/isLoggedIn');
const upload = require('../config/multerConfig');
const productModel = require('../models/productModel');

router.get('/', (req, res) => {
    res.send("Welcome to Product's Endpoint");
});

router.post('/create', isLoggedIn, upload.single('image'), async (req, res) => {
    const { name, price, discount, bgColor, panelColor, textColor } = req.body;

    const product = await productModel.findOne({ name });    

    if (product) {
        return res.send("Product already exists");
    }

    try {
        const createdProduct = await productModel.create({
            image: req.file.buffer, 
            name,
            price,
            discount,
            bgColor,
            panelColor,
            textColor,
        });

        req.flash("Success", "Product created Successfully!!");
        res.redirect('/api/owners/admin/create-products');
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;