const express = require('express');
const router = express.Router();
const activitiesService = require('../service/activities');
const ToDoModel = require('../model/Activities');
const { protect } = require('../middleware/authMiddleware');

//get '/atividades'
router.get('/', protect, async (req, res, next) => {
    try {
        const token = req.user._id;
        console.log(`${token} ooiiiiii`);
        const toDo = await activitiesService.getAll(token);
        res.render('atividades', {
            style: 'activities.css',
            toDo
        });
    } catch (error) {
        res.status(500).end('Deu erro');
        console.log(error);
    }
});

//inserir toDo
router.post('/', protect, async (req, res, next) => {
    try {
        const activity = req.body;
        const token = req.user._id;
        await activitiesService.create(activity, token._id);
    } catch (error) {
        res.status(500).end('Deu erro');
        console.log(error);
    }
});

//logOut '/login'
router.post('/logout', async function logoutUser(req, res) {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).redirect('/login');
});

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
