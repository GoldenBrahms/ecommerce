const express = require('express');
const router = express.Router();

const {userSignupValidator , userInviteValidator} = require('../validator/index')
const { signup, signin, signout, userinvite, requireSignin } = require('../controlers/auth')

router.post('/signup', userSignupValidator, signup);
router.post('/userinvite', userinvite, userInviteValidator);
router.post('/signin', signin);
router.get('/signout', signout);

{/*router.get('/hello', requireSignin, (req, res) => {
    res.send("hello there");
});*/}

module.exports = router;