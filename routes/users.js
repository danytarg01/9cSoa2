var express = require('express');
var router = express.Router();
const model = require('../models/model_contacto');

router.get("/editar/:idUser", async (req, res) => {
  let resultados = await model.listar();
  let objEdicion = await model.obtenerUno(req.params.idUser);
  res.render("home", { listado: resultados, objEdidion: objEdicion });
});

router.post("/guardar", async (req, res) => {
  let user = {};
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await model.agregar(user);
  res.redirect("/");
});

router.post("/editar/:idUser", async (req, res) => {
  let user = {};
  user.idUser = req.params.idUser;
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await model.actualizar(user);
  res.redirect("/");
});

router.get('/borrar/:idUser', async (req, res) => {
  await model.borrar(req.params.idUser);
  res.redirect("/");
});

router.get('/setup', async (req, res) => {
  await model.crearEstructuraDatos();
  res.send('ok');
})

module.exports = router;
