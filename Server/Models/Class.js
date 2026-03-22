const mongoose = require('mongoose');
const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        training: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Specialization"
        },
        trainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        capacity: {
            type: Number,
            required: true
        },
        session: {
            type: String,
            enum: [
                "morning",
                "evening"
            ],
            required: true
        },
        time: {
            type: String,
            required: true
        },
        days: [{
            type: String,
            enum: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday"
            ]
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Class", classSchema);