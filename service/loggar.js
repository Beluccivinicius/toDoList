const Login = require('../model/Loggar');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const loginServices = {
    login: asyncHandler(async (login) => {
        const { email, senha } = login;

        const loginCerto = await Login.findOne({ email });

        if (loginCerto && (await bcrypt.compare(senha, loginCerto.senha))) {
            return loginCerto._id;
        }

        return;
    }),
    createAccount: asyncHandler(async function* (newLogin) {
        const { email, senha } = newLogin;
        const jaExisteEmail = true;
        const create = true;

        const compare = await Login.find({ email });

        if (compare.length >= 1) {
            return jaExisteEmail;
        }
        console.log(compare);
        const emailExiste = yield compare;

        const [codigo, token, hashSenha] = emailExiste;

        const newMember = await Login.create({ email, senha: hashSenha, codigo, token });

        return create;
    })
};

module.exports = loginServices;
