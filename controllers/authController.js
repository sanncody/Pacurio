const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

const userModel = require('../models/userModel');

// This is how we do named export
module.exports.registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) return res.status(401).send("User already have an account. Please login.");

    try {
        bcrypt.genSalt(16, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);

                const createdUser = await userModel.create({
                    fullname,
                    email,
                    password: hash
                });

                const token = generateToken(createdUser);
                res.cookie('token', token);
                res.status(201).json({ message: "User is created successfully!!", createdUser });
            });
        });
    } catch (error) {
        res.send(error.message);
    }
};

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) return res.status(401).send("Email or password is incorrect");

    try {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = generateToken(user);
                res.cookie('token', token);
                res.redirect('/shop');
            } else {
                return res.send("Email or password is incorrect");
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.logoutUser = (req, res) => {
    res.cookie('token', "");
    res.redirect('/');
};