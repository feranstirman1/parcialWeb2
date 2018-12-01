var express = require('express');
var router = express.Router();

var segurosController = require('../controllers/seguro');

//para los metodos get
router.get('/',segurosController.index);
router.get('/:id',segurosController.getSeguro);

//para el metodo post
router.post('/',segurosController.ingresarSeguro);

//metodo para el delete
router.delete('/:id',segurosController.eliminarSeguro);

//metodo para el update
router.put('/:id',segurosController.updateSeguro);

module.exports = router;