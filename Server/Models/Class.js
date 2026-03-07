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
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Class", classSchema);