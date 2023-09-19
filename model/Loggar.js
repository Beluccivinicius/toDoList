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
            required: false
        }
    },
    { timestamps: true }
);

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
