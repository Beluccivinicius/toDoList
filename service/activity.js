const ToDoModel = require('../model/toDoList');
const uuid = require('uuid');

const activitiesService = {
    create: async (activity) => {
        // if (!activity.oQueFazer) {
        //     return { msg: 'insira o que vamos fazer' };
        // }

        // const { oQueFazer, dataCerta, horaCerta } = activity;
        try {
            const post = await ToDoModel.create(activity);
            return;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteOne: async (id) => {
        try {
            const excluison = await ToDoModel.remove({ _id: ObjectId(`${id}`) });
            return;
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async () => {
        try {
            const getAll = await ToDoModel.find();
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
