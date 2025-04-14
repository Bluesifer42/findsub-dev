const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');
const Feedback = require('./models/Feedback');
const Kink = require('./models/Kink');

// User Reputation: Update reputation (basic average rating)
async function updateUserReputation(userId) {
  const feedback = await Feedback.find({ toUser: userId });
  if (feedback.length === 0) return;

  const ratings = feedback.map(f => {
    // Use general average if available, otherwise fallback to overall rating
    if (f.generalRatings) {
      const values = Object.values(f.generalRatings);
      return values.reduce((a, b) => a + b, 0) / values.length;
    }
    return f.rating;
  });
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  await User.findByIdAndUpdate(userId, {
    reputationScore: avg.toFixed(1)
  });
}

// Middleware
app.use(cors());
app.use(express.json());

// ====== Routes ======

// Create Job
app.post('/api/jobs', async (req, res) => {
  try {
    const {
      posterId, title, description, location,
      compensation, duration, requirements,
      category, expiresAt, startDate, startTime, minDuration
    } = req.body;

    if (!posterId || !title || !description || !startDate) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newJob = new Job({
      posterId,
      title,
      description,
      location,
      compensation,
      duration,
      requirements,
      category,
      expiresAt,
      startDate,
      startTime,
      minDuration
    });

    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully.', job: newJob });
  } catch (err) {
    console.error('Job post error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update Job Status
app.post('/api/jobs/status', async (req, res) => {
  try {
    const { jobId, newStatus } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.status = newStatus;

    if (['completed', 'failed'].includes(newStatus)) {
      job.isEditable = false;
    }

    await job.save();
    res.json({ message: `Job marked as ${newStatus}.` });
  } catch (error) {
    console.error('Job status update error:', error);
    res.status(500).json({ message: 'Failed to update job status.' });
  }
});

// Update & Re-List Cancelled Job
app.post('/api/jobs/update', async (req, res) => {
  try {
    const { jobId, title, description, startDate, startTime, minDuration, category, newStatus } = req.body;

    const job = await Job.findById(jobId);
    if (!job || job.status !== 'cancelled') {
      return res.status(404).json({ message: 'Job not found or not editable.' });
    }

    job.title = title;
    job.description = description;
    job.startDate = startDate;
    job.startTime = startTime;
    job.minDuration = minDuration;
    job.category = category;
    job.status = newStatus || 'open';
    job.isEditable = true;
    job.isFilled = false;
    job.selectedApplicant = null;

    await job.save();
    res.json({ message: 'Job updated and re-listed.' });
  } catch (err) {
    console.error('Job re-list error:', err);
    res.status(500).json({ message: 'Failed to re-list job.' });
  }
});

// Permanently Delete Cancelled Job
app.delete('/api/jobs/delete/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job || job.status !== 'cancelled') {
      return res.status(400).json({ message: 'Only cancelled jobs can be deleted.' });
    }

    await Job.findByIdAndDelete(req.params.jobId);
    await Application.deleteMany({ jobId: req.params.jobId });

    res.json({ message: 'Job deleted successfully.' });
  } catch (err) {
    console.error('Job delete error:', err);
    res.status(500).json({ message: 'Failed to delete job.' });
  }
});

// Apply to Job
app.post('/api/apply', async (req, res) => {
  try {
    const { jobId, applicantId, coverLetter } = req.body;

    const existing = await Application.findOne({ jobId, applicantId });
    if (existing) {
      return res.status(400).json({ message: 'You have already applied to this job.' });
    }

    const application = new Application({ jobId, applicantId, coverLetter });
    await application.save();

    res.status(201).json({ message: 'Application submitted successfully.' });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get Applications for Job
app.get('/api/applications/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId }).populate('applicantId', 'username role experienceLevel');
    res.json({ applications });
  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({ message: 'Failed to fetch applications.' });
  }
});

// Select Applicant
app.post('/api/jobs/select', async (req, res) => {
  try {
    const { jobId, applicantId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found.' });

    job.selectedApplicant = applicantId;
    job.isFilled = true;
    job.fulfilledOn = new Date();
    job.status = 'filled';

    await job.save();
    res.json({ message: 'Applicant selected successfully.', job });
  } catch (error) {
    console.error('Select applicant error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Job History
app.get('/api/jobs/history/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const jobs = await Job.find({
      $or: [
        { selectedApplicant: userId, isFilled: true },
        { posterId: userId, isFilled: true }
      ]
    })
      .sort({ fulfilledOn: -1 })
      .populate('posterId', 'username')
      .populate('selectedApplicant', 'username');

    res.json({ jobs });
  } catch (err) {
    console.error('Job history fetch error:', err);
    res.status(500).json({ message: 'Failed to load job history.' });
  }
});

// Fetch Jobs (Public or Poster View)
app.get('/api/jobs', async (req, res) => {
  try {
    const { view, posterId } = req.query;
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    let filter = {};

    if (view === 'poster' && posterId) {
      filter = { posterId };
    } else {
      filter = {
        $or: [
          { isFilled: false },
          { fulfilledOn: { $gte: oneWeekAgo } }
        ],
        status: { $in: ['open', 'filled'] }
      };
    }

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .populate('posterId', 'username')
      .populate('selectedApplicant', 'username');

    res.json({ jobs });
  } catch (error) {
    console.error('Fetch jobs error:', error);
    res.status(500).json({ message: 'Failed to fetch jobs.' });
  }
});

// Get a Single Job Detail  <-- NEW ENDPOINT
app.get('/api/job/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate('posterId', 'username kinks')  
      .populate('selectedApplicant', 'username kinks')
      .populate('requiredKinks', 'name'); // Populate requiredKinks with the name field.
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json({ job });
  } catch (error) {
    console.error('Job detail fetch error:', error);
    res.status(500).json({ message: 'Failed to load job details.' });
  }
});

// Get Feedback for a Job
app.get('/api/feedback/job/:jobId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ jobId: req.params.jobId })
      .populate('fromUser', 'username role');
    res.json({ feedback });
  } catch (error) {
    console.error('Feedback fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch feedback.' });
  }
});

