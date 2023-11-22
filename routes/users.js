var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
/* GET users listing. */
router.get('/', userController.getUsers);

module.exports = router;
