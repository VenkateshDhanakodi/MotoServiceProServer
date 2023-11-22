var express = require('express');
var router = express.Router();
const motorCycleController = require('../controllers/motorCycleController.js');

router.get('/', motorCycleController.motorCycleList);
router.get('/:brand', motorCycleController.motorCycleBrandModels);

module.exports = router;