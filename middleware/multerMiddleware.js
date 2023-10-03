const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log('oiiiiii');
        callback(null, path.resolve('public', 'users'));
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime();
        const id = req.cookies.id;
        callback(null, `${id}_profilePhoto.png`);
    }
});

module.exports = { storage };
