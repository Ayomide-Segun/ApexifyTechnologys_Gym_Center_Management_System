const Subscription = require('../models/Subscription');

exports.addSubscription = async(req, res) => {
    const {name, price, duration, maxClassesPerWeek, hasPersonalTrainer, hasCustomWorkout, features} = req.body;
    try{
        const subscription = await Subscription.create({
            name, 
            price, 
            duration, 
            maxClassesPerWeek, 
            hasPersonalTrainer, 
            hasCustomWorkout, 
            features
        })
        res.status(201).json({
            message: "Subscription plan added successfully"
        })
    }catch(error) {
        res.status(500).json({
            message: "Failed to add subscription"
        })
    }
}

exports.allSubscription = async(req, res) => {
    try{
        const subscription = await Subscription.find();
        res.status(200).json(subscription);
    } catch (error){
        res.status(500).json({
            message: "Unable to retrieve subscription"
        });
    }
}