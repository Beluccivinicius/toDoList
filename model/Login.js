const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const loginSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
