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
const cache = require('../Utils/cacheProfile');
const fs = require('fs');
const profileService = require('../service/profile.js');
const cacheProfile = require('../Utils/cacheProfile');

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

        const formatedCpf = await standardizedCpf(cpf);

        //upload infos for my cache
        cache[id] = [email, nome, formatedCpf];

        const expirar = cache.expirar(id);

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

        const infosInCache = cacheProfile[id];
        const [emailInCache, nameInCache, cpfInCache] = infosInCache;

        //evito o acesso no meu banco de dados sem necessidade se a pessoa não alterou nada
        if (nameInCache == nome && emailInCache == email && cpfInCache == cpf) {
            res.status(200);
            return;
        }

        //faço a validação do cpf e se realmente passou algum CPF
        const response = validateCPF(cpf);

        const { input, type, isValid, formated, raw } = response;

        if (isValid == true) {
            const updater = await profileService.editProfile(nome, email, raw, id);
            res.status(201);
        } else {
            res.send({ msg: 'CPF inválido' });
            res.status(200);
        }
    })
);

module.exports = router;
