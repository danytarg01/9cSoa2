/*var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require("express-handlebars");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine(".hbs", exphbs({ defaultLayout: "default", extname: ".hbs" }));
app.set("view engine", ".hbs");


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;**/
/**
const app = require('express')()
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
require('express-async-errors');

const model = require('/models/model_contacto');

app.use(bodyParser.urlencoded({ extended: false }));
app.engine(".hbs", exphbs({ defaultLayout: "default", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Config
//const config = require("./config.json");
//const environment = process.env.NODE_ENV || "development";
//global.config = config[environment];

app.get('/', async (req, res) => {
  let resultados = await model.listar();
  res.render("home", { listado: resultados });
});

app.post("/", async (req, res) => {
  let contacto = {};
  contacto.nombre = req.body.nombre;
  contacto.apellido = req.body.apellido;
  contacto.telefono = req.body.telefono;
  contacto.email = req.body.email;
  await model.agregar(contacto);
  res.redirect("/");
});

app.get("/:id/editar", async (req, res) => {
  let resultados = await model.listar();
  let objEdicion = await model.obtenerUno(req.params.id);
  res.render("home", { listado: resultados, objEdidion: objEdicion });
});


app.post("/:id/editar", async (req, res) => {
  let contacto = {};
  contacto.id = req.params.id;
  contacto.nombre = req.body.nombre;
  contacto.apellido = req.body.apellido;
  contacto.telefono = req.body.telefono;
  contacto.email = req.body.email;
  await model.actualizar(contacto);
  res.redirect("/");
});

app.get('/:id/borrar', async (req, res) => {
  await model.borrar(req.params.id);
  res.redirect("/");
})


app.get('/setup', async (req, res) => {
  await model.crearEstructuraDatos();
  res.send('ok');
})

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
**/
const app = require('express')()
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
require('express-async-errors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine(
    "hbs",
    exphbs({
      extname: "hbs",
      defaultLayout: false,
      layoutsDir: "views/"
    })
);
app.set("view engine", ".hbs");
app.use('/', indexRouter);
app.use('/user', usersRouter);


// Config
const config = require("./config.json");
const environment = process.env.NODE_ENV || "development";
global.config = config[environment];

module.exports = app;