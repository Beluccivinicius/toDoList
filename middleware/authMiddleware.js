const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Login = require('../model/Loggar');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded.id);
            const id = decoded.id;
            req.user = await Login.findOne({ id }).select('-senha');
            console.log(req.user);
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json('não autorizado, token invalido');
            return;
        }
    } else {
        res.status(401).json('não autorizado, sem token');
    }
});

module.exports = { protect };
