var express = require('express');
var router = express.Router();
const signUpSignInController = require('../controllers/signUpSignInController.js');
const {validate} = require('../middleware/auth.js');

router.post('/signUp', signUpSignInController.signUp);
router.post('/signIn', signUpSignInController.signIn);
router.post('/forgetPassword', signUpSignInController.forgetPassword);
router.post('/resetPassword', validate, signUpSignInController.resetPassword);

module.exports = router;