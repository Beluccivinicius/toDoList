const express = require('express');
const router = express.Router();
const loggarServices = require('../service/loggar');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { protect } = require('../middleware/authMiddleware');
const axios = require('axios');

router.get('/', (req, res) =>
    res.render('login', {
        style: 'loggar.css'
    })
);

//processo de login
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { email, senha } = req.body;
        const compare = await loggarServices.login(req.body);

        console.log(`${compare.newToken} oi ${compare.emailMember}`);
        if (compare) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
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
        res.json(emailCreate);
    })
);

module.exports = router;
