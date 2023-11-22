var express = require('express');
var router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');
const {validate} = require('../middleware/auth');

//get
router.post('/', validate, serviceRequestController.createService);
router.post('/', validate, serviceRequestController.updateService);

module.exports = router;