const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require('../controlers/auth');
const { userById, userInviteById } = require('../controlers/user');
const { generateToken, processPayment } = require("../controlers/braintree")

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken )
router.get('/braintree/getToken1/:userInviteId', generateToken )
router.post('/braintree/getToken/:userId', requireSignin, isAuth, processPayment )
router.post('/braintree/getToken1/:userInviteId', processPayment )

router.param('userId', userById);
router.param('userInviteId', userInviteById);
module.exports = router;