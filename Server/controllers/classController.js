const Class = require('../models/Class');
const User = require('../Models/User');

exports.addClass = async(req, res) => {
    const {name, training, trainer, capacity, session, time, days} = req.body;
    try{
        const trainingClass = await Class.create({
            name,
            training,
            trainer,
            capacity,
            session,
            time,
            days
        })

        await User.findByIdAndUpdate(
            trainer,
            {classroom: trainingClass._id},
            {returnDocument: "after"}
        )

        res.status(201).json({
            message: "Class added successfully"
        }) 
    }catch(error) {
        console.log(error)
        res.status(500).json({
            message: "Unable to add class"
        })
    }
}

exports.allClasses = async(req, res) => {
    try{
        const trainingClass = await Class
        .find()
        .populate("training")
        .populate("trainer");
        res.status(200).json(trainingClass);
    } catch(error) {
        res.status(500).json({
            message: "Unable to fetch class"
        });
    }
}

exports.updateClass = async(req, res) => {
    const {id} = req.params;
    try{
        const trainingClass = await Class.findByIdAndUpdate(id, req.body, {returnDocument: 'after'});
        res.status(201).json({
            message: "Class updated successfully"
        })
    } catch(error) {
        res.status(500).json({
            message: "update failed"
        })
    }
}

exports.deleteClass = async(req, res) => {
    const {id} = req.params;
    try{
        const trainingClass = await Class.findByIdAndDelete(id);
        res.status(204).json({
            message: "Class deleted successfully"
        })
    } catch(error) {
        res.status(500).json({
            message: "Unable to delete class"
        })
    }
}