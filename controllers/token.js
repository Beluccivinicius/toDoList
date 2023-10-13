const express = require('express');
const router = express.Router();
const cache = require('../Utils/cache');
const loginServices = require('../service/loggar');
const generateToken = require('../Utils/generateToken');
const asyncHandler = require('express-async-handler');
const Perfil = require('../service/profile.js');
const sendEmail = require('../Utils/nodeMailer');

router.get('/', async (req, res) => {
    res.render('token', {
        style: 'token.css'
    });
});

router.get(
    '/codigo-seguranca',
    asyncHandler(async (req, res) => {
        const numberRandom = await cache.random();

        const id = req.cookies.id;

        const getEmail = await Perfil.takePerfil(id);

        const nome = getEmail.nome;
        //const email = getEmail.email - Pegar o Email que a pessoa passou
        const email = `vinicius.belucci@outlook.com`; //email no ambiente de desenvolvimento

        cache[id] = numberRandom;
        console.log(cache);
        cache.expirar(numberRandom);

        const message = await sendEmail(nome, email, numberRandom)
            .then((res) => console.log(res))
            .catch((res) => console.log(res));

        res.status(200);
        res.redirect('/token');
    })
);

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { codigo } = req.body;
        const id = req.cookies.id;

        if (cache[id] == 'expirado') {
            console.log('reenviar código');

            res.redirect('/token');
            return;
        }

        if (codigo == cache[id]) {
            const updateData = await loginServices.verificado(id);

            const newToken = await generateToken(res, id);

            res.cookie('jasonWebToken', newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
                sameSite: 'strict', // Prevent CSRF attacks
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 dias
            });

            res.redirect('/atividades');
        } else {
            console.log('token errado');
            res.redirect('/token');
            return;
        }
    })
);

module.exports = router;
