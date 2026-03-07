const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail')

exports.register = async(req, res) => {
    const { username, email, password, role, phone, trainings, availability, session, classroom, preferredTime, signUpReason, weight, existingConditions, allergies } = req.body;
    try{
        const userExist = await User.findOne({username});
        if(userExist){
            return res.status(400).json({
                message: 'Username has been taken'
            })
        }

        const emailExist = await User.findOne({email});
        if(emailExist){
            return res.status(400).json({
                message: 'Email has been used'
            })
        }

        const phoneExist = await User.findOne({phone});
        if(phoneExist){
            return re.status(400).json({
                message: 'Phone number has been used'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");
        let gymId;

        if(role === "member"){
            const memberCount = await User.countDocuments({
                role: "member"
            })
            gymId = "MBR" + (memberCount + 1)
        }else if(role === "trainer"){
            const trainerCount = await User.countDocuments({
                role: "trainer"
            })
            gymId = "TRN" + (trainerCount + 1)
        }else if(role === "user"){
            const userCount = await User.countDocuments({
                role: "user"
            })
            gymId = "USR" + (userCount + 1)
        }else {
            const adminCount = await User.countDocuments({
                role: "admin"
            })
            const gymId = "ADM" + (adminCount + 1)
        }
        
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
            phone,
            trainings,
            availability,
            session,
            verificationToken,
            gymId,
            classroom,
            preferredTime,
            signUpReason,
            weight,
            existingConditions,
            allergies
        });

        const verificationURL = `
    http://localhost:5000/api/user/verify/${verificationToken}
        `;

        await sendEmail(
            email,
            "Verify your account",
            `<h3>Click to verify:</h3><a href="${verificationURL}">Verify</a>`
        );

        res.status(201).json(
            {
                message: 'registration successful. Please verify your email.',
                data: user
            }
    );
    } catch (error){
        console.log(error)
        res.status(500).json({
            message: 'Server error!'
        })
    }
};

exports.verifyEmail = async(req, res) => {
    const user = await User.findOne({
        verificationToken: req.params.token
    });
    if (!user) {
        return res.status(400).json({
            message: "Invalid token"
        });
    };
    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();
    res.json({message : "Email verified successfully"});
}

exports.login = async(req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                Message: "Incorrect username or password"
            })
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                Message: "Incorrect username or password"
            })
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        res.json(token);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            Message: "Server error"
        })
    }
}

exports.deleteUser = async(req, res) => {
    const {id} = req.params;
    try{
        const deleteUser = User.findByIdAndDelete(id);
        res.status(204).json({
            message: "User successfully deleted"
        });
    }catch (error){
        console.log(error);
        res.status(500).json({
            message: "Uer deletion failed"
        })
    }
    
};

exports.allUsers = async(req, res) => {
    try{
        const users = await User.find().select("-find");
        if(!users.length) {
            return res.status(200).json({
                message: "No user found",
                data: []
            })
        }
        res.status(200).json(users)
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: "Unable to retrieve users"
        })
    }
};