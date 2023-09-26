const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let token = req.body;
    console.log(token);
    res.render('token', {
        style: 'token.css'
    });
    // res.status(200);
});

module.exports = router;
