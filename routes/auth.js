const express = require('express');
const router = express.Router();

const {userSignupValidator , userInviteValidator} = require('../validator/index')
const {listComments, comments, signup, signin, signout, userinvite, sendmail, requireSignin, updateUser } = require('../controlers/auth')

router.post('/signup', userSignupValidator, signup);
router.post('/userinvite', userinvite, userInviteValidator);
router.post('/sendmail', sendmail);
router.post('/comments', comments);
router.get('/comments', listComments);
router.post('/signin', signin);
router.post('/updateuser', updateUser);
router.get('/signout', signout);

{/*router.get('/hello', requireSignin, (req, res) => {
    res.send("hello there");
});*/}

module.exports = router;