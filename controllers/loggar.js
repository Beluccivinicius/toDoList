const express = require('express');
const router = express.Router();
const loggarServices = require('../service/loggar');
const asyncHandler = require('express-async-handler');
const generateToken = require('../Utils/generateToken');
const fs = require('fs');
const sendEmail = require('../Utils/nodeMailer');
const bcrypt = require('bcrypt');

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const id = req.cookies.id;
        let img = `/users/${id}_profilePhoto.png`;

        if (img == '/users/_profilePhoto.png') {
            img = './users/fotoperfildefault.svg';
        }

        let noLogin;

        if (req.cookies.noLogin) {
            res.render('login', {
                style: 'loggar.css',
                img,
                noLogin
            });
        } else {
            res.render('login', {
                style: 'loggar.css',
                img
            });
        }
    })
);

//processo de login
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const compare = await loggarServices.login(req.body);

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
        }

        const noLogin = true;
        res.cookie('noLogin', noLogin);
        res.redirect('/login');
    })
);

//criar novo usuário
router.post(
    '/newUser',
    asyncHandler(async (req, res, next) => {
        const { nome, email, senha } = req.body;
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        const emailRegex = regex.test(`${email}`);

        if (emailRegex == false) {
            console.log(`${email} não é um email válido`);
            return;
        }
        console.log('oiiii');
        const generator = await loggarServices.createAccount(req.body);

        const { value: emailExiste } = await generator.next();
        console.log('meupasx');
        if (emailExiste == true) {
            console.log(`${email} já existe`);
            return;
        }

        const email1 = `vinicius.belucci@outlook.com`;
        const random = Math.random().toString(16).substr(2);
        const randomC = Math.random() * 100000;
        console.log(randomC);

        // token gmail não está sendo feito com sucesso
        // const emailVerificacao = await sendEmail(nome, email1, random);

        const token = generateToken(res, random);

        const salt = await bcrypt.genSalt(10);
        const hashSenha = await bcrypt.hash(senha, salt);

        const infos = [random, token, hashSenha];
        console.log('oi');
        const tokenCodigo = await generator.next(infos);

        if (tokenCodigo.value == true) {
            // res.send(random);
            res.render('/token');
        } else {
            console.log('algo deu errado');
            res.status(400);
        }
    })
);

module.exports = router;
