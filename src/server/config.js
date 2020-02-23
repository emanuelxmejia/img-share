const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorHandler');

const routes = require('../routes/index');

module.exports = app => {

    // --- settings
    app.set('port', process.env.PORT || 4400);
    app.set('views', path.join(__dirname, 'views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));

    app.set('view engine', '.hbs');

    // --- midlewares
    app.use(morgan('dev'));
    // saving the image in specific path / saving the type of extension of the image
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    // get data from forms html
    app.use(express.urlencoded({extended: false}));
    // stop refresh page when a user give a like / handler likes
    app.use(express.json());

    // --- routes
    routes(app);

    // --- static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // --- errorhandlers
    if('develpment' === app.get('env')) {
        app.use(errorHandler);
    }

    return app;
}