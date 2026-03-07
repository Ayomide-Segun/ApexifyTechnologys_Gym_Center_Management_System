const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        const connection = mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (error){
        console.error("MongoDB error: ", err)
    }
}
module.exports = connectDB;

