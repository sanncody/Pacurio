const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');

const ownerModel = require('../models/ownerModel');

const router = express.Router();

/* Note: To set environment we can use -> export NODE_ENV=development/production */
if (process.env.NODE_ENV === 'development') {
    // We are creating this owner in development environment only
    router.post('/create', async (req, res) => {
        const { username, email, password } = req.body;

        bcrypt.genSalt(16, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const owners = await ownerModel.find();
                if (owners.length > 0) return res.status(500).send("You don't have permission to create a new owner."); 

                const createdOwner = await ownerModel.create({
                    username,
                    email,
                    password: hash
                });

                res.status(201).json({ message: "Owner is created successfully!!", createdOwner});
            });
        });
    });
}

router.get('/', (req, res) => {
    res.send("Welcome to Owner's Endpoint");
});


module.exports = router;