const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Application = require('../models/Application');

const DevTools = {
  async createTestUser(req, res) {
    try {
      const { username, role, isAdmin = false } = req.body;

      if (!username || !role) {
        return res.status(400).json({ message: 'Missing fields.' });
      }

      const email = `${username}@findsub.com`;

      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'User already exists.' });

      const hashedPassword = await bcrypt.hash('1234', 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        experienceLevel: 'Beginner',
        isAdmin
      });

      await newUser.save();
      res.status(201).json({ message: 'Test user created.', user: newUser });

    } catch (error) {
      console.error('DevTools: createTestUser error:', error);
      res.status(500).json({ message: 'Failed to create user.' });
    }
  }
};

module.exports = DevTools;

const Job = require('../models/Job');

DevTools.createTestJob = async function(req, res) {
  try {
    const { domId } = req.body;
    if (!domId) return res.status(400).json({ message: 'Missing Dom ID' });

    const testJob = new Job({
      posterId: domId,
      title: 'Test Foot Worship Session',
      description: 'This is a generated job for dev/testing purposes.',
      location: 'Test Dungeon',
      compensation: 'Exposure & a cookie',
      requirements: 'Must show up on time.',
      category: 'Boot Licker',
      startDate: new Date(Date.now() + 86400000), // tomorrow
      startTime: '19:00',
      minDuration: '2',
      expiresAt: new Date(Date.now() + 3 * 86400000),
      requiredKinks: [], // optional for now
    });

    await testJob.save();
    res.status(201).json({ message: 'Test job created.', job: testJob });
  } catch (error) {
    console.error('DevTools: createTestJob error:', error);
    res.status(500).json({ message: 'Failed to create job.' });
  }
};

DevTools.purgeCollection = async function(req, res) {
    const { type } = req.params;
  
    try {
      let result;
      switch (type) {
        case 'users':
          result = await User.deleteMany({ isAdmin: { $ne: true } });
          break;
        case 'jobs':
          result = await Job.deleteMany({});
          break;
        case 'applications':
          result = await Application.deleteMany({});
          break;
        case 'feedback':
          result = await Feedback.deleteMany({});
          break;
        default:
          return res.status(400).json({ message: 'Unknown purge type.' });
      }
  
      res.json({ message: `Purged ${type}`, result });
    } catch (err) {
      console.error(`DevTools: purge ${type} error:`, err);
      res.status(500).json({ message: `Failed to purge ${type}` });
    }
  };
  
  DevTools.createTestApplication = async function(req, res) {
    try {
      const { jobId, applicantId } = req.body;
      if (!jobId || !applicantId) {
        return res.status(400).json({ message: 'Missing jobId or applicantId' });
      }
  
      const existing = await Application.findOne({ jobId, applicantId });
      if (existing) {
        return res.status(409).json({ message: 'Application already exists.' });
      }
  
      const app = new Application({
        jobId,
        applicantId,
        coverLetter: "This is an automated test application. Please accept me!"
      });
  
      await app.save();
      res.status(201).json({ message: 'Test application created.', application: app });
    } catch (err) {
      console.error('DevTools: createTestApplication error:', err);
      res.status(500).json({ message: 'Failed to create application.' });
    }
  };
  
  module.exports = DevTools;
