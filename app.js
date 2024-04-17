var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var patientRouter = require('./routes/patientRoute');
var authenticateRouter = require('./routes/authenticateRoute');
var staffRouter = require('./routes/staffRoute');
var medicineRouter = require('./routes/medicineRoute');
var medicalEquipRouter = require('./routes/medicalEquipRoute');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(cors({
  origin: 'http://localhost:3001', // Change this to the actual origin of your frontend application
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', `${__dirname}/views`) 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', `${__dirname}/views`)  
app.set('view engine', 'jade')

app.use('/api/v1/patient',  patientRouter);
app.use('/api/v1/authenticate',  authenticateRouter);
app.use('/api/v1/staff',  staffRouter);
app.use('/api/v1/medicine',medicineRouter);
app.use('/api/v1/medicalEquip',medicalEquipRouter);

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
