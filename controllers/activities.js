const express = require('express');
const router = express.Router();
const activitiesService = require('../service/activities');
const ToDoModel = require('../model/Activities');
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

//entrar na página de atividades
router.get(
    '/',
    protect,
    asyncHandler(async (req, res, next) => {
        const id = req.cookies.id;
        const toDo = await activitiesService.getAll(id);

        res.render('atividades', {
            style: 'activities.css',
            toDo
        });
    })
);

//inserir toDo
router.post(
    '/',
    protect,
    asyncHandler(async (req, res, next) => {
        const activity = req.body;
        const id = req.cookies.id;
        await activitiesService.create(activity, id);
    })
);

//logOut '/login'
router.post(
    '/logout',
    asyncHandler(async (req, res) => {
        res.cookie('jasonWebToken', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).redirect('/login');
    })
);

//Delete toDo
router.delete('/:id', protect, async (req, res, next) => {
    const { idToDo } = req.params.id;
    const { idUser } = req.cookies;
    console.log(`${req.params} ${req.cookies} estou aqui`);
    try {
        const deleted = await activitiesService.deleteOne(idToDo, idUser);
        console.log(deleted + 'oi');
        res.status(200);
    } catch (error) {
        res.status(500).end('Deu erro');
        console.log(error);
    }
});

module.exports = router;
