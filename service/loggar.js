const Login = require('../model/Loggar.js');
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
        const { nome, email, senha } = newLogin;
        const jaExisteEmail = true;
        const created = true;

        const compare = await Login.find({ email });

        if (compare.length >= 1) {
            return jaExisteEmail;
        }

        const salt = await bcrypt.genSalt(10);
        const hashSenha = await bcrypt.hash(senha, salt);

        const newMember = await Login.create({ nome: nome, email: email, senha: hashSenha, verificado: false });

        const emailExiste = yield newMember._id;

        const [token] = emailExiste;

        const newToken = Login.findByIdAndUpdate(newMember._id, { token: token });

        return created;
    }),
    verificado: asyncHandler(async (id) => {
        const infos = Login.findByIdAndUpdate(id, { verificado: true });

        return;
    })
};

module.exports = loginServices;
