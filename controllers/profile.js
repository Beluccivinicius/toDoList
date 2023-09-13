const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage } = require('../Utils/multerConfig');
const upload = multer({ storage: storage });
// const { upload } = multer({ dest: path.resolve('users') });

router.get(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const imgList = [];
        const id = req.cookies.id;
        imgList.push({ src: `./users/${id}_profilePhoto.png` });
        console.log(imgList[0].src);
        if (imgList.length < 1) {
            imgList.push({ src: '/images/fotoperfildefault.svg' });
            res.render('perfil', {
                style: 'profile.css',
                imgList: imgList
            });
        } else {
            res.render('perfil', {
                style: 'profile.css',
                imgList: imgList
            });
        }
    })
);

// '/perfil'
//changePhoto
router.post(
    '/newPhoto',
    protect,
    upload.single('photo'),
    asyncHandler(async (req, res) => {
        console.log(req.cookies.id);
        res.json('ok');
    })
);

//'/perfil'
//updateInformation
router.post('/trocar/Informacao', (req, res) => {
    const { email, senha } = req.body;
});

module.exports = router;
