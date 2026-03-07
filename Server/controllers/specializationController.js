const Specialization = require('../models/Specialization');

exports.addSpecialization = async(req, res) => {
    const {name} = req.body;
    try{
        const specialization = await Specialization.create({
            name
        });
        res.status(201).json(specialization);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Couldn't add specialization"
        });
    }
}

exports.allSpecializations = async(req, res) => {
    try{
        const specialization = await Specialization.find();
        res.status(200).json(specialization)
    } catch(err) {
        res.status(500).json({
            message: "Couldn't fetch specializations"
        })
    }
}