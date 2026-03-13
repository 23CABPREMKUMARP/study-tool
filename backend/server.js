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

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/study-tool';

// Note: I'll use a separate db.js for cleaner connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Database connection warning (Demo mode):', err.message);
        console.log('Server starting without database connection...');
    }
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
