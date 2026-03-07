const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema(
    {
        classroom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        },
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        quantity: String,
        subscription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscription"
        },
        paymentMethod: {
            type: String,
            enum: [
                "stripe", 
                "payPal"
            ]
        },
        transactionId: String,
        status: {
            type: String,
            enum: [
                "pending", 
                "successful", 
                "failed"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Payment', paymentSchema)