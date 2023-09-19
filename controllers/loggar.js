const express = require('express');
const router = express.Router();
const loggarServices = require('../service/loggar');
const asyncHandler = require('express-async-handler');
const generateToken = require('../Utils/generateToken');
const fs = require('fs');
// const dir = './users/';

// fs.readdir(dir, (err, arquivos) => {
//     arquivos.forEach((arquivo) => {
//         console.log(arquivo);
//     });
// });

//load '/login'
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const imgList = [];
        const id = req.cookies.id;
        imgList.push({ src: `/users/${id}_profilePhoto.png` });

        console.log(imgList);
        if (imgList.length < 1) {
            imgList.push({ src: '/images/fotoperfildefault.svg' });
        }
        res.render('login', {
            style: 'loggar.css',
            imgList: imgList
        });
    })
);

//processo de login
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const compare = await loggarServices.login(req.body);
        if (compare) {
            const newToken = await generateToken(res, compare);
            const id = compare._id;
            res.cookie('id', id);
            res.cookie('jasonWebToken', newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
                sameSite: 'strict', // Prevent CSRF attacks
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            });
            res.redirect('/atividades');
        } else {
            res.status(500).render('login', {
                style: 'loggar.css',
                noLogin: true
            });
        }
    })
);

//criar novo usuário
router.post(
    '/newUser',
    asyncHandler(async (req, res, next) => {
        const { email, senha } = req.body;
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        const emailRegex = regex.test(`${email}`);

        if (emailRegex == true) {
            const emailCreate = await loggarServices.createAccount(req.body);

            let token = generateToken(res, emailCreate);
        }

        res.json(emailCreate);
    })
);

module.exports = router;
