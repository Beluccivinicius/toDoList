const express = require('express');
const router = express.Router();
const loggarServices = require('../service/loggar');
const asyncHandler = require('express-async-handler');
const generateToken = require('../Utils/generateToken');

//load '/login'
router.get('/', async (req, res) => {
    const imgList = [];
    const id = req.cookies.id;
    imgList.push({ src: `/users/${id}_profilePhoto.png` });
    if (imgList.length < 1) {
        imgList.push({ src: '/images/fotoperfildefault.svg' });
    }
    res.render('login', {
        style: 'loggar.css',
        imgList: imgList
    });
});

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
        const newLoggin = req.body;
        const emailCreate = await loggarServices.createAccount(newLoggin);

        if (emailCreate) {
            let token;
            token = generateToken(res, emailCreate);
        }
        res.json(emailCreate);
    })
);

module.exports = router;
