const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Login = require('../model/Loggar');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jasonWebToken;

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.id);
        const id = decoded.id;
        await Login.findOne({ id }).select('-senha');
        next();
    } else {
        res.status(401).redirect('/login');
    }
});

module.exports = { protect };
