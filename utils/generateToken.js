const jwt = require('jsonwebtoken');

module.exports.generateToken = (user) => {
    return jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET_KEY);
};

module.exports.decodedToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};