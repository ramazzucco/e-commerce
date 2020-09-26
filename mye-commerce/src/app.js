const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride =  require('method-override');
const session = require ('express-session');
const auth = require('./middlewares/auth');
const cors = require('cors');
require("dotenv").config();

const indexRouter = require('./routes/index');
const productsRouter = require("./routes/products");
const usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(
  session({
    secret:'algo le tenemos que pasar',
    resave: false,
    saveUninitialized: true
  })
);
app.use(auth);

app.use('/', indexRouter);
app.use("/products" , productsRouter);
app.use('/users', usersRouter);

app.use(cors())
app.get('/api/dashboard', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(90, function () {
  console.log('CORS-enabled web server listening on port 80')
})

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
