const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const loginSchema = new Schema(
    {
        nome: {
            type: String,
            required: false,
            unique: false
        },
        codigo: {
            type: String,
            required: false,
            unique: true
        },
        verificado: {
            type: Boolean,
            required: false,
            unique: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        senha: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
