const express = require('express');
const router = express.Router();
const loggarServices = require('../service/loggar');
const asyncHandler = require('express-async-handler');
const generateToken = require('../Utils/generateToken');

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
        console.log(`${compare} oi`);
        if (compare) {
            const newToken = generateToken(res, compare._id);
            res.status(200).render('atividades', {
                style: 'activities.css',
                noLogin: false
            });
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
