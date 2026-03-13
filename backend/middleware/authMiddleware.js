const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token - with Demo mode fallback
            try {
                if (mongoose.connection.readyState !== 1) {
                    throw new Error('Database not connected');
                }
                req.user = await User.findById(decoded.id).select('-password');
                if (!req.user) throw new Error('User not found');
            } catch (dbError) {
                // Return a mock user for Demo Mode
                req.user = { 
                    _id: decoded.id || 'demo_user', 
                    name: decoded.name || 'Demo Maverick',
                    email: decoded.email || 'maverick@sector7.dev',
                    role: 'user'
                };
            }

            next();
        } catch (error) {
            console.error('Auth Error:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
