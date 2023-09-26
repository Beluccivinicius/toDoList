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
        const today = new Date();
        const split = JSON.stringify(today).split('-');
        const [year, month, day] = split;
        const id = req.cookies.id;
        const toDo = await activitiesService.getAll(id);
        const days = [];

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
        try {
            const activity = req.body;
            const id = req.cookies.id;
            await activitiesService.create(activity, id);
        } catch (error) {
            res.status(500).end('Deu erro');
            console.log(error);
        }
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
    const { id } = req.params;
    try {
        const toDo = await activitiesService.getAll();
        const deleted = await activitiesService.deleteOne(id);
        res.status(200).json(toDo);
    } catch (error) {
        res.status(500).end('Deu erro');
        console.log(error);
    }
});

//Edit toDo
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await activitiesService.edit(id);
        const toDo = await activitiesService.getAll();

        res.render('atividades', {
            style: 'atividades.css',
            script: 'atividades.js',
            toDo
        });
    } catch (error) {
        res.status(500).end('Deu erro');
    }
});

module.exports = router;
