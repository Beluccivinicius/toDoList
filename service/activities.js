const ToDoModel = require('../model/Activities');
const uuid = require('uuid');
const asyncHandler = require('express-async-handler');

const activitiesService = {
    create: async (activity, id) => {
        if (!activity.oQueFazer) {
            return console.log('insira o que vamos fazer');
        }

        const { oQueFazer, dataCerta, horaCerta } = activity;

        let arrayDate = dataCerta.split('-');

        let takeOutYear = arrayDate.shift();
        let takeOutMonth = arrayDate.shift();

        arrayDate.push(takeOutMonth);
        arrayDate.push(takeOutYear);

        let dateToString = arrayDate.join('/');

        if (dateToString == '/') {
            dateToString = 'sem data';
        }

        const getToDoUser = await ToDoModel.find({ user: id });

        console.log(getToDoUser.length);

        if (getToDoUser.length < 1) {
            const toDo = await ToDoModel.create({ user: id, whatToDo: [{ Do: oQueFazer, hour: horaCerta, date: dateToString }] });
            return;
        } else {
            const toDo = await ToDoModel.findOneAndUpdate({ user: id }, { $push: { whatToDo: { Do: oQueFazer, hour: horaCerta, date: dateToString } } }, { upsert: true });
            return;
        }
    },
    deleteOne: async (idToDo, idUser) => {
        const excluison = await ToDoModel.updateOne({}, { $pull: { whatToDo: { _id: idToDo } } });
        return;
    },
    getAll: async (id) => {
        const getAll = await ToDoModel.find({ user: id }).lean();

        if (getAll.length < 1) {
            return;
        }

        let allToDo = getAll[0].whatToDo;
        return allToDo;
    },
    edit: async (req, res) => {
        const { id, oQueFazer, dataCerta, horaCerta } = req.body;
        const update = { oQueFazer, dataCerta, horaCerta };

        const edit = await ToDoModel.updateOne({ id, update });
    }
};

module.exports = activitiesService;
