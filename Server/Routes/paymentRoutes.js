const express = require('express');
const router = express.Router();
const { createCheckoutSession, allPayments, deletePayment, obtainSession, updatePayment } = require('../controllers/paymentController')

router.post('/checkout-session', createCheckoutSession);
router.get('/all-payments', allPayments);
router.delete('/delete-payment/:id', deletePayment);
router.get('/checkout-session/:id', obtainSession);
router.patch('/update-payment/:id', updatePayment);

module.exports = router;