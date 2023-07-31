const express = require('express');
const router = express.Router();
const activitiesService = require('../service/activity');
const ToDoModel = require('../model/toDoList');

router.get('/:id', async (req, res, next) => {
    const { id } = req.params.id;
    const toDo = await activitiesService.deleteOne(id);

    try {
        res.render('atividades', {
            style: 'atividades.css',
            script: 'atividades.js',
            toDo
        });
    } catch (error) {
        res.status(500).json({ msg: 'Algo deu errado' });
        console.log(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const toDo = await activitiesService.getAll();
        res.render('atividades', {
            style: 'atividades.css',
            script: 'atividades.js',
            toDo
        });
    } catch (error) {
        res.status(500).end('<h1>Deu erro</h1>');
    }
});

router.post('/', async (req, res, next) => {
    try {
        const activity = req.body;
        await activitiesService.create(activity);
        const toDo = await activitiesService.getAll();
        res.render('atividades', {
            style: 'atividades.css',
            script: 'atividades.js',
            toDo
        });
    } catch (error) {
        res.status(500).json('Deu erro');
    }
});

router.put('/:id', async (req, res, next) => {
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
        res.status(500).json('Deu erro');
    }
});

module.exports = router;
