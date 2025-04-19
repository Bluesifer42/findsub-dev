// ==============================
// Server Setup and Model Imports
// ==============================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Import Models
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');
const Feedback = require('./models/Feedback');
const Kink = require('./models/Kink');
const DevTools = require('./devtools/DevTools');


// ==============================
// Helper Function: Update User Reputation
// ==============================
async function updateUserReputation(userId) {
  try {
    const feedbackDocs = await Feedback.find({ toUser: userId });
    if (feedbackDocs.length === 0) return;

    // Calculate average rating using generalRatings (if available) or fallback to 'rating'.
    const ratings = feedbackDocs.map(f => {
      if (f.generalRatings) {
        // f.generalRatings may be a plain object.
        const values = Object.values(f.generalRatings);
        return values.reduce((a, b) => a + b, 0) / values.length;
      }
      return f.rating;
    });
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    await User.findByIdAndUpdate(userId, {
      reputationScore: avg.toFixed(1)
    });
  } catch (error) {
    console.error('Error updating user reputation:', error);
  }
}

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// Routes
// ==============================

/**
 * Create Job
 * Creates a new job posting including an optional 'requiredKinks' array.
 */
app.post('/api/jobs', async (req, res) => {
  try {
    const {
      posterId,
      title,
      description,
      location,
      compensation,
      requirements,
      category,
      expiresAt,
      startDate,
      startTime,
      minDuration,
      requiredKinks // Array of kink IDs.
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
      requirements,
      category,
      expiresAt,
      startDate,
      startTime,
      minDuration,
      requiredKinks
    });

    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully.', job: newJob });
  } catch (err) {
    console.error('Job post error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

/**
 * Update Job Status
 * Updates job status. If status is 'completed' or 'failed', locks the job for further editing.
 */
app.post('/api/jobs/status', async (req, res) => {
  try {
    const { jobId, newStatus } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.status = newStatus;

    if (newStatus === 'cancelled') {
      job.isEditable = true;
      job.selectedApplicant = null;
      job.isFilled = false;
      job.fulfilledOn = null;
      job.completedOn = null;
    }

    if (newStatus === 'completed') {
      job.completedOn = new Date();
    }

    if (newStatus === 'failed') {
      job.completedOn = new Date(); // You can track failure dates too
    }

    await job.save();
    res.json({ message: `Job marked as ${newStatus}` });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({ message: 'Failed to update job status' });
  }
});

/**
 * Update & Re-List Cancelled Job
 * Updates a cancelled job and re-lists it (editing allowed only for cancelled jobs).
 */
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

/**
 * Permanently Delete Cancelled Job
 * Deletes a job (only if status is 'cancelled').
 */
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

/**
 * Apply to Job
 * Allows a sub to apply for a job.
 */
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

/**
 * Get Applications for a Job
 * Returns all applications for a given job with applicant details.
 */
app.get('/api/applications/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId })
      .populate('applicantId', 'username role experienceLevel');
    res.json({ applications });
  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({ message: 'Failed to fetch applications.' });
  }
});

/**
 * Select Applicant
 * Marks a job as filled by selecting an applicant.
 */
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

/**
 * Job History
 * Retrieves completed jobs for a user (as poster or selected applicant).
 */
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


/** - ADMIN ONLY
 * Delete User 
 * Deletes the selected user
 */
app.delete('/api/admin/delete-user/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Application.deleteMany({ applicantId: req.params.userId });
    await Feedback.deleteMany({ $or: [{ fromUser: req.params.userId }, { toUser: req.params.userId }] });
    res.json({ message: 'User deleted', username: user.username });
  } catch (err) {
    console.error('Admin user delete error:', err);
    res.status(500).json({ message: 'Failed to delete user.' });
  }
});

/**
 * Admin: Get All Jobs
 * Returns every job in the system for moderation and dev tools.
 */
app.get('/api/admin/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({})
      .sort({ createdAt: -1 })
      .populate('posterId', 'username')
      .populate('selectedApplicant', 'username');
    res.json({ jobs });
  } catch (err) {
    console.error('Admin fetch jobs error:', err);
    res.status(500).json({ message: 'Failed to fetch all jobs.' });
  }
});


/**
 * Fetch Jobs
 * Retrieves jobs for public view or for a particular poster.
 */
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

/**
 * Get a Single Job Detail
 * Retrieves a job by ID with fully populated fields:
 * - posterId and selectedApplicant (including their kinks).
 * - requiredKinks populated with name and description.
 */
app.get('/api/job/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate({
        path: 'posterId',
        select: 'username kinks',
        populate: { path: 'kinks.kink', select: 'name description' }
      })
      .populate({
        path: 'selectedApplicant',
        select: 'username kinks',
        populate: { path: 'kinks.kink', select: 'name description' }
      })
      .populate('requiredKinks', 'name description');
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json({ job });
  } catch (error) {
    console.error('Job detail fetch error:', error);
    res.status(500).json({ message: 'Failed to load job details.' });
  }
});

