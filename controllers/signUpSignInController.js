const {dbUrl, mongoose} = require('../config/dbConfig');
const {userModel} = require('../models/userSchema');
const {hashPassword, comparePassword, createToken} = require('../middleware/auth');
const nodemailer = require('nodemailer'); // Importing nodemailer module
require('dotenv').config(); // Loading environment variables from .env file
mongoose.connect(dbUrl);

const signUp = async (req, res) => {
    let { firstName, lastName, email, mobile, password } = req.body;

    // Check if firstName and lastName are provided
    if (!firstName || !lastName) {
        return res.status(400).json({
            message: "First name and last name are required",
        });
    }

    try {
        // Check if the email already exists
        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        // If the email doesn't exist, create the user
        const hashedPassword = await hashPassword(password);
        const newUser = await userModel.create({
            userName: `${firstName} ${lastName}`,
            email,
            mobile,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Signed up successfully",
            data: newUser,
            // You can include a token here if needed
        });
    } catch (error) {
        console.error("Error during sign-up:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
};

const signIn = async(req, res)=>{
    let {email, password} = req.body;
    console.log(email, password);
    try {
        let oldUser = await userModel.findOne({email});
        if(oldUser){
            let comparedPassword = await comparePassword(password, oldUser.password);
            if(!comparedPassword){
                res.status(404).send({
                    message: "Invalid Credentials"
                })
            }else{
                let userData = {userName:oldUser.userName, email: oldUser.email, id:oldUser._id, mobile:oldUser.mobile}
                let token = await createToken(userData);
                res.status(200).send({
                    message: "Login successfull",
                    user: userData,
                    token
                })
            }
        }else{
            res.status(400).send({
                message:"The requested login denied due to email is not registered in the system"
            })
        }
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error});
    }
};

const resetPasswordEmail = async (user_mail, resetToken) => {
    // Creating a transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Using environment variable
            pass: process.env.EMAIL_PASSWORD, // Using environment variable
        },
    });

    // Constructing the reset link
    // const resetLink = `http://localhost:3377/api/resetPassword/${resetToken}`;
    const resetLink = `http://localhost:3000/reset-password/routing/${resetToken}`;

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER, // app-specific email
        to: user_mail, // receiver's email
        subject: 'Password Reset',
        text: `Hello, This is in regards of Password-Reset for MotoServicePro website. Click the link to reset your password: ${resetLink}`,
    };

    try {
        await transporter.sendMail(mailOptions); // Sending the email
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.log("Error in resetPasswordEmail:", error);
    }
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const emailExist = await userModel.findOne({ email });
        if (emailExist) {
            let token = await createToken({
                userName: emailExist.userName,
                email: emailExist.email,
                id: emailExist._id,
                mobile: emailExist.mobile,
            });
            emailExist.token = token;
            await emailExist.save();
            await resetPasswordEmail(email, token);

            return res.status(200).json({
                message: "Email verified, existing user. Reset password link sent through email",
                token,
            });
        } else {
            return res.status(400).json({
                message: "Access denied due to email not being registered in the system",
            });
        }
    } catch (error) {
        console.error("Error during forgetPassword:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
};

const resetPassword = async(req, res)=>{
    try {
        const {newPassword, confirmPassword} = req.body;
        const token = req.token;
        if(newPassword !== confirmPassword){
            res.status(400).send({
                message:"The new password and confirm password is not matching"
            })
        }
        let passwordUpdate = await userModel.findOne({token});
        if(passwordUpdate){
            const newPass = await hashPassword(newPassword)
            passwordUpdate.password = newPass;
            passwordUpdate.token = undefined;
            await passwordUpdate.save();
            res.status(201).send({
                message: "Password updated succsfully"
            })
        }else{
            res.status(400).send({
                message:"Token is Invalid"
            })
        }
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error});
    }
}

module.exports = {signUp, signIn, forgetPassword, resetPassword, resetPasswordEmail};