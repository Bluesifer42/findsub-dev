const Feedback = require('../models/Feedback');
console.log('📦 /controllers/FeedbackController.js mounted');

exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

exports.getFeedbackForJob = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({ jobId: req.params.jobId });
    res.json(feedbackList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};
