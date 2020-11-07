const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list} = require('../controlers/category')
const { requireSignin, isAdmin, isAuth } = require('../controlers/auth')
const { userById } = require('../controlers/user')

router.post('/category/create/:userId', requireSignin, isAdmin, isAuth, create);
router.get('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, read);
router.put('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, remove);
router.get('/categories', list)

router.param("categoryId", categoryById)
router.param("userId", userById)

{/*router.get('/hello', requireSignin, (req, res) => {
    res.send("hello there");
});*/}

module.exports = router;