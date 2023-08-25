const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

//'/perfil''
//access /perfil
router.get('/', async (req, res) => {
    try {
        res.render('perfil', {
            style: 'profile.css'
        });
    } catch (error) {}
});

// '/perfil'
//changePhoto
router.post('/', (req, res) => {
    const foto = req.body;
});

//'/perfil'
//updateInformation
router.post('/trocar/Informacao', (req, res) => {
    const { email, senha } = req.body;
});
module.exports = router;
