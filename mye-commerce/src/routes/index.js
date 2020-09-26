var express = require('express');
var router = express.Router();
var indexController = require("../controllers/indexControllers");
var mercadoPago = require("../controllers/checkout");
const visit_page = require("../middlewares/visit_page");


/* GET home page. */
router.get('/',visit_page, indexController.index);
router.get("/search", indexController.search);

// GET Mercado Pago
router.post('/generar_preferencia', mercadoPago.checkout);
router.get('/pago_exitoso', mercadoPago.successPayment);
router.get('/pago_rechazado', mercadoPago.failedPayment);

module.exports = router;
