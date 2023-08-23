const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Login = require('../model/Loggar');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.header.autorization;
    if (token) {
        try {
            const tokenJwt = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await Login.findOne(tokenJwt.login).select('-senha');
            if (tokenJwt.id == req.user.id) {
                next();
            }
        } catch (error) {
            console.log(error);
            res.status(401).json('não autorizado');
            return;
        }
    } else {
        res.status(401).json('não autorizado');
    }
});

module.exports = { protect };
