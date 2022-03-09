const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const FileStore = require('session-file-store')(session);
const { welcomeUser } = require('./middleware/middle');
// const hbs = require('hbs');

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const courierRouter = require('./routes/courierRouter');

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  session({
    store: new FileStore({}),
    secret: 'abrakadabra',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    name: 'Kebab',
  }),
);

app.use(welcomeUser);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courier', courierRouter);
app.listen(PORT, () => {
  console.log('Server started on port: ', PORT);
});
