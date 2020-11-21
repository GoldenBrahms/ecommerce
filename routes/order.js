const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require('../controlers/auth');
const { userById, userInviteById, addOrderToUserHistory } = require('../controlers/user');
const { create, createInvite} = require("../controlers/order")

router.post('/order/create/:userId',requireSignin, isAuth, create )
router.post('/order/createInvite/:userInviteId', createInvite )

router.param('userId', userById);
router.param('userInviteId', userInviteById);

module.exports = router;