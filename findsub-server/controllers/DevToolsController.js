// 📦 /controllers/DevToolsController.js
console.log('📦 /controllers/DevToolsController.js mounted');

const User = require('../models/User');
const Job = require('../models/Job');

/**
 * @route   POST /api/devtools/create-user
 * @desc    Create a new test user (default password should be handled externally)
 * @access  Public (Dev only - limit in production)
 */
exports.createTestUser = async (req, res) => {
  try {
    const testUser = new User(req.body);
    await testUser.save();
    res.status(201).json(testUser);
  } catch (error) {
    console.error('[CREATE TEST USER ERROR]', error);
    res.status(500).json({ error: 'Failed to create test user' });
  }
};

/**
 * @route   POST /api/devtools/create-job
 * @desc    Create a test job manually
 * @access  Public (Dev only - limit in production)
 */
exports.createTestJob = async (req, res) => {
  try {
    const testJob = new Job(req.body);
    await testJob.save();
    res.status(201).json(testJob);
  } catch (error) {
    console.error('[CREATE TEST JOB ERROR]', error);
    res.status(500).json({ error: 'Failed to create test job' });
  }
};
