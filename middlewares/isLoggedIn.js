const userModel = require("../models/userModel");
const { decodedToken } = require("../utils/generateToken");

module.exports.isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("Error", "You need to login first.");
        return res.redirect('/');
    }

    try {
        const decodedVal = decodedToken(req.cookies.token);

        // We need to find the user with this decoded value of email and we don't want password so we used select here
        const user = await userModel.findOne({ email: decodedVal.email }).select("-password");
        req.user = user;
        next();
    } catch (error) {
        req.flash("Error", error.message);
        res.redirect('/');
    }
};