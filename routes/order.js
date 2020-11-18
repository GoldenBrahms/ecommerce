const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require('../controlers/auth');
const { userById,userInviteById, addOrderToUserHistory } = require('../controlers/user');
const { create } = require("../controlers/order")

router.post('/order/create/:userId', isAuth, create )
router.post('/order/createInvite/:userInviteId', create )

router.param('userId', userById);
router.param('userId', userInviteById);

module.exports = router;