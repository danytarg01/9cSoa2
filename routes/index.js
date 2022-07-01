var express = require('express');
var router = express.Router();
const model = require('../models/model_contacto');

router.get('/', async (req, res) => {
  let resultados = await model.listar();
  res.render("home", { listado: resultados });
});

module.exports = router;
