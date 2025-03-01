const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

module.exports = router;
