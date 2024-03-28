var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





//! routes 
const users = require("./routes/users/index.route")  // import route main , import function
const admin = require("./routes/admin/index.route")
users(app);
admin(app);

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





/*

Bác sĩ:
Thông tin cá nhân:

Họ và tên
Giới tính
Ngày sinh
Số điện thoại
Email
Địa chỉ
Thông tin về chuyên ngành:

Chuyên khoa hoặc lĩnh vực chuyên môn
Trình độ học vấn và bằng cấp
Các bằng cấp và chứng chỉ liên quan
Thông tin công việc:

Bệnh viện hoặc phòng khám mà bác sĩ làm việc
Vị trí công việc (chức danh)
Thời gian làm việc
Thông tin tài khoản (nếu cần):

Tên đăng nhập
Mật khẩu
Y tá:
Thông tin cá nhân:

Họ và tên
Giới tính
Ngày sinh
Số điện thoại
Email
Địa chỉ
Thông tin về chuyên ngành (nếu có):

Trình độ học vấn và bằng cấp
Các khóa đào tạo hoặc chứng chỉ liên quan đến y tá
Thông tin công việc:

Bệnh viện hoặc phòng khám mà y tá làm việc
Vị trí công việc (chức danh)
Thời gian làm việc
Thông tin tài khoản (nếu cần):

Tên đăng nhập
Mật khẩu
 */

// git push --set-upstream origin HuyHoang87
