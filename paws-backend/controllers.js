const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Generate JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d'
    });
};

exports.signup = async (req, res) => {
    try {
        const { fullName, email, phone, password, confirmPassword } = req.body;

        // 1) Validate inputs
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all required fields'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'fail',
                message: 'Passwords do not match'
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a valid email'
            });
        }

        // 2) Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already in use'
            });
        }

        // 3) Create new user
        const newUser = await User.create({
            fullName,
            email,
            phone,
            password
        });

        // 4) Generate JWT token
        const token = signToken(newUser._id);

        // 5) Remove password from output
        newUser.password = undefined;

        // 6) Send response
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        // 2) Check if user exists and password is correct
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            });
        }

        // 3) Generate token
        const token = signToken(user._id);

        // 4) Remove password from output
        user.password = undefined;

        // 5) Send response
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};