const express = require('express');
const router = express.Router();
const activitiesService = require('../service/activity');

router.get('/:id', async (req, res) => {
    console.log('oi');
    const { id } = req.params;
    await activitiesService.deleteOne(id);
    const toDo = await activitiesService.getAll();
    res.render('atividades', {
        style: 'atividades.css',
        script: 'atividades.js',
        Img: 'botãoExcluir.jpg',
        toDo
    });
});

router.get('/', async (req, res) => {
    const toDo = await activitiesService.getAll();
    res.render('atividades', {
        style: 'atividades.css',
        script: 'atividades.js',
        toDo
    });
});

router.post('/', async (req, res) => {
    const activity = req.body;
    const create = await activitiesService.create(activity);
    const toDo = await activitiesService.getAll();
    res.render('atividades', {
        style: 'atividades.css',
        script: 'atividades.js',
        toDo
    });
});

module.exports = router;
