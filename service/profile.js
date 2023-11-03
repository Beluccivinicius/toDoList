const Login = require('../model/Loggar');
const asyncHandler = require('express-async-handler');

const profileService = {
    takePerfil: asyncHandler(async (id) => {
        const profile = await Login.findById(id).select('-senha');
        return profile;
    }),
    editProfile: asyncHandler(async (nome, email, cpf, id) => {
        if (cpf != undefined) {
            await Login.findByIdAndUpdate({ _id: id }, { nome, email, cpf }).select('-senha');
            return;
        }

        await Login.findByIdAndUpdate({ _id: id }, { nome, email }).select('-senha');
        return;
    })
};

module.exports = profileService;
