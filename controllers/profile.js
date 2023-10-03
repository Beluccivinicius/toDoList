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
const sendEmail = require('../Utils/nodeMailer');
const cache = require('../Utils/cache');

router.get(
    '/codigo-seguranca',
    asyncHandler(async (req, res) => {
        const random = () => {
            let random = parseInt(Math.random() * 100000);
            return random;
        };

        const numberRandom = random();
        const id = req.cookies.id;
        const getEmail = await Perfil.takePerfil(id);

        const nome = getEmail.nome;
        //const email = getEmail.email

        const email = `vinicius.belucci@outlook.com`;

        cache.codigoVerificacao = numberRandom;
        cache.expirar();

        const message = await sendEmail(nome, email, numberRandom)
            .then((res) => console.log(res))
            .catch((res) => console.log(res));

        res.status(200);
        res.redirect('/token');
    })
);

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
