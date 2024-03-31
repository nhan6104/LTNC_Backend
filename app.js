var createError = require('http-errors');
var express = require('express');
var path = require('path');


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var patientRouter = require('./routes/patientRoute');

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/patient',  patientRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//! Routes
const users = require("./routes/users/index.route")  // import route main , import function
const admin = require("./routes/admin/index.route")
users(app);
// admin(app);









// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
