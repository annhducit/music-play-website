const createError = require('http-errors');
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');

const route = require('./routes');
const db = require('./config/db');
const credentials = require('./../credentials');

const app = express();

// Connect to Database
db.connect();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.engine(
    'hbs',
    hbs.engine({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            sum: function (a, b) {
                return a + b;
            },
            ifEqual: function (a, b, options) {
                return a === b ? options.fn(this) : options.inverse(this);
            },
        },
    }),
);
app.set('view engine', 'hbs');

app.use(logger('dev'));

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies header and populate req.cookies
app.use(cookieParser(credentials.cookieSecret));

// Add session functionality
app.use(
    expressSession({
        secret: credentials.sessionSecret,
        resave: false,
        saveUninitialized: false,
    }),
);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Add the flash obj to the context if it exists in session
app.use((req, res, next) => {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// Define routes
route(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
