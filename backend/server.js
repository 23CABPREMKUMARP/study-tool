const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/study-tool';

// Note: Improved connection logic for serverless
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(MONGO_URI);
        isConnected = true;
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Database connection warning (Demo mode):', err.message);
    }
};

// Middleware to ensure DB connection for every request
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'API System Online', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.send('AI Study Tool Backend API is running...');
});

// Import Routes
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const quizRoutes = require('./routes/quiz');
const practiceRoutes = require('./routes/practice');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/practice', practiceRoutes);

// For Vercel, we export the app. For local, we listen.
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        connectDB(); // Connect to DB after starting server
    });
}

module.exports = app;
