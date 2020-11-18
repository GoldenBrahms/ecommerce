const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require('../controlers/auth')
const { userById, userInviteById, read, update, purchaseHistory } = require('../controlers/user');


router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.get('/user1/:userInviteId', read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

router.param('userId', userById)
router.param('userInviteId', userInviteById)

module.exports = router;

