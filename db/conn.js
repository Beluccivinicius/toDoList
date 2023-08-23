const mongoose = require('mongoose');
require('dotenv').config();
const variavelSenha = process.env.DB_PASSWORD;
const variavelUser = process.env.DB_USER;

main = async () => {
    try {
        mongoose.set('strictQuery', true);

        await mongoose.connect(`mongodb+srv://viniciusbelucci:${variavelSenha}@cluster0.7nalwnj.mongodb.net/?retryWrites=true&w=majority`);

        console.log('conectado ao servidor');
    } catch (error) {
        console.log(`erro ${error}`);
    }
};

module.exports = main;
