var express = require('express');
var router = express.Router();
const ProductApiController = require('../../controllers/api/productApiController');

/* Crud Peliculas */
router.get('/', ProductApiController.index);
router.get('/:id', ProductApiController.show);

module.exports = router;