const express = require('express');
const router = express.Router();

const {addSpecialization, allSpecializations} = require('../controllers/specializationController');

router.post('/add-specialization', addSpecialization);
router.get('/all-specializations', allSpecializations)

module.exports = router;