// Import các thứ viện và module
var createError = require('http-errors');
var express = require('express');
//? update passport
var passport = require('passport');
var session = require("express-session");
var FileStore = require("session-file-store")(session);
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import các route
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cakeRouter = require("./routes/cakeRouter");
var config = require('./config');

// Cấu hình và nối MongoDB
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then(
  (db) => {
    console.log("Connect correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

// Khởi tạo ứng dụng Express
var app = express();

// Cấu hình express-session middleware
app.use(
  session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

//? Cấu hình passport
var authenticate = require('./authenticate');
app.use(passport.initialize());
app.use(passport.session());


app.use("/users", usersRouter);



// Cấu hình view engine và middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//? Sử dụng các route
app.use('/', indexRouter);
app.use("/cakes", cakeRouter);

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
