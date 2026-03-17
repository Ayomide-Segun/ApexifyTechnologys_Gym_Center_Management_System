const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "trainer", "member", "user"]
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: [/^\d{11}$/, "Phone number must be exactly 11 digits"]
        },
        trainings:[
            {
                type : mongoose.Schema.Types.ObjectId,
                ref: "Specialization"
            }
        ],
        availability:[{
            type: String
        }],
        session:{
            type: String,
            required: true,
            enum: ["morning", "evening"]
        },
        gymId:{
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: String,
        classroom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        },
        preferredTime: {
            type: String
        },
        signUpReason: {
            type: String
        },
        weight: {
            type: String
        },
        existingCondition: [String],
        allergies:[String]
    },
    {
        timestamps: true
    }
)
const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;