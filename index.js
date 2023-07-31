const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const cors = require('cors');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB connection
const conn = require('./db/conn');
conn();

//router
app.use('/atividades', require('./controllers/activities'));
app.use('/login', require('./controllers/loggar'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
