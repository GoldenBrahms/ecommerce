const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require('../controlers/auth');
const { userById } = require('../controlers/user');
const { generateToken, processPayment } = require("../controlers/braintree")

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken )
router.post('/braintree/getToken/:userId', requireSignin, isAuth, processPayment )

router.param('userId', userById);
module.exports = router;