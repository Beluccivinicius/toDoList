const ToDoModel = require('../model/Activities');
const uuid = require('uuid');

const activitiesService = {
    create: async (activity, id) => {
        if (!activity.oQueFazer) {
            return console.log('insira o que vamos fazer');
        }
        const { oQueFazer, dataCerta, horaCerta } = activity;
        const [ano, mes, dia] = activity.dataCerta.split('-');
        try {
            const post = await ToDoModel.create({ oQueFazer, ano, mes, dia, horaCerta, user: id });
            return;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    deleteOne: async (id) => {
        try {
            const excluison = await ToDoModel.deleteOne({ _id: `${id}` });
            return excluison;
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (id) => {
        try {
            const getAll = await ToDoModel.find({ user: id });
            return getAll.map((doc) => doc.toObject());
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    edit: async (req, res) => {
        const { id, oQueFazer, dataCerta, horaCerta } = req.body;
        const update = { oQueFazer, dataCerta, horaCerta };

        try {
            const edit = await ToDoModel.updateOne({ id, update });
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = activitiesService;
