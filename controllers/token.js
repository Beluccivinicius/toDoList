const express = require('express');
const router = express.Router();
const cache = require('../Utils/cache');
const loginServices = require('../service/loggar');
const generateToken = require('../Utils/generateToken');
const asyncHandler = require('express-async-handler');
const { sharp } = require('sharp');

router.get('/', async (req, res) => {
    res.render('token', {
        style: 'token.css'
    });
});

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { codigo } = req.body;
        const id = req.cookies.id;

        if (cache.codigoVerificacao == 'expirado') {
            console.log('reenviar código');
            return;
        }

        if (codigo == cache.codigoVerificacao) {
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
            return;
        }
    })
);

module.exports = router;
