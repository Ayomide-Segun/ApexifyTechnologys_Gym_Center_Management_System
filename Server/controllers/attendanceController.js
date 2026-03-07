const Attendance = require('../models/Attendance');

exports.addAttendance = async(req, res) => {
    const {attendee} = req.body;
    try{
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const signed = await Attendance.findOne({
            attendee,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay 
            }
        });

        if(signed){
            return res.status(400).json({
                Message: "Your attendance has been set for today"
            })
        };
    
        const attendance = await Attendance.create({
            attendee
        });
        res.status(201).json({
            message: "Attendance captured successfully"
        })
    } catch(error) {
        res.status(500).json({
            message: "Attendance capturing failed"
        })
    }
}

exports.signAttendance = async(req, res) => {
    const {id} = req.params;
    try{
        const attendance = await Attendance.findByIdAndUpdate(id, req.body, {returnDocument: 'after'});
        res.status(201).json({
            message: "Attendance captured successfully"
        });
    } catch(error) {
        res.status(500).json({
            message: "Attendance capturing failed"
        })
    }
}

exports.allAttendance = async(req, res) => {
    try{
        const attendance = await Attendance.find();
        res.status(200).json(attendance);
    }catch(error) {
        res.status(500).json({
            message: "Failed to retrieve attendance"
        })
    }
}