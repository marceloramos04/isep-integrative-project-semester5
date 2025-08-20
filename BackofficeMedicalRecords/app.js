var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var DatabaseConnection = require('./database');

var indexRouter = require('./routes/index');
var routerAllergy = require('./routes/route-allergy');
var routerRoomType = require('./routes/route-roomType');
var routerMedicalCondition = require('./routes/route-medical-condition');
var routerMedicalRecord = require('./routes/route-medical-record');

var app = express();
var dbConnection = new DatabaseConnection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/allergies', routerAllergy);
app.use('/roomType', routerRoomType);
app.use('/medical-conditions', routerMedicalCondition);
app.use('/medical-records', routerMedicalRecord);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app, dbConnection;
