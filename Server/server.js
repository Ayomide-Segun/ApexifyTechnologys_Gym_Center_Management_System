const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db')
require('dotenv').config();
const cron = require('node-cron');

const deleteUnverifiedUsers = require('./utils/cleanupUnverifiedUsers')

const userRoutes = require('./routes/userRoutes');
const specializationRoutes = require('./routes/specializationRoutes');
const classRoutes = require('./routes/classRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

cron.schedule("0 0 * * *", () => {
    deleteUnverifiedUsers();
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', specializationRoutes);
app.use('/api', classRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', subscriptionRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));


