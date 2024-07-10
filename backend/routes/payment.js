const express = require('express');
const paymentController = require('../controller/payment');
const router = express.Router();

router.post('/create-payment-intent', paymentController.createPaymentIntent);

module.exports = router;
