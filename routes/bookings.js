var express = require('express');
var router = express.Router();
const bookingController = require('../controllers/bookingController.js');

router.get('/', bookingController.getBooking);
router.post('/create-payment-intent', bookingController.createPaymentIntent);

module.exports = router;
