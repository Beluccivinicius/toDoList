const express = require('express');
const login = require('../model/Login');
const router = express.Router();

router.get('/', (req, res) =>
    res.render('login', {
        title: 'Área de login',
        login,
        style: 'loggar.css'
    })
);

//processo de login
router.post('/', (req, res) => {
    const { email, senha } = req.body;
    if (email !== login.email || senha !== login.senha) {
        return res.status(400).json({ msg: 'Não está autorizado' });
    }
    res.redirect('/tarefas');
});

module.exports = router;
