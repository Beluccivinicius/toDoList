const jwt = require('jsonwebtoken');

const generateToken = (res, id) => {
    const date = Date.now();
    const token = jwt.sign({ id, date }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    return token;
};

module.exports = generateToken;
