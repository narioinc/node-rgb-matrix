var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const matrix = require('rpi-led-matrix');
//const { createCanvas, loadImage } = require('canvas')
//const canvas = createCanvas(128, 64)

var indexRouter = require('./routes/index');
var demoRouter = require('./routes/demo');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/demo', demoRouter)


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
});

//*************************** */
// Create RGBMATRIX object and configure it
//
//**************************** */
const matrixOptions = {
  ...matrix.LedMatrix.defaultMatrixOptions(),
  rows: 64,
  cols: 64,
  chainLength: 2,
  hardwareMapping: matrix.GpioMapping.Regular,
  parallel: 1,
}

console.log("matrix options: ", JSON.stringify(matrixOptions, null, 2))

const runtimeOptions = {
  ...matrix.LedMatrix.defaultRuntimeOptions(),
  gpioSlowdown: 4,
  dropPrivileges: matrix.RuntimeFlag.Off
}

const rgbmatrix = new matrix.LedMatrix(matrixOptions, runtimeOptions);
rgbmatrix.brightness(50).sync();
app.set("matrix", rgbmatrix);

/************************************
 *  Initiate Konva Objects
 * 
 ************************************/
var Konva = require('konva');
var stage = new Konva.Stage({
  width: rgbmatrix.width(),
  height: rgbmatrix.height(),
});

app.set("stage", stage)

module.exports = app;
