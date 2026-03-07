const MealPlan = require('../models/MealPlan');

exports.addMealPlan = async(req, res) => {
    const {member, trainer, signUpReason, weight, monday, tuesday, wednesday, thursday, friday, saturday, sunday, existingConditions, allergies} = req.body;
    try{
        const mealPlan = await MealPlan.create({
            member, 
            trainer,
            signUpReason, 
            weight, 
            monday, 
            tuesday, 
            wednesday, 
            thursday, 
            friday, 
            saturday, 
            sunday,
            existingConditions,
            allergies
        });
        res.status(201).json({
            message: "MealPlan plan added successfully"
        })
    }catch(error) {
        res.status(500).json({
            message: "Failed to add MealPlan"
        })
    }
}

exports.allMealPlan = async(req, res) => {
    try{
        const mealPlan = await MealPlan.find();
        res.status(200).json(mealPlan);
    } catch (error){
        res.status(500).json({
            message: "Unable to retrieve MealPlan"
        });
    }
}

exports.updateMealPlan = async(req, res) => {
    const { id } = req.params;
    try{
        const mealPlan = await MealPlan.findByIdAndUpdate(id, req.body, {returnDocument: 'hex'});
        res.status(201).json({
            message: "Meal plan updated successfully"
        })
    }catch(error) {
        res.status(500).json({
            message: "Update failed"
        })
    }
}