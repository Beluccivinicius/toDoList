const Login = require('../model/Loggar');
const ToDoModel = require('../model/Activities');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const loginServices = {
    login: asyncHandler(async (login) => {
        const { email, senha } = login;
        const loginCerto = await Login.findOne({ email });
        const emailMember = loginCerto.email;
        if (loginCerto && (await bcrypt.compare(senha, loginCerto.senha))) {
            const newToken = generateToken(email, loginCerto._id);
            return { newToken, emailMember };
        }
        return;
    }),
    createAccount: asyncHandler(async (newLogin) => {
        const { email, senha } = newLogin;
        const compare = await Login.find({ email });
        console.log(compare);
        if (compare.length > 0) {
            return console.log((emailCreate = true));
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senha, salt);
            const newMember = await Login.create({ email, senha: hashSenha });
            const id = newMember._id;
            await Login.findOneAndUpdate({ email: email }, { token: generateToken(newMember.email, newMember._id) });
            return console.log(`conta criada com sucesso`);
        }
    })
};

const generateToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
};

module.exports = loginServices;
