const express = require('express');
const router = express.Router();
const User = require('../Models/User')

const {register, login, deleteUser, allUsers, verifyEmail, updateUser} = require('../controllers/userControllers');
const {protect, adminOnly} = require('../middleWare/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.delete('/delete-user/:id', deleteUser);
router.get('/all-users', allUsers);
router.get('/user/verify/:token', verifyEmail);
router.patch('/update-user/:id', updateUser);
router.get("/test", async (req, res) => {
  const users = await User.find().populate("subscription");
  res.json(users);
});
module.exports = router;