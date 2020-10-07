const express = require('express');
const router = express.Router();
const UsersApiController = require ('../../controllers/api/usersApiController');



router.get('/', UsersApiController.index);
router.get('/:id', UsersApiController.profile);


module.exports = router;
