const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const toDoSchema = new Schema(
    {
        oQueFazer: String,
        dia: String,
        mes: String,
        ano: String,
        horaCerta: String,
        prioridade: String
    },
    { timeStamp: true }
);

const ToDoModel = mongoose.model('ToDo', toDoSchema);

module.exports = ToDoModel;
