const Login = require('../model/Loggar');
const ToDoModel = require('../model/Activities');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const loginServices = {
    login: asyncHandler(async (login) => {
        const { email, senha } = login;
        const loginCerto = await Login.findOne({ email });
        if (loginCerto && (await bcrypt.compare(senha, loginCerto.senha))) {
            return loginCerto;
        }
        return;
    }),
    createAccount: asyncHandler(async (newLogin) => {
        const { email, senha } = newLogin;
        const compare = await Login.find({ email });
        if (compare.length > 0) {
            return console.log((emailCreate = true));
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senha, salt);
            const newMember = await Login.create({ email, senha: hashSenha });
            const id = newMember._id;
            return id;
        }
    })
};

module.exports = loginServices;
