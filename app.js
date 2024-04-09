var createError = require('http-errors');
var express = require('express');
var path = require('path');

var patientRouter = require('./routes/patientRoute');
var doctorRouter = require('./routes/doctorRoute');
<<<<<<< HEAD
var medicineRouter = require('./routes/medicineRoute');
var medicalEquipRouter = require('./routes/medicalEquipRoute');
=======
var staffRouter = require('./routes/staffRoute');
>>>>>>> bebdc7fe817361af919a682339f4338ee2b9ee57

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', `${__dirname}/views`)  
app.set('view engine', 'jade')

app.use('/api/v1/patient',  patientRouter);
app.use('/api/v1/doctor',  doctorRouter);
<<<<<<< HEAD
app.use('/api/v1/medicine',  medicineRouter);
app.use('/api/v1/medicalEquip',medicalEquipRouter);
=======
app.use('/api/v1/staff',  staffRouter);
>>>>>>> bebdc7fe817361af919a682339f4338ee2b9ee57

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

module.exports = app;
