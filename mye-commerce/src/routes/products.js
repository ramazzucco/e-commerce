var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsControllers")

router.get('/:category/:id', productsController.detail);
router.get('/:category', productsController.category);

module.exports = router;
