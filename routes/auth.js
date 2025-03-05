const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.json({ success: true, message: "Registration successful. You can now log in." });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        req.session.user = user;
        res.json({ success: true, message: "Login successful", redirect: '/' });

    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
});


router.get('/guest', (req, res) => {
    res.json({ success: true, redirect: '/guest' });
});

router.get('/package', (req, res) => {
    res.json({ success: true, redirect: '/package' });
});


router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password (or App Password if using Gmail)
    }
});

// Forgot Password Endpoint
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Generate a password reset token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Send reset email
        const resetLink = `http://localhost:8000/reset-password?token=${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click the following link to reset your password: ${resetLink}`
        });

        res.json({ success: true, message: "Password reset link sent" });

    } catch (error) {
        res.status(500).json({ error: "Error processing request" });
    }
});

// Reset Password Endpoint
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.json({ success: true, message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ error: "Invalid or expired token" });
    }
});


module.exports = router;
