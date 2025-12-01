
const ForgetPassword = require('../models/ForgetPassword');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Générer un code aléatoire
const generateCode = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
};

const requestResetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const code = generateCode();
        
        const forgetPassword = new ForgetPassword({
            email,
            code,
            date: new Date(),
            user: user._id
        });

        await forgetPassword.save();

        // Envoi du mail  avec le code de réinitialisation
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
              user: "notification@prologic.com.tn",
              pass: "*73zDw:41Hh!V",
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Code',
            text: `Your password reset code is: ${code}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email', error });
            }
            res.status(200).json({ message: 'Reset code sent to email' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;

    try {
        const forgetPassword = await ForgetPassword.findOne({ email, code });
        if (!forgetPassword) {
            return res.status(400).json({ message: 'Invalid code or email' });
        }

        const user = await User.findById(forgetPassword.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();


        await ForgetPassword.deleteOne({ _id: forgetPassword._id });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = {
    requestResetPassword,
    resetPassword
};
