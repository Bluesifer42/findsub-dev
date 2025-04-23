const User = require('../models/User');
const Job = require('../models/Job');
console.log('📦 /controllers/DevToolsController.js mounted');

exports.createTestUser = async (req, res) => {
  try {
    const testUser = new User(req.body);
    await testUser.save();
    res.status(201).json(testUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create test user' });
  }
};

exports.createTestJob = async (req, res) => {
  try {
    const testJob = new Job(req.body);
    await testJob.save();
    res.status(201).json(testJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create test job' });
  }
};
