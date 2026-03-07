const mongoose = require('mongoose');
const specializationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        }
    }
)

module.exports = mongoose.model('Specialization', specializationSchema);