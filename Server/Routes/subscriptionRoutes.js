const express = require('express');
const router = express.Router();

const {allSubscription, addSubscription, updateSubscription, deleteSubscription} = require('../controllers/subscriptionController');

router.post('/add-subscription', addSubscription);
router.get('/all-subscriptions', allSubscription);
router.patch('/update-subscription/:id', updateSubscription);
router.delete('/delete-subscription/:id', deleteSubscription);

module.exports = router;