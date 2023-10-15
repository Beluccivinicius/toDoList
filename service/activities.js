const ToDoModel = require('../model/Activities');
const uuid = require('uuid');
const asyncHandler = require('express-async-handler');

const activitiesService = {
    create: async (activity, id) => {
        if (!activity.oQueFazer) {
            return console.log('insira o que vamos fazer');
        }
        const { oQueFazer, dataCerta, horaCerta } = activity;

        const getToDoUser = await ToDoModel.find({ user: id });

        console.log(getToDoUser.length);

        if (getToDoUser.length < 1) {
            console.log('estou aqui');
            const toDo = await ToDoModel.create({ user: id, whatToDo: [{ Do: oQueFazer, hour: horaCerta, date: dataCerta }] })
                .then((res) => console.log(res))
                .catch((res) => console.log(res));
            console.log(toDo);
            return;
        } else {
            console.log('eu estou aqui 2');
            const toDo = await ToDoModel.findOneAndUpdate({ user: id }, { $push: { whatToDo: { Do: oQueFazer, hour: horaCerta, date: dataCerta } } }, { upsert: true })
                .then((res) => console.log(res))
                .catch((res) => console.log(res));
            console.log(toDo);
        }
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
