// 📦 /controllers/FeedbackController.js
console.log('📦 /controllers/FeedbackController.js mounted');

const Feedback = require('../models/Feedback');

/**
 * @route   POST /api/feedback/new
 * @desc    Submit new feedback
 * @access  Public (may be restricted later with auth middleware)
 */
exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error('[FeedbackController] Failed to submit feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

/**
 * @route   GET /api/feedback/job/:jobId
 * @desc    Fetch feedback entries for a given job
 * @access  Public
 */
exports.getFeedbackForJob = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({ jobId: req.params.jobId })
      .populate('fromUser', 'username role')
      .populate('toUser', 'username role');

    res.json({ feedback: feedbackList }); // ✅ Frontend expects feedback inside a `feedback` key
  } catch (error) {
    console.error('[FeedbackController] Failed to fetch feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};
