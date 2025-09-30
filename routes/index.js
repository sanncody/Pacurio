const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const productModel = require('../models/productModel');
const router = express.Router();

router.get('/', (req, res) => {
    let error = req.flash('Error');
    res.render("index", { error });
});

router.get('/shop', isLoggedIn, async (req, res) => {
    const products = await productModel.find();
    res.render('shop', { products });
});

module.exports = router;