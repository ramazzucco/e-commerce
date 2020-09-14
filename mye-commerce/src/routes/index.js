var express = require('express');
var router = express.Router();
var indexController = require("../controllers/indexControllers");
var mercadoPago = require("../controllers/checkout");

/* GET home page. */
router.get('/', indexController.index);
router.get("/search", indexController.search);
router.post("/orderBy",indexController.orderBy);

// GET Mercado Pago
router.post('/generar_preferencia', mercadoPago.checkout);
router.get('/pago_exitoso', mercadoPago.successPayment);
router.get('/pago_rechazado', mercadoPago.failedPayment);

module.exports = router;
