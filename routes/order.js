const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require('../controlers/auth');
const { userById } = require('../controlers/user');
const { create } = require("../controlers/order")

router.post('/order/create/:userId', create )

router.param('userId', userById);

module.exports = router;