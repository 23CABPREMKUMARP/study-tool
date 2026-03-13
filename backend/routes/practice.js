const express = require('express');
const router = express.Router();
const { generateProblem, compileAndRun, generateFlashcards } = require('../controllers/practiceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateProblem);
router.post('/run', protect, compileAndRun);
router.post('/flashcards', protect, generateFlashcards);

module.exports = router;
