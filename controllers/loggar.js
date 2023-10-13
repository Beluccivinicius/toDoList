const express = require('express');
const router = express.Router();
const loggarServices = require('../service/loggar');
const asyncHandler = require('express-async-handler');
const generateToken = require('../Utils/generateToken');
const fs = require('fs');
const path = require('path');
const users = path.resolve('public', 'users');
const sendEmail = require('../Utils/nodeMailer');
const bcrypt = require('bcrypt');
const { protect } = require('../middleware/authMiddleware');
const axios = require('axios');

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const id = req.cookies.id;

        let img = `${id}_profilePhoto.png`;

        const files = fs.readdirSync(users);
        const arquivoExiste = files.includes(img);

        if (arquivoExiste === false) {
            img = 'fotoperfildefault.svg';
        }

        res.cookie('img', img);

        res.render('login', {
            style: 'loggar.css',
            img
        });
    })
);

//processo de login
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { email, senha } = req.body;
        const compare = await loggarServices.login(req.body);
        const noLogin = true;

        if (compare) {
            const newToken = await generateToken(res, compare._id);

            res.cookie('id', compare._id);
            res.cookie('jasonWebToken', newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
                sameSite: 'strict', // Prevent CSRF attacks
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 dias
            });

            res.redirect('/atividades');
            return;
        } else {
            res.render('login', {
                style: 'loggar.css',
                noLogin,
                img: req.cookies.img
            });
        }
    })
);

//criar novo usuário
router.post(
    '/newUser',
    asyncHandler(async (req, res, next) => {
        const { nome, email, senha } = req.body;
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const loginJaExsite = true;
        const emailRegex = regex.test(`${email}`);

        if (emailRegex == false) {
            console.log(`${email} não é um email válido`);
            return;
        }
        const generator = await loggarServices.createAccount(req.body);

        const { value: emailExiste } = await generator.next();

        if (emailExiste == true) {
            console.log(`${email} já existe`);
            res.render('login', {
                style: 'loggar.css',
                loginJaExsite
            });
            return;
        }

        const token = generateToken(res, emailExiste._id);

        const infos = [token];

        const { value: tokenCodigo } = await generator.next(infos);

        if (tokenCodigo != true) {
            console.log('algo deu errado');
            res.status(400);
        }

        res.cookie('id', emailExiste._id);
        res.redirect('/token/codigo-seguranca');
        res.status(201);
    })
);

module.exports = router;
