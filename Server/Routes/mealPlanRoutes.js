const express = require('express');
const mealPlanSchema = express.Router();

const {allMealPlan, addMealPlan, updateMealPlan} = require('../controllers/mealPlanController');

router.post('/add-meal-plan', addMealPlan);
router.get('/all-meal-plans', allMealPlan);
router.get('/update-meal-plan', updateMealPlan);