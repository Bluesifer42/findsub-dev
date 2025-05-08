// 📦 /routes/FeedbackRoutes.js
console.log('📦 /routes/FeedbackRoutes.js mounted');

const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/FeedbackController');

// ===============================
// 📋 Feedback Routes
// Prefix: /api/feedback
// ===============================

/**
 * Submit feedback for a job.
 * POST /api/feedback/new
 */
router.post('/new', FeedbackController.submitFeedback);

/**
 * Get all feedback for a specific job.
 * GET /api/feedback/job/:jobId
 */
router.get('/job/:jobId', FeedbackController.getFeedbackForJob);

module.exports = router;
