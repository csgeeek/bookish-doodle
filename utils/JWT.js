const jwt = require('jsonwebtoken');
require('dotenv').config()

const createToken = (user) => {
    const token = jwt.sign({
        user: user,
    }, process.env.TOKEN_SECRET);
    return token;
}

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
}
module.exports = { createToken, verifyToken };