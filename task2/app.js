var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require('web3');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var enrollStudentRouter = require('./routes/enrollStudent');
var startClubRouter = require('./routes/startClub');
var addStudentToClubRouter = require('./routes/addStudentToClub');
var rewardStudentRouter = require('./routes/rewardStudent');

var MyContractJSON = require(path.join(__dirname, 'build/contracts/CSRewards.json'));

web3 = new Web3('http://localhost:8545');

// accountAddress = '0xd8d702f6AABC40266055A533f31b5098476B5361';

contracAddress = MyContractJSON.networks['5777'].address;
contractABI = MyContractJSON.abi;

MyContract = new web3.eth.Contract(contractABI, contracAddress);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/enroll-student', enrollStudentRouter);
app.use('/start-club', startClubRouter);
app.use('/add-student-to-club', addStudentToClubRouter);
app.use('/reward-student', rewardStudentRouter);

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
