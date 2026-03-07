const Class = require('../models/Class');

exports.addClass = async(req, res) => {
    const {name, training, trainer, capacity, session, time} = req.body;
    try{
        const trainingClass = await Class.create({
            name,
            training,
            trainer,
            session,
            session,
            time
        })
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
        const trainingClass = await Class.find();
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