const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/new', feedbackController.submitFeedback);
router.get('/:jobId', feedbackController.getFeedbackForJob);

module.exports = router;
