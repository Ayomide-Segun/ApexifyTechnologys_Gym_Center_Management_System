const User = require('../models/User');

const deleteUnverifiedUsers = async() => {
    await User.deleteMany({
        isVerified: false,
        createdAt: {$lt: Date.now() - 24 * 60 * 60 *1000}
    });
    console.log("Unverified user cleaned up")
}

module.exports = deleteUnverifiedUsers