/**
 * Get Feedback for a Job
 * Retrieves all feedback for a given job.
 */
app.get('/api/feedback/job/:jobId', async (req, res) => {
  try {
    const feedbackDocs = await Feedback.find({ jobId: req.params.jobId })
      .populate('fromUser', 'username role');
    res.json({ feedback: feedbackDocs });
  } catch (error) {
    console.error('Feedback fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch feedback.' });
  }
});

/**
 * My Accepted Jobs
 * Retrieves jobs where the current user is the selected applicant.
 */
app.get('/api/my-jobs/:userId', async (req, res) => {
  try {
    const jobs = await Job.find({ selectedApplicant: req.params.userId })
      .populate('posterId', 'username');
    res.json({ jobs });
  } catch (err) {
    console.error('Error loading accepted jobs:', err);
    res.status(500).json({ message: 'Failed to load selected jobs.' });
  }
});

/**
 * Retract Application Endpoint
 * Allows a sub to cancel (retract) their interest for a specific job.
 * Expects jobId and applicantId as URL parameters.
 */
app.delete('/api/apply/:jobId/:applicantId', async (req, res) => {
  try {
    const { jobId, applicantId } = req.params;
    const application = await Application.findOne({ jobId, applicantId });
    if (!application) {
      return res.status(404).json({ message: 'No application found to retract.' });
    }
    await application.deleteOne();
    res.json({ message: 'Application retracted successfully.' });
  } catch (error) {
    console.error('Error retracting application:', error);
    res.status(500).json({ message: 'Failed to retract application.' });
  }
});


/**
 * Get Jobs Awaiting Feedback
 * Retrieves jobs (with status 'completed') where the specified user has not yet submitted feedback.
 */
app.get('/api/jobs/awaiting-feedback/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find jobs that are completed and where the user is either the poster or the selected applicant.
    const jobs = await Job.find({
      status: 'completed',
      isFilled: true,
      $or: [
        { posterId: userId },
        { selectedApplicant: userId }
      ]
    });
    // For each job, check if feedback from this user exists.
    const awaitingFeedback = [];
    for (const job of jobs) {
      const feedbackExists = await Feedback.findOne({ jobId: job._id, fromUser: userId });
      if (!feedbackExists) {
        awaitingFeedback.push(job);
      }
    }
    res.json({ jobs: awaitingFeedback });
  } catch (err) {
    console.error('Awaiting feedback fetch error:', err);
    res.status(500).json({ message: 'Failed to load jobs awaiting feedback.' });
  }
});

/**
 * New Feedback Endpoint
 * Accepts detailed feedback submissions. Updates user rep and sets feedback flags.
 */
app.post('/api/feedback/new', async (req, res) => {
  try {
    const {
      jobId,
      fromUser,
      toUser,
      generalRatings,
      interestRatings,
      badgeGifting,
      honestyScore,
      comment
    } = req.body;

    // Prevent duplicate feedback
    const existing = await Feedback.findOne({ jobId, fromUser });
    if (existing) {
      return res.status(400).json({ message: 'Feedback already submitted for this job.' });
    }

    // Create and save feedback
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

    // Update recipient's rep score
    await updateUserReputation(toUser);

    // Optionally update trust score if method exists
    const recipient = await User.findById(toUser);
    if (recipient && typeof recipient.recalculateTrustScore === 'function') {
      recipient.recalculateTrustScore();
      await recipient.save();
    }

    // NEW: Update feedback flags in Job
    const job = await Job.findById(jobId);
    if (job) {
      if (String(job.selectedApplicant) === String(fromUser)) {
        job.subFeedbackLeft = true;
      } else if (String(job.posterId) === String(fromUser)) {
        job.domFeedbackLeft = true;
      }
      await job.save();
    }

    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (err) {
    console.error('Feedback new endpoint error:', err);
    res.status(500).json({ message: 'Failed to submit feedback.' });
  }
});

/**
 * Legacy Feedback Endpoints (optional)
 */
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
    console.error('Legacy feedback error:', err);
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
    console.error('Legacy poster feedback error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

/**
 * Get Public Profile Data
 * Returns basic public user info, with kinks and kinkHistory populated.
 */
app.get('/api/user/:id', async (req, res) => {
  try {
    const userDoc = await User.findById(req.params.id)
      .select('username role kinks kinkHistory')
      .populate('kinks.kink', 'name description')
      .populate('kinkHistory.kink', 'name description');
    if (!userDoc) return res.status(404).json({ message: 'User not found.' });
    res.json({ user: userDoc });
  } catch (error) {
    console.error('User lookup error:', error);
    res.status(500).json({ message: 'Failed to load user info.' });
  }
});

/**
 * Search Users
 */
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

/**
 * Registration Endpoint
 * Legacy: accepts "interests"; new clients should update kinks via Profile.
 */
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
      interests, // Legacy field.
      limits
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

/**
 * Login Endpoint
 * Returns user details with populated kink data.
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email })
      .populate('kinks.kink', 'name description')
      .populate('kinkHistory.kink', 'name description');

    if (!userDoc) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    res.json({
      message: 'Login successful.',
      user: {
        _id: userDoc._id,
        id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
        role: userDoc.role,
        gender: userDoc.gender,
        experienceLevel: userDoc.experienceLevel,
        interests: userDoc.interests,
        limits: userDoc.limits,
        phoneNumber: userDoc.phoneNumber,
        emailVerified: userDoc.emailVerified,
        phoneVerified: userDoc.phoneVerified,
        kinks: userDoc.kinks,
        kinkHistory: userDoc.kinkHistory,
        isAdmin: userDoc.isAdmin === true // ✅ Force boolean value only
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

/**
 * Admin: Get All Feedback
 * Returns all feedback in the system for moderation or inspection.
 */
app.get('/api/admin/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find({})
      .sort({ createdAt: -1 })
      .populate('fromUser', 'username role')
      .populate('toUser', 'username role')
      .populate('jobId', 'title');

    res.json({ feedback });
  } catch (err) {
    console.error('Admin feedback fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch all feedback.' });
  }
});



