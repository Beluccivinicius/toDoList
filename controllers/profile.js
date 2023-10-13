const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const sharp = require('sharp');
const { storage } = require('../middleware/multerMiddleware');
const upload = multer({ storage: storage });
const path = require('path');
const users = path.resolve('public', 'users');
const fs = require('fs');
const Perfil = require('../service/profile.js');

router.get(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const id = req.cookies.id;
        let img = `${id}_profilePhoto.png`;

        const files = fs.readdirSync(users);
        const arquivoExiste = files.includes(img);

        if (arquivoExiste == false) {
            img = 'fotoperfildefault.svg';
        }

        const infos = await Perfil.takePerfil(id);

        let { email, nome, codigo } = infos;

        if (nome == undefined || nome == '') {
            nome = 'naoTem';
        } else if (codigo == undefined || codigo == '') {
            codigo = 'naoTem';
        }

        res.render('perfil', {
            style: 'profile.css',
            img,
            email: email,
            nome: nome,
            codigo: codigo
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
        console.log(req.body);
        const update = await Perfil.editProfile(req.body, id);
    })
);

module.exports = router;
