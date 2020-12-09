const express = require('express')
const router = express.Router()

const { createPaymentIntent } = require('../controlers/stripe');
const {authCheck} = require('../middleswares');

router.post('/create-payment-intent', authCheck, createPaymentIntent );

module.exports = router;