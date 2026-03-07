const mongoose = require('mongoose');
const mealPlanSchema = new mongoose.Schema(
    {
        member: {
            type: String,
            required: true
        },
        trainer: {
            type: String,
            required: true
        },
        signUpReason: String,
        monday: [String],
        tuesday: [String],
        wednesday: [String],
        thursday: [String],
        friday: [String],
        saturday: [String],
        sunday: [String],
        existingConditions: [String],
        allergies: [String]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('MealPlan', mealPlanSchema);