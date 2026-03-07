const express = require('express');
const router = express.Router();
const {addClass, updateClass, deleteClass, allClasses} = require('../controllers/classController');

router.post('/add-class', addClass);
router.patch('/update-class/:id', updateClass);
router.delete('/delete-class/:id', deleteClass);
router.get('/all-classes', allClasses);

module.exports = router;