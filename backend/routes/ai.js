const express = require('express');
const router = express.Router();
const { explainConcept, generateRoadmap, analyzeResume, interview, finalizeInterview } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/explain', protect, explainConcept);
router.post('/roadmap', protect, generateRoadmap);
router.post('/analyze-resume', protect, analyzeResume);
router.post('/interview', protect, interview);
router.post('/finalize-interview', protect, finalizeInterview);

module.exports = router;
