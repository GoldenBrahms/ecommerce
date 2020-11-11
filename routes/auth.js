const express = require('express');
const router = express.Router();

const {userSignupValidator , userSigninValidator} = require('../validator/index')
const { signup, signin, signout, userinvite, requireSignin } = require('../controlers/auth')

router.post('/signup', userSignupValidator, signup);
router.post('/userinvite', userinvite);
router.post('/signin', signin);
router.get('/signout', signout);

{/*router.get('/hello', requireSignin, (req, res) => {
    res.send("hello there");
});*/}

module.exports = router;