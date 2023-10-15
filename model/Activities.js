const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const toDoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Login'
    },
    whatToDo: [
        {
            Do: { type: String, required: true },
            hour: { type: String, required: false },
            date: { type: String, required: false }
        }
    ]
});

const ToDoModel = mongoose.model('ToDo', toDoSchema);

module.exports = ToDoModel;

// const toDoSchema = new Schema(
//     {
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: 'Login'
//         },
//         oQueFazer: {
//             type: String,
//             required: false
//         },
//         dia: {
//             type: String,
//             required: false
//         },
//         mes: {
//             type: String,
//             required: false
//         },
//         ano: {
//             type: String,
//             required: false
//         },
//         horaCerta: {
//             type: String,
//             required: false
//         }
//     },
//     { timeStamp: true }
// );
