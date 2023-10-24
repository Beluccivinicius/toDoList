const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { validateCPF, standardizedCpf } = require('../Utils/verificationCpf');
const { storage } = require('../middleware/multerMiddleware');
const upload = multer({ storage: storage });
const path = require('path');
const users = path.resolve('public', 'users');
const cache = require('../Utils/cache');
const fs = require('fs');
const profileService = require('../service/profile.js');

router.get(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const id = req.cookies.id;
        let img = `${id}_profilePhoto.png`;

        const files = fs.readdirSync(users);

        const imageExists = files.includes(img);

        if (imageExists == false) {
            img = 'fotoperfildefault.svg';
        }

        const infos = await profileService.takePerfil(id);

        const { email, nome, cpf } = infos;

        // cache[`${id}_profile`] = [email, nome, cpf];

        console.log(cache);

        const formatedCpf = await standardizedCpf(cpf);

        console.log('resultado :' + standardizedCpf(cpf));
        res.render('perfil', {
            style: 'profile.css',
            img,
            email,
            nome,
            cpf: formatedCpf
        });
    })
);

// '/perfil'
//changePhoto multer
router.post(
    '/newPhoto',
    protect,
    upload.single('photo'),
    asyncHandler(async (req, res) => {
        res.json('ok');
    })
);

//'/perfil'
//updateInformation
router.patch(
    '/informacao',
    asyncHandler(async (req, res) => {
        const id = req.cookies.id;
        const { nome, email, cpf } = req.body;

        const response = await validateCPF(cpf);

        const { input, type, isValid, formated, raw } = response;

        if (isValid === true) {
            const updater = await profileService.editProfile(nome, email, raw, id);
            res.status(201);
        } else {
            console.log('oi');
            res.end({ msg: 'hello' });
        }
    })
);

module.exports = router;
