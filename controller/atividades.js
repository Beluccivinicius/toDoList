const express = require('express');
const toDo = require('../model/toDoList');
const router = express.Router();
const uuid = require('uuid');

router.get('/', (req, res) =>
    res.render('index', {
        toDo,
        style: 'atividades.css',
        scitpt: 'atividades.js'
    })
);

// router.get('/:dia', (req, res) => {
//     const compromisso = toDo.filter((element) => element.dia == req.params.dia);
//     if (compromisso.length < 1) {
//         return res.json('Você está livre');
//     }
//     res.json(compromisso[0].oQueFazer);
// });

router.post('/', (req, res) => {
    const { oQueFazer, dia, hora, prioridade } = req.body;
    const horaCerta = toDo.some((element) => element.hora == req.body.hora);
    const [, mesCerto, dataCerta] = dia.split('-');
    const compromisso = {
        id: uuid.v4(),
        oQueFazer,
        dataCerta,
        mesCerto,
        hora,
        prioridade
    };
    if (!oQueFazer) {
        return res.status(400).redirect('/tarefas');
    }
    if (horaCerta == true && dia == toDo.dataCerta) {
        return res.status(400).json({ msg: 'você já tem compromisso nessa hora' });
    }
    if (!dia) {
        return res.status(400).json({ msg: 'coloque o dia' });
    } else if (dia > 31 || dia < 0) {
        return res.status(400).json({ msg: 'dia invalido' });
    }
    toDo.push(compromisso);
    res.redirect('/tarefas');
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const apagar = toDo.findIndex((element) => element.id == id);
    if (apagar == -1) {
        console.log('olá');
        return res.status(404).end();
    }
    toDo.splice(apagar, 1);
    res.redirect('/tarefas');
});

module.exports = router;
