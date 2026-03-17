const express = require('express');
const router = express.Router();
const { createCheckoutSession, allPayments } = require('../controllers/paymentController')

router.post('/checkout-session', createCheckoutSession);
router.get('/all-payments', allPayments);

module.exports = router;