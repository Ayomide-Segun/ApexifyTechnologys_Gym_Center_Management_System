const express = require('express');
const router = express.Router();
const {addAttendance, signAttendance, allAttendance} = require('../controllers/attendanceController')

router.post('/add-attendance', addAttendance);
router.patch('/sign-in/:id', signAttendance);
router.get('/all-attendance', allAttendance);

module.exports = router;