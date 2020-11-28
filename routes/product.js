const express = require('express');
const router = express.Router();

const { getProduct, create, productById, read, remove, update } = require('../controlers/product')
const { requireSignin, isAdmin, isAuth } = require('../controlers/auth')
const { userById } = require('../controlers/user')

router.get('/product/:productId', read)
router.get('/product', getProduct)
router.delete('/product/:productId/:userId',requireSignin, isAdmin, isAuth, remove)
router.post('/product/create/:userId', requireSignin, isAdmin, isAuth, create);
router.put('/product/update/:productId/:userId', requireSignin, isAdmin, isAuth, update);

router.param("userId", userById)
router.param("productId", productById)

{/*router.get('/hello', requireSignin, (req, res) => {
    res.send("hello there");
});*/}

module.exports = router;