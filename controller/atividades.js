const express = require('express');
const toDo = require('../model/toDoList');
const router = express.Router();
const uuid = require('uuid');

router.get('/', (req, res) =>
    res.render('index', {
        title: 'toDo list',
        toDo
    })
);

router.get('/:dia', (req, res) => {
    console.log(req.params.dia);
    const compromisso = toDo.filter((element) => element.dia == req.params.dia);
    if (compromisso.length < 1) {
        return res.json('Você está livre');
    }
    res.json(compromisso[0].oQueFazer);
});

router.post('/', (req, res) => {
    const { oQueFazer, mes, dia, hora, minuto, prioridade } = req.body;
    const horaCerta = toDo.some((element) => element.hora == req.body.hora);
    const compromisso = {
        id: uuid.v4(),
        oQueFazer,
        mes,
        dia,
        hora,
        minuto,
        prioridade
    };
    if (horaCerta == true && dia == toDo.dia) {
        return res.status(400).json({ msg: 'você já tem compromisso nessa hora' });
    }
    if (!dia && !mes) {
        return res.status(400).json({ mgs: 'coloque o dia' }); //ele simplesmente não lê minha condição de ter um mês e um dia
    } else if (dia > 31 || dia < 0) {
        return res.status(400).json({ msg: 'dia invalido' });
    }
    if (!oQueFazer) {
        return res.status(400).json({ mgs: 'falta o que fazer ' });
    }

    toDo.push(compromisso);
    res.json(toDo);
});

router.delete('/:id', (req, res) => {
    const elementoDeletar = parseInt(req.params);
    const excluir = toDo.filter((element) => element.id == elementoDeletar);
    toDo.splice(excluir, 1);
    res.json(toDo);
});

module.exports = router;