/**
 * Profile Update
 * Updates a user's profile and returns the updated kink data.
 */
app.put('/api/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true })
      .populate('kinks.kink', 'name description')
      .populate('kinkHistory.kink', 'name description');
    if (!updatedUser) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: 'Profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

/**
 * Get Feedback by User
 * Retrieves all feedback where the specified user is the recipient.
 */
app.get('/api/feedback/user/:userId', async (req, res) => {
  try {
    const feedbackDocs = await Feedback.find({ toUser: req.params.userId })
      .populate('fromUser', 'username role');
    res.json({ feedback: feedbackDocs });
  } catch (err) {
    console.error('Feedback fetch error:', err);
    res.status(500).json({ message: 'Failed to load feedback.' });
  }
});

/**
 * Get All Kinks
 * Retrieves a list of all available kinks.
 */
app.get('/api/kinks', async (req, res) => {
  try {
    const kinks = await Kink.find({});
    res.json({ kinks });
  } catch (error) {
    console.error('Error fetching kinks:', error);
    res.status(500).json({ message: 'Failed to fetch kinks.' });
  }
});

/**
 * Create a New Kink
 * Allows creation of a new kink.
 */
app.post('/api/kinks', async (req, res) => {
  try {
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

/**
 * Admin: Get all kinks (management)
 */
app.get('/api/admin/kinks', async (req, res) => {
  try {
    const kinks = await Kink.find({});
    res.json({ kinks });
  } catch (error) {
    console.error('Admin kink fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch kinks.' });
  }
});

/**
 * Admin: Add new kink
 */
app.post('/api/admin/kinks', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required.' });
    }

    const existing = await Kink.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existing) {
      return res.status(409).json({ message: 'Kink already exists.' });
    }

    const kink = new Kink({ name, description });
    await kink.save();
    res.status(201).json({ message: 'Kink created successfully.', kink });
  } catch (error) {
    console.error('Admin kink create error:', error);
    res.status(500).json({ message: 'Failed to create kink.' });
  }
});

/**
 * Admin: Get all jobs
 */
app.get('/api/admin/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({})
      .sort({ createdAt: -1 })
      .populate('posterId', 'username')
      .populate('selectedApplicant', 'username');
    res.json({ jobs });
  } catch (err) {
    console.error('Admin job fetch error:', err);
    res.status(500).json({ message: 'Failed to load jobs.' });
  }
});

/**
 * Admin: Delete any job
 */
app.delete('/api/admin/jobs/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found.' });

    // Also remove related applications
    await Application.deleteMany({ jobId });

    res.json({ message: 'Job deleted successfully.' });
  } catch (err) {
    console.error('Admin job delete error:', err);
    res.status(500).json({ message: 'Failed to delete job.' });
  }
});

/**
 * Admin: Get all users
 */
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().select('username email role isAdmin emailVerified phoneVerified trustScore reputationScore');
    res.json({ users });
  } catch (err) {
    console.error('Admin user fetch error:', err);
    res.status(500).json({ message: 'Failed to load users.' });
  }
});

/**
 * Admin: Delete user by ID
 */
app.delete('/api/admin/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Optional: delete related feedback, jobs, applications (add later)
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Admin delete user error:', err);
    res.status(500).json({ message: 'Failed to delete user.' });
  }
});





/**
 * DEVTOOLS ------
 * 
 * 
 *  Create test user (Dom/Sub/Switch/Admin)
 */
app.post('/api/admin/create-test-user', DevTools.createTestUser);





/**
 * Test Route
 */
app.get('/', (req, res) => {
  res.send('Welcome to the FindSub API!');
});

// ==============================
// MongoDB Connection and Server Startup
// ==============================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
  })
  .catch(err => console.error('❌ MongoDB Connection Error:', err));
