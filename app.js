/**
 * @module team14/app
 */

'use strict';

// basic express modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// view engine modules
var exphbs = require('express-handlebars');

// authentication
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

var configurePassport = require('./config/passport');

// handlers
var ErrorHandler = require('./handlers/error');
var IndexHandler = require('./handlers/index');

// routers
var getIndexRouter = require('./routes/index');

var app = express();

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', exphbs({defaultLayout: 'layout', extname: '.html'}));
app.set('view engine', '.html');

// set basic properties
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// set passport
app.use(session({
  secret: 'whysosalty',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

configurePassport(passport);

var indexRouter = getIndexRouter(IndexHandler, passport);

// set routes
app.use('/', indexRouter);

// set error handlers
app.use(ErrorHandler.pageNotFound);
app.use(ErrorHandler.handlePageError);

module.exports = app;
