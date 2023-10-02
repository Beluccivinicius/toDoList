const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const toDoSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Login'
        },
        data: {
            ano: {
                type: String,
                required: false
            },
            mes: {
                type: String,
                required: false
            },
            dia: {
                type: String,
                required: false
            }
        },
        oQueFazer: [
            {
                type: String,
                required: false
            }
        ],
        hora: [
            {
                hora: {
                    type: String,
                    required: false
                },
                minuto: {
                    type: String,
                    required: false
                }
            }
        ]
    },
    { timeStamp: true }
);

const ToDoModel = mongoose.model('ToDo', toDoSchema);

module.exports = ToDoModel;
