const Subscription = require('../models/Subscription');

exports.addSubscription = async(req, res) => {
    const {name, price, maxClassesPerWeek, hasPersonalTrainer, hasCustomWorkout, hasDietPlan} = req.body;
    try{
        const subscription = await Subscription.create({
            name, 
            price,
            maxClassesPerWeek, 
            hasPersonalTrainer, 
            hasCustomWorkout, 
            hasDietPlan
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

exports.updateSubscription = async(req, res) => {
    const {id} = req.params;
    try{
        const subscription = await Subscription.findByIdAndUpdate(
            id,
            req.body,
            {returnDocument: 'after'}
        )
    res.status(201).json({
            message: "Subscription updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to update subscription"
        })
    }
}

exports.deleteSubscription = async(req, res) => {
    const {id} = req.params;
    try{
        const subscription = await Subscription.findByIdAndDelete(
            id
        )
    res.status(201).json({
            message: "Subscription deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to delete subscription"
        })
    }
}