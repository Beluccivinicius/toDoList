const express = require('express');
const router = express.Router();
const loggarServices = require('../service/loggar');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

router.get('/', (req, res) =>
    res.render('login', {
        style: 'loggar.css'
    })
);

//processo de login
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const compare = await loggarServices.login(req.body);
        console.log(compare);
        if (compare == true) {
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
        const emailCreate = await loggarServices.createCount(newLoggin);
        res.json(emailCreate);
    })
);

module.exports = router;
