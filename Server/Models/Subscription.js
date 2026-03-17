const mongoose = require('mongoose');
const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            "Silver", 
            "Gold", 
            "Platinum"
        ],
        required: true
    },

    price: Number,

    duration: Number, // days

    maxClassesPerWeek: Number,

    hasPersonalTrainer: Boolean,
    hasCustomWorkout: Boolean,
    hasDietPlan: Boolean
})
const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema)
module.exports = Subscription;