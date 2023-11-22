var express = require('express');
var router = express.Router();
const serviceController = require('../controllers/serviceController.js');

//get
router.get('/', serviceController.getService);
router.get('/:name', serviceController.coveredServices);

module.exports = router;