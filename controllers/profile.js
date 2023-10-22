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
        let cpfFormatted = undefined;

        const files = fs.readdirSync(users);

        const arquivoExiste = files.includes(img);

        if (arquivoExiste == false) {
            img = 'fotoperfildefault.svg';
        }

        const infos = await Perfil.takePerfil(id);

        let { email, nome, cpf } = infos;

        const stringCpf = cpf.toString();

        if (cpf) {
            const threeFirstElement = stringCpf.substring(0, 3);
            const threeSecondElement = stringCpf.substring(3, 6);
            const threeThirdElement = stringCpf.substring(6, 9);
            const twoLastElement = stringCpf.substring(9, 11);
            cpfFormatted = threeFirstElement + '.' + threeSecondElement + '.' + threeThirdElement + '-' + twoLastElement;
        }

        res.render('perfil', {
            style: 'profile.css',
            img,
            email: email,
            nome: nome,
            cpf: cpfFormatted
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
        const oi = await Perfil.editProfile(req.body, id)
            .then((res) => console.log(res))
            .catch((res) => console.log(res));
    })
);

module.exports = router;
