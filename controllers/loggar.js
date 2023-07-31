const express = require('express');
const Login = require('../model/Login');
const router = express.Router();
const activitiesService = require('../service/activity');

router.get('/', (req, res) =>
    res.render('login', {
        style: 'loggar.css'
    })
);

//processo de login
router.post('/', async (req, res, next) => {
    const { email, senha } = req.body;
    const compare = await Login.find({ email: `${email}`, senha: `${senha}` });

    if (compare.lenght < 1) {
        res.send('Senha ou Email incorreto');
        return;
    }
    try {
        const toDo = await activitiesService.getAll();
        res.render('atividades', {
            style: 'atividades.css',
            script: 'atividades.js',
            toDo
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
