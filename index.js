const express = require('express');
const { engine } = require('express-handlebars');
const loggar = require('./controller/loggar');
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router???
app.use('/tarefas', require('./controller/atividades'));
app.use('/login', require('./controller/loggar'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
