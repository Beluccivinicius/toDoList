const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const loginSchema = new Schema(
    {
        nome: {
            type: String,
            required: true,
            unique: false
        },
        verificado: {
            type: Boolean,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        senha: {
            type: String,
            required: true,
            unique: false
        },
        cpf: {
            type: Number,
            required: false,
            unique: true
        }
    },
    { timestamps: true }
);

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
