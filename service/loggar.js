const Login = require('../model/Login');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const loginServices = {
    login: asyncHandler(async (login) => {
        const { email, senha } = login;
        const loginCerto = await Login.findOne({ email });
        if (loginCerto && (await bcrypt.compare(senha, loginCerto.senha))) {
            return true;
        } else {
            throw new Error('deu ruim');
        }
    }),
    createCount: asyncHandler(async (newLogin) => {
        const { email, senha } = newLogin;
        const compare = await Login.find({ email });
        console.log(compare);
        if (compare.length > 0) {
            return console.log((emailCreate = true));
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senha, salt);
            const newMember = await Login.create({ email, senha: hashSenha });
            return console.log(`conta criada com sucesso`);
        }
    })
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = loginServices;
