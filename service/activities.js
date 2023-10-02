const ToDoModel = require('../model/Activities');
const uuid = require('uuid');
const asyncHandler = require('express-async-handler');

const activitiesService = {
    create: async (activity, id) => {
        if (!activity.oQueFazer) {
            return console.log('insira o que vamos fazer');
        }
        const { oQueFazer, dataCerta, horaCerta } = activity;
        const [ano, mes, dia] = activity.dataCerta.split('-');

        const toDo = await ToDoModel.create({ oQueFazer, ano, mes, dia, horaCerta, user: id });
    },

    deleteOne: async (id) => {
        const excluison = await ToDoModel.deleteOne({ _id: `${id}` });

        return excluison;
    },
    getAll: async (id) => {
        const getAll = await ToDoModel.find({ user: id });

        return getAll.map((doc) => doc.toObject());
    },
    edit: async (req, res) => {
        const { id, oQueFazer, dataCerta, horaCerta } = req.body;
        const update = { oQueFazer, dataCerta, horaCerta };

        const edit = await ToDoModel.updateOne({ id, update });
    }
};

module.exports = activitiesService;
