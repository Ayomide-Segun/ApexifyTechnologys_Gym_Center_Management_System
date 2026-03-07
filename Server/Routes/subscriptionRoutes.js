const express = require('express');
const subscriptionSchema = express.Router();

const {allSubscription, addSubscription} = require('../controllers/subscriptionController');

router.post('/add-subscription', addSubscription);
router.get('/all-subscriptions', allSubscription);