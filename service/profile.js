const Login = require('../model/Loggar');
const asyncHandler = require('express-async-handler');

const perfil = {
    takePerfil: asyncHandler(async (id) => {
        const perfil = await Login.findById(id).select('-senha');
        return perfil;
    }),
    editProfile: asyncHandler(async (req, id) => {
        const { email, nome, codigo } = req;
        const update = await Login.findByIdAndUpdate({ _id: id }, { email, nome, codigo });
        return;
    })
};

module.exports = perfil;
