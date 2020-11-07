const express = require('express');
const router = express.Router();

const {userSignupValidator} = require('../validator/index')
const { signup, signin, signout, requireSignin } = require('../controlers/auth')

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

{/*router.get('/hello', requireSignin, (req, res) => {
    res.send("hello there");
});*/}

module.exports = router;