const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const router = express.Router();

router.get('/', (req, res) => {
    let error = req.flash('Error');
    res.render("index", { error, loggedIn: false });
});

router.get('/shop', async (req, res) => {
    const products = await productModel.find();
    const flashRes = req.flash('Success');
    res.render('shop', { products, flashRes });
});

router.get('/cart', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });

    await user.populate('cart');

    res.render('cart', { user });
});

router.get('/addToCart/:prodId', isLoggedIn, async (req, res) => {
    const { prodId } = req.params;

    const user = await userModel.findOne({ email: req.user.email })

    user.cart.push(prodId);

    await user.save();

    req.flash("Success", "Added to Cart");
    res.redirect('/shop');
});

module.exports = router;