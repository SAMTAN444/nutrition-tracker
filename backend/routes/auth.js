import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// REGISTER
router.post(
    '/register',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password')
            .isLength({ min: 8}).withMessage('Password must be at least 8 characters')
            .matches(/[A-Z]/).withMessage('Must contain an uppercase letter')
            .matches(/[a-z]/).withMessage('Must contain a lowercase letter')
            .matches(/\d/).withMessage('Must contain a number')
            .matches(/[\W_]/).withMessage('Must contain a special character'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

    const { username, password } = req.body;
    console.log("Received registration datat:", username, password);

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already in use." });

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
})

// LOGIN
router.post(
    '/login',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found"});
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
            res.status(200).json({ token, user: { id: user._id, username: user.username } });
            console.log("Logged in");
    } catch(err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
});

export default router;