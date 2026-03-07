const express = require('express');
const router = express.Router();

const {register, login, deleteUser, allUsers, verifyEmail} = require('../controllers/userControllers');
const {protect, adminOnly} = require('../middleWare/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.delete('/delete-user/:id', deleteUser);
router.get('/all-users', allUsers);
router.get('/user/verify/:token', verifyEmail);
module.exports = router;