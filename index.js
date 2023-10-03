const express = require('express');
const { engine } = require('express-handlebars');
const { notFound, errorHandler } = require('./middleware/errMiddleware.js');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//DB connection
const conn = require('./db/conn');
conn();

//router
app.use('/atividades', require('./controllers/activities.js'));
app.use('/login', require('./controllers/loggar.js'));
app.use('/perfil', require('./controllers/profile.js'));
app.use('/token', require('./controllers/token.js'));

//tratamento de erro das APIs
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
