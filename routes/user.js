const express = require('express');
const router = express.Router();

const { userById } = require('../controlers/user')
const { requireSignin, isAdmin, isAuth } = require('../controlers/auth')


router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});

router.param('userId', userById)

module.exports = router;

