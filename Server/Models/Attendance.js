const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema(
    {
        attendee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            enum: [
                "present",
                "absent"
            ],
            default: "absent"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Attendance', attendanceSchema);