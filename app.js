var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var hugo = require('./hugo');

var app = express();
hbs.registerHelper('section', function (name, options) {
  if (!this._sections) this._sections = {};
  this._sections[name] = options.fn(this);
  return null;
});
hbs.registerHelper('json', function(context) {
  context = context || {};
  return JSON.stringify(context);
});
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.' + app.get('env') + '.ico')));
app.use('/', hugo.modules.routes());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler will print stacktrace
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
