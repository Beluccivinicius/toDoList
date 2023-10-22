const Login = require('../model/Loggar');
const asyncHandler = require('express-async-handler');
const validateCPF = require('../Utils/verificationCpf');

const perfil = {
    takePerfil: asyncHandler(async (id) => {
        const perfil = await Login.findById(id).select('-senha');
        return perfil;
    }),
    editProfile: asyncHandler(async (req, id) => {
        const { nome, email, cpf } = req;

        const { isValid, raw } = await validateCPF(cpf);

        if (isValid === true) {
            await Login.findByIdAndUpdate({ _id: id }, { nome, email, cpf: raw });
        }

        const update = await Login.findByIdAndUpdate({ _id: id }, { nome, email });
        return;
    })
};

module.exports = perfil;