// My Accepted Jobs
app.get('/api/my-jobs/:userId', async (req, res) => {
  try {
    const jobs = await Job.find({ selectedApplicant: req.params.userId }).populate('posterId', 'username');
    res.json({ jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load selected jobs.' });
  }
});

// New Feedback Endpoint
app.post('/api/feedback/new', async (req, res) => {
  try {
    const {
      jobId,
      fromUser,
      toUser,
      generalRatings,
      interestRatings,  // e.g., { "Domestic Cleaning": 4, "Boot Licking": 5 }
      badgeGifting,     // e.g., { "Domestic Cleaning": 2, "Boot Licking": 1 }
      honestyScore,
      comment
    } = req.body;

    // Check if feedback from this user for the job already exists
    const existing = await Feedback.findOne({ jobId, fromUser });
    if (existing) {
      return res.status(400).json({ message: 'Feedback already submitted for this job.' });
    }

    // Create and save the new feedback document
    const feedback = new Feedback({
      jobId,
      fromUser,
      toUser,
      generalRatings,
      interestRatings,
      badgeGifting,
      honestyScore,
      comment
    });

    await feedback.save();

    // Update reputation (average rating) for the recipient
    await updateUserReputation(toUser);

    // Recalculate trust score using the model method from User
    const recipient = await User.findById(toUser);
    if (recipient && typeof recipient.recalculateTrustScore === 'function') {
      recipient.recalculateTrustScore();
      await recipient.save();
    }

    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (err) {
    console.error('Feedback new endpoint error:', err);
    res.status(500).json({ message: 'Failed to submit feedback.' });
  }
});

// Legacy feedback endpoints (optional - can be removed later)
app.post('/api/feedback', async (req, res) => {
  try {
    const { jobId, fromUser, toUser, rating, comment } = req.body;

    const existing = await Feedback.findOne({ jobId, fromUser });
    if (existing) return res.status(400).json({ message: 'Feedback already submitted.' });

    const feedback = new Feedback({ jobId, fromUser, toUser, rating, comment });
    await feedback.save();
    await updateUserReputation(toUser);

    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (err) {
    console.error('Feedback error:', err);
    res.status(500).json({ message: 'Failed to submit feedback.' });
  }
});

app.post('/api/feedback/poster', async (req, res) => {
  try {
    const { jobId, fromUser, toUser, rating, comment } = req.body;

    const existing = await Feedback.findOne({ jobId, fromUser });
    if (existing) return res.status(400).json({ message: 'Feedback already submitted.' });

    const feedback = new Feedback({ jobId, fromUser, toUser, rating, comment });
    await feedback.save();
    await updateUserReputation(toUser);

    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Poster feedback error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Public profile data
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username role');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (error) {
    console.error('User lookup error:', error);
    res.status(500).json({ message: 'Failed to load user info.' });
  }
});

// Search Users
app.get('/api/users', async (req, res) => {
  try {
    const roleFilter = req.query.role;
    const query = roleFilter ? { role: roleFilter } : {};
    const users = await User.find(query).select('username role reputationScore');
    res.json({ users });
  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

// Registration
app.post('/api/register', async (req, res) => {
  try {
    const {
      username, email, password, role, gender,
      dateOfBirth, experienceLevel, interests, limits
    } = req.body;

    if (!username || !email || !password || !role || !gender || !dateOfBirth) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const age = Math.floor((Date.now() - new Date(dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18) {
      return res.status(403).json({ message: 'You must be at least 18 to register.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already exists.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      gender,
      dateOfBirth,
      experienceLevel,
      interests,
      limits
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    res.json({
      message: 'Login successful.',
      user: {
        _id: user._id,
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        gender: user.gender,
        experienceLevel: user.experienceLevel,
        interests: user.interests,
        limits: user.limits,
        phoneNumber: user.phoneNumber,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Profile Update
app.put('/api/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found.' });

    res.json({ message: 'Profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Feedback By User
app.get('/api/feedback/user/:userId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ toUser: req.params.userId })
      .populate('fromUser', 'username role');
    res.json({ feedback });
  } catch (err) {
    console.error('Feedback fetch error:', err);
    res.status(500).json({ message: 'Failed to load feedback.' });
  }
});

// Get all kinks
app.get('/api/kinks', async (req, res) => {
  try {
    const Kink = require('./models/Kink');
    const kinks = await Kink.find({});
    res.json({ kinks });
  } catch (error) {
    console.error('Error fetching kinks:', error);
    res.status(500).json({ message: 'Failed to fetch kinks.' });
  }
});

// POST endpoint to create a new kink
app.post('/api/kinks', async (req, res) => {
  try {
    const Kink = require('./models/Kink');  // Ensure this path is correct
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    const newKink = new Kink({ name, description });
    await newKink.save();
    res.status(201).json({ message: 'Kink created successfully.', kink: newKink });
  } catch (error) {
    console.error('Error creating kink:', error);
    res.status(500).json({ message: 'Failed to create kink.' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the FindSub API!');
});

// MongoDB + Server Startup
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
  })
  .catch(err => console.error('❌ MongoDB Connection Error:', err));
